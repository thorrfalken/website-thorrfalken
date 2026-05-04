/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{njk,md,html}",
    "./admin/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        sand:    "#F2E2C4",  // Primärhintergrund
        amber:   "#F2D479",  // Highlights / Akzente
        cta:     "#F2B56B",  // Call-to-Action
        terra:   "#BF7154",  // Sekundäre Akzente
        brown:   "#59190B",  // Primäre Schrift (dunkelbraun)
        ink:     "#000000",  // Kontrastschrift
      },
      fontFamily: {
        sans: ["Quicksand", "ui-rounded", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      keyframes: {
        "scroll-left": {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-in-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "scroll-left": "scroll-left 28s linear infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
      },
      typography: (theme) => ({
        thorrfalken: {
          css: {
            // Fließtext
            "--tw-prose-body":            theme("colors.brown"),
            "--tw-prose-lead":            theme("colors.brown"),
            // Überschriften
            "--tw-prose-headings":        theme("colors.brown"),
            // Links
            "--tw-prose-links":           theme("colors.terra"),
            // Fett
            "--tw-prose-bold":            theme("colors.brown"),
            // Counters & Bullets
            "--tw-prose-counters":        theme("colors.terra"),
            "--tw-prose-bullets":         theme("colors.cta"),
            // hr
            "--tw-prose-hr":              theme("colors.amber"),
            // Blockquote
            "--tw-prose-quotes":          theme("colors.terra"),
            "--tw-prose-quote-borders":   theme("colors.cta"),
            // Captions
            "--tw-prose-captions":        theme("colors.brown"),
            // Code
            "--tw-prose-code":            theme("colors.terra"),
            "--tw-prose-pre-code":        theme("colors.sand"),
            "--tw-prose-pre-bg":          theme("colors.brown"),
            // th
            "--tw-prose-th-borders":      theme("colors.amber"),
            "--tw-prose-td-borders":      theme("colors.amber"),
            // Schriftart
            fontFamily:                   theme("fontFamily.sans").join(", "),
            // Link-Hover per CSS
            "a:hover": { color: theme("colors.brown") },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
