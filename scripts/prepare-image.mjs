// Prepares a photo for committing to the repo: auto-rotates using the camera's orientation flag,
// caps the long edge at 2400px (eleventy-img makes the smaller web sizes from this), and re-encodes
// as JPEG. sharp drops EXIF/GPS metadata by default, so camera/location data never reaches the public repo.
//
// Usage: mise run photo <source> <destination.jpg>
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

const [src, dest] = process.argv.slice(2);
if (!src || !dest) {
  console.error("Usage: mise run photo <source> <destination.jpg>");
  process.exit(1);
}

mkdirSync(dirname(dest), { recursive: true });
const info = await sharp(src)
  .rotate()
  .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(dest);

console.log(`${dest}: ${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB, metadata stripped`);
