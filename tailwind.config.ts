import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{astro,ts}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        accent: {
          cyan: "hsl(var(--accent-cyan))",
          yellow: "hsl(var(--accent-yellow))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: "hsl(var(--card))",
        border: "hsl(var(--foreground) / 0.15)",
      },
      fontFamily: {
        sans: ["Geist Variable", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
