import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: "#ECDFC2",
          light: "#F1E6CC",
          deep: "#E3D2B3",
          edge: "#B09371",
        },
        ink: {
          DEFAULT: "#2E1F12",
          soft: "#5A3E22",
          faint: "#8A6E50",
        },
        rubric: "#9A3E26",
        sage: "#C1BF95",
        rose: "#CDAF97",
        ochre: "#CFB27F",
      },
      fontFamily: {
        serif: ["var(--font-garamond)", "Georgia", "serif"],
        display: ["var(--font-cormorant)", "var(--font-garamond)", "Georgia", "serif"],
      },
      maxWidth: {
        page: "68rem",
      },
    },
  },
  plugins: [],
};

export default config;
