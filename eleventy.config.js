const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Passthrough copies
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("admin");

  // Watch for CSS changes
  eleventyConfig.addWatchTarget("src/assets/css/input.css");

  // -----------------------------------------------
  // Filters
  // -----------------------------------------------
  eleventyConfig.addFilter("dateFormat", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).setLocale("de").toFormat("dd. MMMM yyyy");
  });

  eleventyConfig.addFilter("dateYear", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy");
  });

  eleventyConfig.addFilter("dateISO", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISO();
  });

  eleventyConfig.addFilter("limit", (arr, limit) => {
    return arr.slice(0, limit);
  });

  // -----------------------------------------------
  // Collections
  // -----------------------------------------------
  eleventyConfig.addCollection("projekte", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/projekte/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // Unique years from projekte collection
  eleventyConfig.addCollection("projekteJahre", function (collectionApi) {
    const posts = collectionApi.getFilteredByGlob("src/projekte/*.md");
    const years = [...new Set(posts.map((p) =>
      DateTime.fromJSDate(p.date, { zone: "utc" }).toFormat("yyyy")
    ))].sort((a, b) => b - a);
    return years;
  });

  // -----------------------------------------------
  // Template engine
  // -----------------------------------------------
  return {
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
};
