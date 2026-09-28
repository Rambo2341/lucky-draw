// Optimises the Higgsfield hero image for the web and derives the OpenGraph image.
// Usage: node scripts/optimize-images.mjs [path-to-source-image]
import sharp from "sharp";
import { existsSync } from "node:fs";

const src = process.argv[2] ?? "public/images/hero-raw.png";
if (!existsSync(src)) {
  console.error(`Source image not found: ${src}`);
  process.exit(1);
}

await sharp(src)
  .resize({ width: 2400, withoutEnlargement: true })
  .jpeg({ quality: 78, progressive: true, mozjpeg: true })
  .toFile("public/images/hero-studio.jpg");

// OpenGraph: 1200x630, keep the sculpture (right side) in frame.
await sharp(src)
  .resize({ width: 1200, height: 630, fit: "cover", position: "right" })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile("public/og.jpg");

console.log("Wrote public/images/hero-studio.jpg and public/og.jpg");
