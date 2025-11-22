import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

function slugify(input: string) {
  return input
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\.[^/.]+$/, "") // remove extension
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const articlesDir = path.join(process.cwd(), "src/articles");
const publicArticlesDir = path.join(process.cwd(), "public", "articles");

function findImageInFolder(folderPath: string, preferFirst = false, preferSecond = false): string | null {
  if (!fs.existsSync(folderPath)) return null;
  const entries = fs.readdirSync(folderPath).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f));
  if (entries.length === 0) return null;
  let preferred: string[];
  if (preferSecond) {
    preferred = ["image2.png", "image2.jpg", "image1.png", "image1.jpg", "cover.jpg", "cover.png"];
  } else if (preferFirst) {
    preferred = ["image1.png", "image1.jpg", "image2.png", "image2.jpg", "cover.jpg", "cover.png"];
  } else {
    preferred = ["image2.jpg", "image2.png", "image1.jpg", "image1.png", "cover.jpg", "cover.png"];
  }
  for (const p of preferred) {
    if (entries.includes(p)) return p;
  }
  return entries[0];
}

function normalizeForMatch(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function findImageForArticle(base: string, slug: string, title: string | undefined): string {
  if (!fs.existsSync(publicArticlesDir)) return "/logo.jpeg";

  const dirents = fs.readdirSync(publicArticlesDir, { withFileTypes: true });
  const folders = dirents.filter((d) => d.isDirectory()).map((d) => d.name);

  // Determine if we should prefer second image (for Deeksha Kashyap and Nithyaanagha)
  const preferSecond = base.toLowerCase().includes("deeksha") || base.toLowerCase().includes("nithyaanagha") || base.toLowerCase().includes("nityaanagha");

  // Special handling for Nithyaanagha (check for both spellings)
  const nithyaFolders = folders.filter(f => f.toLowerCase().includes("nityaanagha") || f.toLowerCase().includes("nithyaanagha"));
  
  // 1) exact folder matches: slug, base, or special cases
  let exactCandidates = [slug, base];
  if (nithyaFolders.length > 0 && (base.toLowerCase().includes("nithyaanagha") || base.toLowerCase().includes("nityaanagha"))) {
    exactCandidates = [...exactCandidates, ...nithyaFolders];
  }
  
  for (const c of exactCandidates) {
    if (!c) continue;
    const candidatePath = path.join(publicArticlesDir, c);
    if (fs.existsSync(candidatePath)) {
      const found = findImageInFolder(candidatePath, false, preferSecond);
      if (found) return `/articles/${c}/${found}`;
    }
  }

  // 2) fuzzy match based on tokens from base and title
  const combined = `${base} ${title || ""}`;
  const tokens = Array.from(new Set(normalizeForMatch(combined).split(/\s+/).filter(Boolean)));

  let bestFolder: string | null = null;
  let bestScore = 0;
  for (const folder of folders) {
    const lf = folder.toLowerCase();
    let score = 0;
    for (const t of tokens) {
      if (t.length < 3) continue;
      if (lf.includes(t)) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      bestFolder = folder;
    }
  }

  if (bestFolder && bestScore > 0) {
    const candidatePath = path.join(publicArticlesDir, bestFolder);
    const found = findImageInFolder(candidatePath, false, preferSecond);
    if (found) return `/articles/${bestFolder}/${found}`;
  }

  return "/logo.jpeg";
}

export interface ArticleData {
  title: string;
  date: string;
  slug: string;
  content: string;
  image?: string;
}

export function getAllArticles(): ArticleData[] {
  const files = fs.readdirSync(articlesDir);

  return files
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(articlesDir, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      const base = filename.replace(/\.md$/, "");
      const slug = data.slug ? String(data.slug) : slugify(base);

      // Find the best image for this article (supports fuzzy folder names)
      const image = findImageForArticle(base, slug, data.title || base);

      return {
        title: data.title || base,
        date: data.date || "",
        slug,
        content: content || "",
        image,
      };
    });
}


export function getArticleBySlug(slug: string): ArticleData | null {
  // Try direct match first (if slug matches a filename)
  const directPath = path.join(articlesDir, `${slug}.md`);
  if (fs.existsSync(directPath)) {
    const fileContent = fs.readFileSync(directPath, "utf-8");
    const { data, content } = matter(fileContent);
    const processedContent = remark().use(html).processSync(content);
    return {
      title: data.title || slug,
      date: data.date || "",
      slug,
      content: processedContent.toString(),
    };
  }

  // Otherwise, search for a file whose slugified name matches the requested slug
  const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".md"));
  for (const filename of files) {
    const base = filename.replace(/\.md$/, "");
    const candidateSlug = slugify(base);
    if (candidateSlug === slug) {
      const filePath = path.join(articlesDir, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);
      const processedContent = remark().use(html).processSync(content);
      return {
        title: data.title || base,
        date: data.date || "",
        slug: candidateSlug,
        content: processedContent.toString(),
      };
    }
  }

  return null;
}
