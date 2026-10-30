import { defineConfig } from "astro/config"

export default defineConfig({
  site: "https://bilim.naal.org.tr",
  trailingSlash: "never",
  build: {
    format: "file",
  },
  server: {
    port: 3000,
  },
})
