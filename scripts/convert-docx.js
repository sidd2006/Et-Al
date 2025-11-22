#!/usr/bin/env node
const fs = require("fs-extra");
const path = require("path");
const glob = require("glob");
const mammoth = require("mammoth");
const TurndownService = require("turndown");

async function convertFile(file, outDir) {
  const basename = path.basename(file, ".docx");
  const outPath = path.join(outDir, `${basename}.md`);
  const result = await mammoth.convertToHtml({ path: file });
  const html = result.value || "";
  const turndownService = new TurndownService({ headingStyle: "atx" });
  const markdown = turndownService.turndown(html);
  const safeTitle = basename.replace(/"/g, "");
  const frontmatter = `---\ntitle: "${safeTitle}"\ndate: "${new Date().toISOString()}"\n---\n\n`;
  await fs.ensureDir(outDir);
  await fs.writeFile(outPath, frontmatter + markdown, "utf8");
  console.log(`Converted: ${file} -> ${outPath}`);
}

async function main() {
  const inputArg = process.argv[2] || "./src/docx";
  const outputDir = process.argv[3] || "./src/articles";

  let files = [];
  const stat = await fs.pathExists(inputArg) ? await fs.stat(inputArg).catch(() => null) : null;
  if (stat && stat.isFile() && inputArg.toLowerCase().endsWith(".docx")) {
    files = [inputArg];
  } else {
    // Normalize to forward slashes for glob on Windows
    const normalized = inputArg.replace(/\\\\/g, "/");
    const pattern = normalized.endsWith("/") ? `${normalized}**/*.docx` : `${normalized}/**/*.docx`;
    files = glob.sync(pattern, { nodir: true });
  }
  if (files.length === 0) {
    console.log(`No .docx files found in ${inputArg}`);
    return;
  }

  for (const file of files) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await convertFile(file, outputDir);
    } catch (e) {
      console.error("Error converting", file, e);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
