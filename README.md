# Serene Spa Wellness — Tablet Menu

Spa lobisinde tablet üzerinde çalışan, çoklu dil hizmet menüsü PWA. GitHub Pages üzerinde host, Fully Kiosk Browser ile tam ekran.

---

## Menü Güncelleme (Sahip Rehberi)

Menü tüm dillerde JSON dosyalarındadır. GitHub web arayüzünden 5-10 dakikada güncellenebilir, kod bilgisi gerekmez.

### 1. Dosyayı aç

GitHub'da repoyu aç → `data/` klasörü → düzenlemek istediğin dilin dosyasını tıkla:

| Dil | Dosya |
|-----|-------|
| Türkçe | `data/tr.json` |
| İngilizce | `data/en.json` |
| Rusça | `data/ru.json` |
| Arapça | `data/ar.json` |
| Almanca | `data/de.json` |

### 2. Düzenle

Sağ üstteki kalem ikonuna ✏️ tıkla → tarayıcıda metin editörü açılır.

### 3. Yapı

```json
{
  "categories": [
    {
      "id": "massages",
      "name": "Masajlar",
      "description": "...",
      "image": "images/categories/massages.webp",
      "services": [
        {
          "id": "aromatherapy",
          "name": "Aromaterapi Masajı",
          "shortDescription": "Kısa açıklama",
          "longDescription": "Uzun açıklama",
          "duration": 60,           ← dakika (sayı, tırnak yok)
          "price": 90,              ← EUR (sayı, tırnak yok)
          "image": "images/services/aromatherapy.webp",
          "benefits": [
            "Fayda 1",
            "Fayda 2"
          ]
        }
      ]
    }
  ]
}
```

### 4. Yaygın işlemler

**Hizmet ekle:** Bir kategori içindeki `services` dizisinin sonuna yeni bir `{...}` blok kopyala. `id` benzersiz olmalı (boşluksuz, küçük harf).

**Fiyat değiştir:** Sadece `"price": 90` satırındaki sayıyı değiştir. EUR olarak.

**Süre değiştir:** `"duration": 60` — dakika cinsinden sayı.

**Hizmet kaldır:** İlgili `{...}` bloğu sil. Önceki bloğun sonundaki virgülü kontrol et.

### 5. Görsel ekle

Yeni hizmet görseli için:
1. `images/services/` klasörünü aç
2. `Add file` → `Upload files` → WebP veya JPG dosyayı sürükle
3. Dosya adını JSON'da `"image": "images/services/dosya-adi.webp"` olarak yaz

> Görsel önerisi: 1200x900 piksel, WebP formatı, 200KB altı.

### 6. Kaydet

Sayfanın altında `Commit changes` → kısa açıklama yaz (örn "Aromaterapi fiyatı güncellendi") → `Commit changes` butonuna bas.

### 7. Yansıma

- ~1 dakika sonra GitHub Pages deploy olur
- Tabletteki uygulama bir sonraki sayfa yüklemesinde günceli görür
- Worst case: 24 saat içinde her tablet otomatik update kontrolü yapar

---

## Tüm dillerde tutarlılık

Bir hizmetin `id` alanı tüm dil dosyalarında aynı olmalı. Yeni hizmet eklerken 5 dosyaya da aynı `id` ile eklenmeli (çevirisi farklı olabilir).

`[RU]`, `[AR]`, `[DE]` prefix'li metinler henüz çevrilmemiş placeholder'dır. Pilot başarılı olunca profesyonel çevirmen bu prefix'leri kaldırarak gerçek çeviriyi yapacak.

---

## Yapı (Geliştirici için)

```
spa-menu/
├── index.html              ana giriş
├── manifest.json           PWA
├── service-worker.js       offline + günlük update check
├── css/
│   ├── tokens.css          tüm renk/font/size değerleri burada
│   ├── style.css           global
│   └── screens.css         ekran-spesifik
├── js/
│   ├── app.js              boot, route registry
│   ├── router.js           hash router
│   ├── i18n.js             dil yükleyici + Intl formatters
│   ├── idle.js             60sn timer
│   └── screens/            welcome / language / categories / services / detail
├── data/                   her dil için JSON
├── images/                 categories/ services/ ui/
└── .github/workflows/      Pages deploy
```

PRD: `tasks/prd-spa-tablet-menu.md`. Kiosk kurulumu: `docs/kiosk-setup.md`.

---

## Pilot Sonrası İyileştirme Listesi

Pilot başarılıysa bu maddeler sırayla ele alınır. v1 kapsamı dışı, bilinçli ertelendi.

| # | Madde | Aksiyon | Kim |
|---|-------|---------|-----|
| 1 | Breakpoint token (sadece 2+ yerde tekrar edenler) | `--bp-md: 900px` gibi 1-2 token, ayrı PR'a değmez | dev |
| 2 | Hash format kanonikleştir (`#services/<id>`) | Pilot'tan sonra dön, kozmetik | dev |
| 3 | Kategori/hizmet/welcome görselleri (`images/` altı) | WebP, ~1200x900, <200KB | sahip |
| 4 | RU/AR/DE gerçek çeviri (placeholder prefix kaldır) | `[RU]/[AR]/[DE]` grep, JSON'da değiştir | profesyonel çevirmen |

> Pilot 2 hafta sonu: hangi diller seçiliyor, misafir nerede takılıyor — verilen rapor + bu liste birlikte değerlendirilir.
