// Eleventy configuration. Eleventy reads templates from `src/` and writes plain HTML to `_site/`.
import Image from "@11ty/eleventy-img";

export default function (eleventyConfig) {
  // {% image "src/images/x.jpg", "Alt text", "sizes", [widths], "class", eager %}
  // At build time: resizes the source to each width, encodes AVIF + WebP + JPEG (and drops EXIF
  // metadata), and returns a <picture> the browser picks the smallest suitable file from.
  eleventyConfig.addAsyncShortcode("image", async (src, alt, sizes = "100vw", widths = [400, 800, 1200], cls = "", eager = false) => {
    if (alt === undefined) throw new Error(`Missing alt text for ${src} (use "" for decorative images)`);
    const metadata = await Image(src, {
      widths,
      formats: ["avif", "webp", "jpeg"],
      outputDir: "_site/img/",
      urlPath: "/img/",
    });
    const attrs = {
      alt,
      sizes,
      loading: eager ? "eager" : "lazy", // lazy: offscreen images aren't downloaded until scrolled near
      decoding: "async",
    };
    if (cls) attrs.class = cls;
    return Image.generateHTML(metadata, attrs);
  });

  // Files that aren't templates (CSS, JS, images, the resume PDF) are copied to _site as-is.
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");
  eleventyConfig.addPassthroughCopy("src/apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("src/og-image.png");

  // Rebuild + reload the dev server when CSS/JS change.
  eleventyConfig.addWatchTarget("src/css/");
  eleventyConfig.addWatchTarget("src/js/");

  // Filters are functions templates can pipe values through: {{ "2022-04" | monthYear }} → "Apr 2022".
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  eleventyConfig.addFilter("monthYear", (ym) => {
    if (!ym) return "Present";
    const [year, month] = ym.split("-");
    return `${MONTHS[Number(month) - 1]} ${year}`;
  });

  // Footer copyright year.
  eleventyConfig.addGlobalData("year", () => new Date().getFullYear());
}

export const config = {
  dir: {
    input: "src",
    includes: "_includes", // layouts & partials: src/_includes
    data: "_data",         // global data files: src/_data
    output: "_site",
  },
  // Use Nunjucks to pre-process Markdown and HTML files too, so they can use {{ variables }}.
  markdownTemplateEngine: "njk",
  htmlTemplateEngine: "njk",
};
