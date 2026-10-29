import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: 'https://bilim.naal.org.tr', changeFrequency: 'weekly', priority: 1 }]
}
