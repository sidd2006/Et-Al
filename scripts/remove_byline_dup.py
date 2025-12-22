from pathlib import Path
import shutil

DIR = Path('src/articles')

def fix(p: Path):
    s = p.read_text(encoding='utf8')
    orig = s
    # collapse duplicated Authors tokens, including bold markup
    s = s.replace('**Authors:** Authors:', '**Authors:**')
    s = s.replace('**Authors:**  Authors:', '**Authors:**')
    s = s.replace('Authors: Authors:', 'Authors:')
    s = s.replace('Authors:  Authors:', 'Authors:')
    if s != orig:
        bak = p.with_suffix(p.suffix + '.bylineclean.bak')
        shutil.copyfile(p, bak)
        p.write_text(s, encoding='utf8')
        return True, bak
    return False, None

def main():
    for p in sorted(DIR.glob('*.md')):
        ok, bak = fix(p)
        if ok:
            print(f'Fixed byline dup: {p.name} (backup: {bak.name})')
        else:
            print(f'No change: {p.name}')

if __name__ == '__main__':
    main()
