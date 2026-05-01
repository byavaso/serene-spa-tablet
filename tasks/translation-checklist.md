# Translation Checklist — RU / AR / DE

Pilot sonrası profesyonel çeviri için tek kaynaklı brief. Tüm `[LANG][TODO]` ve `[LANG]` prefix'li string'ler `data/ru.json`, `data/ar.json`, `data/de.json`'da yer alıyor.

**Çevirmen workflow:**
1. Tablo'daki her satırı çevir, JSON dosyasında ilgili anahtarı bul, prefix'i kaldır + metni değiştir.
2. Tüm satırlar tamamlandığında repo grep ile doğrula: `[RU]`, `[AR]`, `[DE]`, `[TODO]` → 0 sonuç.
3. AR için RTL doğrulama: tablette tek seferli görsel kontrol (kopyala-yapıştır yön bozabilir, mutlaka inspect).

## UI string'leri

Her satır 5 dil için aynı anahtarı temsil eder. TR + EN referans sütunlarında otorite metin var.

| Anahtar (`ui.*`) | TR (referans) | EN (referans) | RU | AR | DE | Sorumlu | Durum |
|---|---|---|---|---|---|---|---|
| `selectLanguage` | Lütfen dilinizi seçin | Please select your language | [RU] | [AR] | [DE] | | |
| `back` | Geri | Back | [RU] | [AR] | [DE] | | |
| `home` | Ana Sayfa | Home | [RU] | [AR] | [DE] | | |
| `changeLanguage` | Dil Değiştir | Change Language | [RU] | [AR] | [DE] | | |
| `duration` | Süre | Duration | [RU] | [AR] | [DE] | | |
| `price` | Fiyat | Price | [RU] | [AR] | [DE] | | |
| `benefits` | Faydalar | Benefits | [RU] | [AR] | [DE] | | |
| `categoriesTitle` | Hizmetlerimiz | Our Services | [RU] | [AR] | [DE] | | |
| `servicesTitle` | Hizmetler | Treatments | [RU] | [AR] | [DE] | | |
| `title` | Serene Spa Wellness | Serene Spa Wellness | [RU][TODO] | [AR][TODO] | [DE][TODO] | | |
| `loading` | Yükleniyor... | Loading... | [RU][TODO] | [AR][TODO] | [DE][TODO] | | |
| `errorLoad` | Menü yüklenemedi. Lütfen tekrar deneyin. | Failed to load menu. Please try again. | [RU][TODO] | [AR][TODO] | [DE][TODO] | | |

## İçerik (kategoriler + servisler)

Her dil JSON dosyasında `categories[].name`, `categories[].description`, `categories[].services[].name`, `categories[].services[].shortDescription`, `categories[].services[].longDescription`, `categories[].services[].benefits[]` alanları aynı `[LANG]` prefix konvansiyonu ile placeholder taşıyor. TR + EN dosyaları otorite kaynak; çevirmen TR'den çevirir.

**Kategoriler (5 adet):** `massages`, `facials`, `body`, `hammam`, `wellness`
**Servisler:** her kategori altında 6 adet (toplam ~30)

İçerik çevirisi tonu:
- Premium, sakin, doğal — pazarlama jargonu yok
- Kısa ve net cümleler (kiosk dokunmatik UX)
- Kültürel uyum: AR'da dini/sosyal hassas terim yok; DE'de Sie formel hitabı; RU'da fiil zamanı tutarlı

## Doğrulama

```bash
# Repo root'tan, prefix kalmadığını teyit et:
grep -rn "\[RU\]\|\[AR\]\|\[DE\]\|\[TODO\]" data/
# 0 sonuç beklenir
```

Tüm sonuç boş olduğunda commit ve PR aç.
