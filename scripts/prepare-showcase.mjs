import sharp from "sharp";
import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";

const root = "provided images";
const folder = "EXT RENDER AND WALKTHROUGH";
const additions = (await readdir(`${root}/${folder}`))
  .filter((name) => name.toLowerCase().endsWith(".png"))
  .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
const files = [
  ...[
    "Scene 3_1.png",
    "Scene 4_1.png",
    "Scene 7.png",
    "Scene 8.png",
    "Scene 9.png",
  ],
  ...additions.map((name) => `${folder}/${name}`),
];
await mkdir("public/images", { recursive: true });
const views = [];
for (const file of files) {
  const source = await readFile(`${root}/${file}`);
  const name = file.split("/").at(-1);
  const id = `view-${name
    .toLowerCase()
    .replace(/\.png$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-$/, "")}`;
  const group =
    name.startsWith("Image") ||
    ["Scene 2.png", "Scene 4.png", "Scene 10.png"].includes(name)
      ? "Interiors"
      : "Exteriors";
  const hash = createHash("sha256")
    .update(source)
    .update("showcase-v1")
    .digest("hex")
    .slice(0, 10);
  const { width, height } = await sharp(source).metadata();
  const variants = [];
  for (const size of [
    ...new Set([320, 800, 1440].map((size) => Math.min(size, width))),
  ]) {
    const url = `/images/${id}-${hash}-${size}.webp`;
    await sharp(source)
      .resize({ width: size })
      .webp({ quality: size === 320 ? 76 : 82 })
      .toFile(`public${url}`);
    variants.push({ url, width: size });
  }
  views.push({ id, name, group, width, height, variants });
  console.log(name);
}
await writeFile(
  "src/content/showcase.json",
  JSON.stringify(views, null, 2) + "\n",
);
