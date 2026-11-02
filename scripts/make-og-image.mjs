// Generates src/og-image.png: the 1200x630 preview card shown when the site is shared on
// LinkedIn, Slack, iMessage, etc. Re-run (`mise run og`) after changing your name/role or headshot.
// Committed as a static file because SVG text renders with local fonts, which CI doesn't have.
import sharp from "sharp";
import { readFileSync } from "node:fs";

const site = JSON.parse(readFileSync("src/_data/site.json", "utf8"));
const W = 1200, H = 630, PHOTO = 300;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const font = "Segoe UI, Roboto, Arial, sans-serif";

// Background + text as SVG (colors match the site's dark theme tokens).
const card = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2a1f78"/><stop offset="1" stop-color="#141218"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <circle cx="${90 + PHOTO / 2}" cy="${H / 2}" r="${PHOTO / 2 + 8}" fill="#c7bfff"/>
  <text x="460" y="250" font-family="${font}" font-size="68" font-weight="700" fill="#ffffff">${esc(site.title)}</text>
  <text x="460" y="320" font-family="${font}" font-size="36" font-weight="600" fill="#c7bfff">${esc(site.role)}</text>
  <text x="460" y="380" font-family="${font}" font-size="30" fill="#e6e1e9">Android · Kotlin · Jetpack Compose</text>
  <text x="460" y="480" font-family="${font}" font-size="28" fill="#b0a9ba">${esc(site.url.replace(/^https?:\/\//, ""))}</text>
</svg>`;

// Headshot cropped to a circle.
const mask = Buffer.from(`<svg width="${PHOTO}" height="${PHOTO}"><circle cx="${PHOTO / 2}" cy="${PHOTO / 2}" r="${PHOTO / 2}"/></svg>`);
const photo = await sharp("src/images/headshot.jpg")
  .resize(PHOTO, PHOTO)
  .composite([{ input: mask, blend: "dest-in" }])
  .png()
  .toBuffer();

const info = await sharp(Buffer.from(card))
  .composite([{ input: photo, left: 90, top: (H - PHOTO) / 2 }])
  .png({ compressionLevel: 9 })
  .toFile("src/og-image.png");

console.log(`src/og-image.png: ${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB`);
