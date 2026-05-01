# Görsel Brief — Serene Spa Tablet Menü

Bu doküman tabletteki menü uygulaması için gereken **38 görseli** tanımlar. Müşteri (spa sahibi) görselleri kendi çekimi veya stok arşivden temin edecek, listeyi takip ederek geliştiriciye yollayacak.

---

## Genel Stil — hepsi için geçerli

**Estetik:** Premium, sakin, doğal. Bol nefes alan kompozisyon. Yumuşak ışık, yüksek tonlu (high-key) ya da sıcak amber tonlu fotoğraflar.

**Renk paleti:** Doğal — sage yeşili, krem, taupe, bej, soft beyaz, altın/bakır aksanlar. Aşırı doygun renk **yok**.

**Mood:** Lüks ama abartısız. "Otel spa'sında 5 yıldızlı, eli kalem tutan misafire hitap eden" hava.

**Kaçınılacaklar:**
- ❌ Yüz ifadeleri abartılı (kahkaha atan, gözü kapalı melodram)
- ❌ Aşırı parlak / yapay renk filtreleri (Instagram preset hissi)
- ❌ Kalabalık kompozisyon (5'ten fazla nesne)
- ❌ Plastik/sentetik materyal vurgusu
- ❌ Marka logosu içeren havlu, şişe vb. (telif sorunu)
- ❌ Personel yüzü net görünen kareler (kişilik hakkı)
- ❌ Filigranlı stok görseli

**Tercih edilen:**
- ✅ Doğal materyal (taş, ahşap, keten, mermer, bakır)
- ✅ Bitki/yağ/su gibi organik elementler
- ✅ Eller (yüz değil) gösteren close-up'lar
- ✅ Yumuşak gölge + diffüze ışık

---

## Teknik Spesifikasyon — hepsi için geçerli

| Madde | Değer |
|-------|-------|
| Format | **WebP** (alternatif: JPG, sonra dönüştürürüz) |
| Boyut | **1200 × 900 piksel** (4:3 oranı) |
| Dosya boyutu | **<200 KB** |
| Renk profili | sRGB |
| Çözünürlük | 72 DPI (web) |
| Yön | Yatay (landscape) — welcome görseli hariç tartışılır |

> Stok arşivinden alınıyorsa: Unsplash, Pexels (ücretsiz, ticari kullanım) veya Adobe Stock / Shutterstock (lisanslı). **Filigranlı versiyon yollanmasın**, full lisanslı yollansın.

---

## 1. Welcome (Karşılama) Görseli — 1 adet

**Dosya adı:** `images/ui/welcome.webp`
**Boyut:** **1920 × 1080 px** (full-HD, tablet ekranını tam kapsar)

Bu uygulamanın en kritik görseli. Misafir tableti gördüğünde ilk izlenim. Üstüne 5 dilde "Dokunarak başlayın" metni binecek (alt yarıya), bu yüzden **üst yarıda görsel ağırlık olmalı**.

**Konsept önerileri (biri seçilir):**
- Bir spa odası — yumuşak ışık, mum, bitki, taş — kimse görünmüyor
- Yeşillik içinde su yüzeyi, üzerine dökülen ışık
- Yüksek pencereli minimalist hamam — buhar, mermer, doğal ışık
- Esansiyel yağ damlasının suya düştüğü an (slow-motion stop frame)

**Kaçınılacak:** İnsan yüzü, marka, çok detay.

---

## 2. PWA İkonları — 2 adet

Tablet uygulamayı home screen'e eklerse görünecek ikon. Marka logosu temel alınır; logo yoksa basit monogram (SS) yeterli.

| Dosya | Boyut |
|-------|-------|
| `images/ui/icon-192.png` | 192 × 192 px |
| `images/ui/icon-512.png` | 512 × 512 px |

**Format:** PNG (transparan zemin **yok**, krem/sage zemin tercih).
**Stil:** Logo veya monogram + ortalama bol boşluk (safe area %20).

> Brand kit gelince logo ile birlikte düzenleyeceğiz, şimdilik placeholder yeterli.

---

## 3. Kategori Görselleri — 5 adet

Her kategori için bir hero görseli. Kategori kartında üstte gösterilir, kategorinin "ruhunu" anlatır.

| ID / Dosya | Konsept | Anahtar elementler |
|---|---|---|
| `massages.webp` | Sıcak yağ ile masaj anı | Sırt close-up, terapist eli, sıcak yağ, havlu, mum |
| `facials.webp` | Yüz bakımı sahnesi | Cam jar içinde krem/serum, yaprak, cilt close-up, beyaz havlu |
| `body.webp` | Vücut bakımı / sargı | Kil, yosun, fırça, granit/mermer zemin, çıplak omuz |
| `hammam.webp` | Geleneksel hamam | Mermer göbek taşı, bakır tas, köpük, buhar, doğal ışık |
| `wellness.webp` | Komple deneyim / lounge | Bornozlu kişi (sırt), yastıklı şezlong, çay, manzara |

---

## 4. Hizmet Görselleri — 30 adet

Her hizmet için 1 görsel. **Kategori görselinden farklı olmalı** (yoksa tekrarlı görünür). Daha spesifik, hizmetin özünü anlatan kareler.

### 4.1 Masajlar (6)

| Dosya | Konsept |
|---|---|
| `aromatherapy.webp` | Esansiyel yağ damlatılırken, yağ şişeleri sırada (lavanta, ylang) |
| `deep-tissue.webp` | Sırt kası üzerinde dirsek baskısı, kuvvetli ama zarif eller |
| `hot-stone.webp` | Sırta dizilmiş siyah bazalt taşları, buhar |
| `swedish.webp` | Yumuşak akıcı el hareketi, sırt + omuz, neutral ışık |
| `thai.webp` | Mat üzerinde esneme pozu, gevşek pamuklu kıyafet |
| `couples.webp` | Yan yana iki masaj yatağı, iki mum, simetri |

### 4.2 Yüz Bakımı (6)

| Dosya | Konsept |
|---|---|
| `hydrating.webp` | Hyaluronik damlalık, su damlacığı, cam jar, yaprak |
| `anti-aging.webp` | Krem dokusu close-up, altın detay, parmakla uygulama |
| `purifying.webp` | Siyah kil maske yüzde, beyaz havlu, minimalist |
| `brightening.webp` | C vitamini turuncu serum, narenciye dilimi, ışık |
| `express.webp` | Kum saati + yüz close-up, hızlılık vurgusu |
| `luxury-facial.webp` | 24 ayar altın yaprak yüze yapıştırılmış, dramatik ışık |
| (Not: dosya adı `luxury-facial.webp` — `luxury.webp` değil) |  |

### 4.3 Vücut Bakımları (6)

| Dosya | Konsept |
|---|---|
| `body-scrub.webp` | Şeker/tuz scrub avuçta, esansiyel yağ, fırça |
| `body-wrap.webp` | Yosun/kil sargı bacak/kol üzerinde, doku close-up |
| `anti-cellulite.webp` | Drenaj fırçası, vücut hattı, neutral ışık |
| `back-treatment.webp` | Sırta uygulanmış kil maske, omuz omurgası çizgisi |
| `hand-foot.webp` | El + ayak bakımı, lavanta, beyaz havlu |
| `signature-body.webp` | Geniş sahne — tüm element bir arada (taş, krem, yağ, fırça) |

### 4.4 Hamam (6)

| Dosya | Konsept |
|---|---|
| `classic-hammam.webp` | Göbek taşı + bol köpük, yumuşak ışık |
| `royal-hammam.webp` | Sultanlık temalı — bakır tas + altın detay + mermer |
| `couples-hammam.webp` | Mermer hamam alanı iki taraflı simetri |
| `moroccan-bath.webp` | Siyah sabun (savon noir) + gül yaprakları + bakır kase |
| `scrub-foam.webp` | Kese eldiveni + köpük, eller görünüyor sadece |
| `hammam-massage.webp` | Hamam → masaj geçişi (mum + havlu + bakır tas + masaj yağı tek karede) |

### 4.5 Wellness Paketleri (6)

| Dosya | Konsept |
|---|---|
| `half-day.webp` | Saatli kompozisyon — gün ortası, çay servisi, manzara |
| `full-day.webp` | Bornoz + öğle yemeği tepsisi + güneş ışığı, lüks gün havası |
| `couples-package.webp` | İki bornoz, iki çay, romantik atmosfer |
| `bridal.webp` | Beyaz çiçek + beyaz havlu + manikür detayı, gelin teması |
| `detox.webp` | Yeşil smoothie + ferah yapraklar + temizlik teması |
| `stress-relief.webp` | Mum + sıcak taş + nefes alma teması, yumuşak yeşil |

---

## 5. Adlandırma kuralı

- Tümü **küçük harf**, kelime aralarına `-` (tire)
- ID'ler JSON'daki `id` ile **birebir aynı** olmalı (kod referansı)
- Uzantı **`.webp`** (JPG yollanırsa biz dönüştürürüz)
- Türkçe karakter yok dosya adında

> Örnek: `aromatherapy.webp` ✅, `Aromaterapi Masaji.webp` ❌

---

## 6. Teslimat

Müşteri görselleri tamamlayınca tek bir ZIP olarak yollar. Klasör yapısı:

```
gorseller.zip
├── ui/
│   ├── welcome.webp
│   ├── icon-192.png
│   └── icon-512.png
├── categories/
│   ├── massages.webp
│   ├── facials.webp
│   ├── body.webp
│   ├── hammam.webp
│   └── wellness.webp
└── services/
    ├── aromatherapy.webp
    ├── deep-tissue.webp
    └── ... (toplam 30 dosya)
```

Eksik görsel olursa o slot'a placeholder gradient kalır (uygulama yine açılır, sadece o kart görselsiz görünür). **Welcome ve kategori görselleri öncelikli**, hizmet görselleri kısmen gelse de pilot başlayabilir.

---

## 7. Lisans / Telif

- Müşteri **kendi çektiği fotoğrafları** kullanabilir (en iyisi)
- Stok kullanılacaksa **ticari lisans** şart (Unsplash/Pexels = serbest, Adobe Stock/Shutterstock = lisans satın alındı belgesi)
- AI üretimi (Midjourney, DALL-E) kabul — ticari kullanım onaylı modelle (Midjourney Pro vb.)

---

## 8. Hızlı kontrol listesi (müşteri için)

- [ ] 1 adet welcome görseli (1920×1080)
- [ ] 2 adet PWA ikonu (192, 512 px PNG)
- [ ] 5 adet kategori görseli (1200×900)
- [ ] 30 adet hizmet görseli (1200×900)
- [ ] Tümü WebP veya JPG, <200KB
- [ ] Lisans/telif sorunsuz
- [ ] Dosya adları listedeki ID'lerle **birebir aynı**

**Toplam: 38 görsel.**
