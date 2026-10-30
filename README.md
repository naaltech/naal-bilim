# Nevzat Ayaz Anadolu Lisesi Bilim Kulübü

Nevzat Ayaz Anadolu Lisesi Bilim Kulübü'nün resmi web sitesi: [bilim.naal.org.tr](https://bilim.naal.org.tr)

## Kurulum

```bash
# Ortam değişkenlerini hazırla
cp .env.example .env.local

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## Teknolojiler

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase

## Proje Yapısı

- `/app` - Sayfa rotaları
- `/components` - React bileşenleri
- `/components/ui` - shadcn/ui bileşenleri
- `/lib` - Supabase bağlantısı ve yardımcı fonksiyonlar
- `/public` - Statik dosyalar ve Naal Bilim dergisinden alınan çizimler

## Lisans

GPLv3
