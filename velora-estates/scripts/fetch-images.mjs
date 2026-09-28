// Downloads every Higgsfield image referenced in data/images.ts into
// public/images/ and rewrites data/images.ts to use the local copies.
// Run once from a machine that can reach the Higgsfield CDN:
//   npm run fetch-images
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const DATA = "data/images.ts";
const OUT = "public/images";
const source = await readFile(DATA, "utf8");
const cdn = source.match(/const CDN = "([^"]+)"/)?.[1];
if (!cdn || cdn.startsWith("/")) {
  console.log("Images already point to local files. Nothing to do.");
  process.exit(0);
}

const files = [...source.matchAll(/"(hf_[^"]+\.png)"/g)].map((m) => m[1]);
await mkdir(OUT, { recursive: true });

for (const file of files) {
  const dest = `${OUT}/${file}`;
  if (existsSync(dest)) continue;
  const res = await fetch(`${cdn}/${file}`);
  if (!res.ok) throw new Error(`Download failed (${res.status}) for ${file}`);
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
  console.log(`saved ${dest}`);
}

await writeFile(DATA, source.replace(/const CDN = "[^"]+"/, 'const CDN = "/images"'));
console.log(`Rewrote ${DATA} to use /images. You can now remove images.remotePatterns from next.config.ts.`);
