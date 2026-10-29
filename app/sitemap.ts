import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://bilim.naal.org.tr', changeFrequency: 'weekly', priority: 1 },
    { url: 'https://bilim.naal.org.tr/dergi', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://bilim.naal.org.tr/basvuru', changeFrequency: 'monthly', priority: 0.8 },
  ]
}
