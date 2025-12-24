import os
import io
import tempfile
import re
from typing import List, Optional

import requests
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

import torch
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    AutoModelForSeq2SeqLM,
    pipeline,
)
from keybert import KeyBERT
from sentence_transformers import SentenceTransformer
import PyPDF2
import docx
from bs4 import BeautifulSoup

# -----------------------
# CONFIG
# -----------------------

GROBID_URL = os.getenv("GROBID_URL", "http://localhost:8070")
OPENALEX_BASE = "https://api.openalex.org/works"

FIELD_LABELS = [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Biology",
    "Medicine",
    "Chemistry",
    "Engineering",
    "Economics",
    "Social Sciences",
    "Psychology",
]

HEADER_FOOTER_PATTERNS = [
    r"^\s*page\s+\d+\s+of\s+\d+\s*$",
    r"^\s*copyright\s+©.*$",
    r"^\s*unclassified.*$",
    r"^\s*table\s+\d+.*$",
    r"^\s*figure\s+\d+.*$",
    r"^\s*doi:.*$",
]

app = FastAPI(title="Research Paper Summarizer (HF + GROBID + OpenAlex)")  # [file:1]


# -----------------------
# LOAD MODELS ON STARTUP
# -----------------------

# Field-of-research classifier: SciBERT [file:1]
clf_model_name = "allenai/scibert_scivocab_uncased"
clf_tokenizer = AutoTokenizer.from_pretrained(clf_model_name)
clf_model = AutoModelForSequenceClassification.from_pretrained(
    clf_model_name,
    num_labels=len(FIELD_LABELS),
)
clf_model.eval()

# Long summarizer: LED (Longformer Encoder-Decoder) [file:1]
summ_model_name = "allenai/led-base-16384"
summ_tokenizer = AutoTokenizer.from_pretrained(summ_model_name)
summ_model = AutoModelForSeq2SeqLM.from_pretrained(summ_model_name)
summ_model.eval()

# KeyBERT + SentenceTransformer for keywords [file:1]
kw_embedder = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
kw_model = KeyBERT(model=kw_embedder)


# -----------------------
# TEXT EXTRACTION & CLEANING
# -----------------------

def read_pdf(file_bytes: bytes) -> str:
    reader = PyPDF2.PdfReader(io.BytesIO(file_bytes))
    texts = []
    for page in reader.pages:
        try:
            texts.append(page.extract_text() or "")
        except Exception:
            continue
    return "\n".join(texts)


def read_docx(file_bytes: bytes) -> str:
    with tempfile.NamedTemporaryFile(suffix=".docx", delete=False) as tmp:
        tmp.write(file_bytes)
        tmp_path = tmp.name
    doc = docx.Document(tmp_path)
    os.remove(tmp_path)
    return "\n".join(p.text for p in doc.paragraphs)


def read_txt(file_bytes: bytes) -> str:
    return file_bytes.decode("utf-8", errors="ignore")


def extract_text_from_upload(filename: str, file_bytes: bytes) -> str:
    filename = filename.lower()
    if filename.endswith(".pdf"):
        return read_pdf(file_bytes)
    if filename.endswith(".docx") or filename.endswith(".doc"):
        return read_docx(file_bytes)
    if filename.endswith(".txt"):
        return read_txt(file_bytes)
    return read_txt(file_bytes)


def clean_text(raw: str) -> str:
    """Remove common headers/footers and collapse whitespace."""
    lines = raw.splitlines()
    cleaned_lines = []

    for line in lines:
        l = line.strip()
        if not l:
            continue

        drop = False
        for pat in HEADER_FOOTER_PATTERNS:
            if re.match(pat, l, flags=re.IGNORECASE):
                drop = True
                break
        if drop:
            continue

        cleaned_lines.append(l)

    text = " ".join(cleaned_lines)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


# -----------------------
# GROBID METADATA (TITLE / AUTHORS / YEAR / VENUE) [file:1]
# -----------------------

def call_grobid_tei(file_bytes: bytes) -> Optional[str]:
    try:
        files = {"input": ("paper.pdf", file_bytes, "application/pdf")}
        resp = requests.post(
            f"{GROBID_URL}/api/processFulltextDocument",
            files=files,
            data={"consolidateHeader": "1"},
            timeout=60,
        )
        if resp.status_code == 200:
            return resp.text
    except Exception:
        return None
    return None


def parse_grobid_metadata(tei_xml: str):
    soup = BeautifulSoup(tei_xml, "xml")

    # Main title
    title_tag = soup.find("title", {"type": "main"})
    title = title_tag.text.strip() if title_tag else None

    # Authors only from <analytic> (front-matter) to avoid reference authors
    authors: List[str] = []
    analytic = soup.find("analytic")
    if analytic:
        for author in analytic.find_all("author"):
            pers = author.find("persName")
            if not pers:
                continue
            fname = pers.find("forename")
            lname = pers.find("surname")
            full = " ".join(
                x
                for x in [
                    fname.text.strip() if fname else "",
                    lname.text.strip() if lname else "",
                ]
                if x
            )
            if full and full not in authors:
                authors.append(full)

    # Year
    date_tag = soup.find("date", {"type": "published"})
    year = date_tag["when"][:4] if date_tag and date_tag.has_attr("when") else None

    # Conference / journal
    conf_tag = soup.find("meeting")
    if conf_tag:
        conference = conf_tag.text.strip()
    else:
        conference = None
        monogr = soup.find("monogr")
        if monogr:
            t = monogr.find("title")
            if t:
                conference = t.text.strip()

    return {
        "title": title,
        "authors": authors,
        "year": year,
        "conference": conference,
    }


# -----------------------
# FIELD-OF-RESEARCH CLASSIFICATION (SciBERT) [file:1]
# -----------------------

def classify_field_of_research(text: str, max_chars: int = 4000) -> Optional[str]:
    if not text:
        return None
    snippet = text[:max_chars]

    inputs = clf_tokenizer(
        snippet,
        truncation=True,
        max_length=512,
        return_tensors="pt",
    )

    with torch.no_grad():
        outputs = clf_model(**inputs)
        logits = outputs.logits[0]
        probs = torch.softmax(logits, dim=-1)

    best_idx = int(torch.argmax(probs).item())
    if 0 <= best_idx < len(FIELD_LABELS):
        return FIELD_LABELS[best_idx]
    return FIELD_LABELS[0]


# -----------------------
# KEYWORDS (KeyBERT) [file:1]
# -----------------------

def extract_keywords(text: str, top_n: int = 10, max_chars: int = 8000) -> List[str]:
    if not text:
        return []
    snippet = text[:max_chars]
    keywords = kw_model.extract_keywords(
        snippet,
        keyphrase_ngram_range=(1, 3),
        stop_words="english",
        top_n=top_n,
    )
    return [kw for kw, _ in keywords]


# -----------------------
# SUMMARY (LED) [file:1]
# -----------------------

def summarize_text(text: str, max_chars: int = 16000) -> Optional[str]:
    if not text:
        return None
    snippet = text[:max_chars]
    inputs = summ_tokenizer(
        snippet,
        truncation=True,
        max_length=16000,
        return_tensors="pt",
    )
    with torch.no_grad():
        summary_ids = summ_model.generate(
            inputs["input_ids"],
            attention_mask=inputs["attention_mask"],
            max_length=512,
            num_beams=4,
            length_penalty=2.0,
            early_stopping=True,
        )
    return summ_tokenizer.decode(summary_ids[0], skip_special_tokens=True)


# -----------------------
# CITATION COUNT (OpenAlex) [file:1]
# -----------------------

def get_citation_count(title: Optional[str], first_author: Optional[str] = None) -> Optional[int]:
    if not title:
        return None
    params = {"search": title, "per-page": 5}
    try:
        resp = requests.get(OPENALEX_BASE, params=params, timeout=30)
        if resp.status_code != 200:
            return None
        data = resp.json()
        works = data.get("results", [])
        if not works:
            return None

        best = works[0]
        if first_author and "authorships" in best:
            for w in works:
                auths = w.get("authorships") or []
                if not auths:
                    continue
                a0 = (
                    auths[0]
                    .get("author", {})
                    .get("display_name", "")
                    .lower()
                )
                if first_author.lower().split()[0] in a0:
                    best = w
                    break

        return best.get("cited_by_count")
    except Exception:
        return None


# -----------------------
# RESPONSE MODEL
# -----------------------

class PaperAnalysis(BaseModel):
    title: Optional[str]
    authors: List[str]
    year: Optional[str]
    conference: Optional[str]
    field_of_research: Optional[str]
    keywords: List[str]
    citation_count: Optional[int]
    summary: Optional[str]


# -----------------------
# ROUTES
# -----------------------

@app.get("/", response_class=HTMLResponse)
async def index():
    return """
    <html>
      <head>
        <title>Research Paper Summarizer</title>
      </head>
      <body>
        <h2>Upload Research Paper (PDF / DOCX / TXT)</h2>
        <form id="uploadForm">
          <input name="file" id="fileInput" type="file" />
          <button type="submit">Analyze</button>
        </form>
        <div id="output" style="white-space: pre-wrap; margin-top: 1em;"></div>

        <script>
          const form = document.getElementById('uploadForm');
          const fileInput = document.getElementById('fileInput');
          const output = document.getElementById('output');

          form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!fileInput.files.length) {
              alert('Please choose a file.');
              return;
            }
            const formData = new FormData();
            formData.append('file', fileInput.files[0]);
            output.textContent = 'Processing...';

            const res = await fetch('/analyze', {
              method: 'POST',
              body: formData
            });

            if (!res.ok) {
              output.textContent = 'Error: ' + res.status + ' ' + res.statusText;
              return;
            }

            const data = await res.json();

            const title = data.title || 'N/A';
            const authors = (data.authors && data.authors.length)
              ? data.authors.join(', ')
              : 'N/A';
            const year = data.year || 'N/A';
            const conf = data.conference || 'N/A';
            const field = data.field_of_research || 'N/A';
            const citations = (data.citation_count !== null && data.citation_count !== undefined)
              ? data.citation_count
              : 'N/A';

            const keywords = (data.keywords && data.keywords.length)
              ? '\\n- ' + data.keywords.join('\\n- ')
              : 'None';
            const summary = data.summary || 'No summary available.';

            const formatted = 
              'Title: ' + title + '\\n' +
              'Authors: ' + authors + '\\n' +
              'Year / Conference: ' + year + ' — ' + conf + '\\n' +
              'Field of research: ' + field + '\\n' +
              'Citation count: ' + citations + '\\n\\n' +
              'Keywords:' + '\\n' + keywords + '\\n\\n' +
              'Summary:' + '\\n' + summary;

            output.textContent = formatted;
          });
        </script>
      </body>
    </html>
    """



@app.post("/analyze", response_model=PaperAnalysis)
async def analyze(file: UploadFile = File(...)):
    file_bytes = await file.read()

    # Metadata via GROBID [file:1]
    tei = call_grobid_tei(file_bytes)
    metadata = {"title": None, "authors": [], "year": None, "conference": None}
    if tei:
        metadata = parse_grobid_metadata(tei)

    # Extract and clean full text
    text_raw = extract_text_from_upload(file.filename, file_bytes)
    text = clean_text(text_raw)

    # Models
    field = classify_field_of_research(text)
    keywords = extract_keywords(text)
    summary = summarize_text(text)

    first_author = metadata["authors"][0] if metadata["authors"] else None
    citation_count = get_citation_count(metadata["title"], first_author)

    return PaperAnalysis(
        title=metadata["title"],
        authors=metadata["authors"],
        year=metadata["year"],
        conference=metadata["conference"],
        field_of_research=field,
        keywords=keywords,
        citation_count=citation_count,
        summary=summary,
    )
