import { readdir, readFile, stat } from "node:fs/promises";
import { gzipSync } from "node:zlib";
const assets = await readdir("dist/assets");
let js = 0,
  css = 0;
for (const name of assets) {
  if (!/\.(js|css)$/.test(name)) continue;
  const size = gzipSync(await readFile(`dist/assets/${name}`)).length;
  if (name.endsWith(".js")) js += size;
  else css += size;
}
console.log(
  `All route chunks combined (gzip): JS ${(js / 1024).toFixed(1)} KB; CSS ${(css / 1024).toFixed(1)} KB`,
);
if (js > 150 * 1024 || css > 50 * 1024)
  throw new Error("Bundle budget exceeded");
for (const name of await readdir("dist/images")) {
  const limit = name.endsWith(".mp4") ? 20_000_000 : 2_000_000;
  if ((await stat(`dist/images/${name}`)).size > limit)
    throw new Error(`Media budget exceeded: ${name}`);
}
