import sharp from "sharp";
import { createHash } from "node:crypto";
import { readFile, writeFile, mkdir } from "node:fs/promises";

const files = {
  wide: "Scene 3_1.png",
  exterior: "Scene 4_1.png",
  facade: "Scene 7.png",
  entrance: "Scene 8.png",
  detail: "Scene 9.png",
};
const manifest = {};
await mkdir("public/images", { recursive: true });
await mkdir("public/brand", { recursive: true });
await mkdir("src/content", { recursive: true });
for (const [id, file] of Object.entries(files)) {
  const source = await readFile(`provided images/${file}`);
  const hash = createHash("sha256")
    .update(source)
    .update("v1-q78")
    .update(JSON.stringify(sharp.versions))
    .digest("hex")
    .slice(0, 10);
  const { width, height } = await sharp(source).metadata();
  const sizes = [640, 960, 1440, 1920, 2560].filter((size) => size <= width);
  if (!sizes.includes(width) && width < 1440) sizes.push(width);
  const variants = { webp: [], avif: [] };
  for (const size of sizes) {
    for (const format of ["webp", "avif"]) {
      const url = `/images/${id}-${hash}-${size}.${format}`;
      await sharp(source)
        .resize({ width: size, withoutEnlargement: true })
        [format]({ quality: format === "avif" ? 58 : 78, effort: 4 })
        .toFile(`public${url}`);
      variants[format].push({ url, width: size });
    }
  }
  manifest[id] = { width, height, ...variants };
  console.log(`Prepared ${id}: ${sizes.join(", ")}px`);
}
await writeFile(
  "src/content/assets.json",
  JSON.stringify({ images: manifest }, null, 2) + "\n",
);
await import("./prepare-logo.mjs");
