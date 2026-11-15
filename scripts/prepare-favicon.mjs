import sharp from "sharp";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

// Crop the existing transparent logo to its emblem, excluding the lettering.
// Preserve its artwork and colors; leave a small transparent tab-icon margin.
const cropped = await sharp("src/assets/asterisk-logo.png")
  .extract({ left: 640, top: 240, width: 400, height: 380 })
  .toBuffer();
const icon = await sharp(cropped)
  .trim()
  .resize(64, 64, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .extend({
    top: 4,
    bottom: 4,
    left: 4,
    right: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toBuffer();
const hash = createHash("sha256").update(icon).digest("hex").slice(0, 10);
const url = `/brand/favicon-${hash}.png`;
await writeFile(`public${url}`, icon);
const html = await readFile("index.html", "utf8");
const link = `<link rel="icon" type="image/png" sizes="72x72" href="${url}" />`;
await writeFile(
  "index.html",
  html.includes('rel="icon"')
    ? html.replace(/<link\s+rel="icon"[^>]*\/>/, link)
    : html.replace("    <title>", `    ${link}\n    <title>`),
);
console.log(`Prepared cropped logo favicon: ${url}`);
