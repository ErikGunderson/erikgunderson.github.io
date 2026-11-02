// Eleventy configuration. Eleventy reads templates from `src/` and writes plain HTML to `_site/`.
export default function (eleventyConfig) {
  // Files that aren't templates (CSS, JS, images, the resume PDF) are copied to _site as-is.
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");

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
