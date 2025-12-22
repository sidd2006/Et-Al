from pathlib import Path
import shutil
import re

ART_DIR = Path('src/articles')

def restore_file(p: Path):
    text = p.read_text(encoding='utf8')
    orig = text
    # preserve frontmatter
    front = ''
    rest = text
    if text.startswith('---'):
        parts = text.split('---', 2)
        if len(parts) >= 3:
            front = '---' + parts[1] + '---\n'
            rest = parts[2].lstrip('\n')

    lines = rest.splitlines()
    # remove extra separators directly after frontmatter
    while len(lines) > 0 and lines[0].strip() == '---':
        lines.pop(0)

    # If first visible line is H1, convert to bold
    if lines:
        if lines[0].startswith('# '):
            title = lines[0][2:].strip()
            lines[0] = f"**{title}**"
        else:
            # if already bold title with single asterisks or html, leave
            pass

    # Next lines: normalize Authors line
    for i in range(1, min(6, len(lines))):
        s = lines[i].strip()
        if s.startswith('*Authors:') or s.startswith('Authors:') or s.startswith('*Authors') or s.lower().startswith('authors'):
            # extract names after colon
            after = re.sub(r'^[\*\s]*[Aa]uthors?:\s*', '', s)
            after = after.strip('* ').strip()
            lines[i] = f"**Authors:** {after}"
            # remove any immediate '---' after byline
            if i+1 < len(lines) and lines[i+1].strip() == '---':
                lines.pop(i+1)
            break

    # Convert any '## Introduction' back to bold line
    for k, l in enumerate(lines):
        if re.search(r'\bIntroduction\b', l, re.IGNORECASE):
            # capture rest of line after 'Introduction'
            rest_txt = re.sub(r'.*Introduction\s*[:\-]*\s*', '', l, flags=re.IGNORECASE).strip()
            if rest_txt:
                lines[k] = f"**Introduction: {rest_txt}**"
            else:
                lines[k] = "**Introduction:**"
            break

    new_rest = '\n'.join(lines).rstrip() + '\n\n'
    new_text = (front + new_rest).rstrip() + '\n'

    if new_text != orig:
        bak = p.with_suffix(p.suffix + '.restore.bak')
        shutil.copyfile(p, bak)
        p.write_text(new_text, encoding='utf8')
        return True, bak
    return False, None

def main():
    md_files = sorted(ART_DIR.glob('*.md'))
    for p in md_files:
        ok, bak = restore_file(p)
        if ok:
            print(f"Restored: {p.name} (backup: {bak.name})")
        else:
            print(f"No change: {p.name}")

if __name__ == '__main__':
    main()
