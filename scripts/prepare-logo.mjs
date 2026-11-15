import sharp from "sharp";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";

// Optimize the background-extracted master without changing its artwork.
const source = await readFile("src/assets/asterisk-logo.png");
const buffer = await sharp(source)
  .trim()
  .resize({ width: 800, withoutEnlargement: true })
  .webp({ lossless: true })
  .toBuffer();
const hash = createHash("sha256").update(buffer).digest("hex").slice(0, 10);
const url = `/brand/logo-transparent-${hash}.webp`;
await mkdir("public/brand", { recursive: true });
await writeFile(`public${url}`, buffer);
const manifest = JSON.parse(await readFile("src/content/assets.json", "utf8"));
manifest.logo = url;
await writeFile(
  "src/content/assets.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(`Prepared transparent logo: ${url}`);
