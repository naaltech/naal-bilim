# Nevzat Ayaz Anadolu Lisesi Bilim Kulübü

Nevzat Ayaz Anadolu Lisesi Bilim Kulübü'nün resmi web sitesi: [bilim.naal.org.tr](https://bilim.naal.org.tr)

## Kurulum

```bash
# Ortam değişkenlerini hazırla
cp .env.example .env

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## Teknolojiler

- Astro
- TypeScript
- Tailwind CSS
- Supabase

## Proje Yapısı

- `/src/pages` - Sayfa rotaları
- `/src/components` - Astro bileşenleri
- `/src/layouts` - Sayfa iskeleti ve SEO etiketleri
- `/src/lib` - Supabase bağlantısı ve yardımcı fonksiyonlar
- `/public` - Statik dosyalar ve Naal Bilim dergisinden alınan çizimler

## Lisans

GPLv3
