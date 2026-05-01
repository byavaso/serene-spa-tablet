# PRD: Spa Tablet Menu (Serene Spa Wellness)

## Introduction

Serene Spa Wellness lobilerinde misafirlere dil seçtirip o dilde spa hizmet menüsünü gösteren statik PWA. Backend yok, GitHub Pages üzerinde host edilir, Fully Kiosk Browser ile tablette tam ekran çalışır. Yıllık 1-2 menü güncellemesi sahip tarafından doğrudan JSON dosyaları üzerinden GitHub web UI ile yapılır.

## Goals

- 5 dilde (TR, EN, RU, AR, DE) hizmet menüsü; AR için RTL layout
- Akış: Bekleme → dil seçim → kategori → hizmet listesi → hizmet detay
- Premium spa estetiği (sage/taupe/krem/altın placeholder palet, brand kit gelince override)
- 60sn idle sonrası welcome ekranına otomatik dönüş, dil state temizlenir
- Offline çalışma (service worker cache, JSON network-first 5sn timeout)
- 1 hafta içinde tek geliştiriciyle deploy edilebilir
- Sıfır aylık işletme maliyeti
- Sahibi GitHub web UI'dan JSON düzenleyebilir, ~1dk içinde tabletlere yansır
- Tablet 24sa'lik update check ile yeni deploy'u garantili alır
- Locale-aware fiyat/süre formatı (Intl.NumberFormat + per-dil durationUnit)

## User Stories

### US-001: Repo iskelet + manifest
**Description:** As a developer, I need the project skeleton so subsequent stories have a place to land.

**Acceptance Criteria:**
- [ ] Klasör yapısı: `css/ js/ data/ images/categories/ images/services/ images/ui/ docs/ .github/workflows/`
- [ ] Boş `index.html` (placeholder `<!DOCTYPE html>`)
- [ ] `manifest.json` (name, short_name, start_url=`./`, display=`fullscreen`, theme_color, background_color, icons placeholder)
- [ ] `.gitignore` (OS junk, .DS_Store, Thumbs.db, .vscode/)
- [ ] `README.md` placeholder (bir cümle)
- [ ] Tarayıcıda local server açıldığında 200 döner

**Dependencies:** None

---

### US-002: JSON şema + tr.json placeholder
**Description:** As a developer, I need the canonical data schema in Turkish so other languages can mirror it.

**Acceptance Criteria:**
- [ ] `data/tr.json` üret aşağıdaki şema ile:
  - `meta`: `{language:"tr", direction:"ltr", languageName:"Türkçe", currency:"EUR", durationUnit:"dk", locale:"tr-TR"}`
  - `ui`: `{welcomeRotate:{tr,en,ru,ar,de}, selectLanguage, back, home, duration, price, benefits}`
  - `categories[]`: 5 kategori, her biri `{id, name, description, image, services[]}`
  - Her kategoride ~6 hizmet: `{id, name, shortDescription, longDescription, duration:Number, price:Number, image, benefits[]}`
- [ ] Toplam ~30 hizmet placeholder content (Türkçe)
- [ ] JSON valid (parse hatası yok)
- [ ] Fiyatlar EUR (number, format runtime'da)

**Dependencies:** US-001

---

### US-003: EN gerçek + RU/AR/DE placeholder JSON
**Description:** As a developer, I need all 5 language files in place so the loader works end-to-end during dev.

**Acceptance Criteria:**
- [ ] `data/en.json`: profesyonel İngilizce çeviri (placeholder content), `meta.durationUnit:"min"`, `meta.locale:"en-GB"`
- [ ] `data/ru.json`: TR kopya, tüm string'lere `[RU]` prefix, `meta.durationUnit:"мин"`, `meta.locale:"ru-RU"`
- [ ] `data/de.json`: TR kopya, `[DE]` prefix, `meta.durationUnit:"Min."`, `meta.locale:"de-DE"`
- [ ] `data/ar.json`: TR kopya, `[AR]` prefix, `meta.direction:"rtl"`, `meta.durationUnit:"د"`, `meta.locale:"ar-SA"`, `meta.numberingSystem:"latn"` (Latin rakam, ARABIC-INDIC değil)
- [ ] 5 dosya valid JSON, fetch ile yüklenebilir
- [ ] Arapça literal'lar (örn `العربية`) güvenilir kaynaktan kopya, render visual doğrulanmış

**Dependencies:** US-002

---

### US-004: CSS design tokens (token-only kural)
**Description:** As a developer, I need a single source of truth for design values so brand kit gelince tek dosya değişimiyle yeni tema uygulanabilir.

**Acceptance Criteria:**
- [ ] `css/tokens.css` `:root` altında: renk paleti (sage/taupe/cream/gold placeholder), typography (serif başlık + sans-serif gövde), spacing scale (xs..2xl), radius scale, transition timing (300-400ms ease-out), tap-target min 60px, z-index scale
- [ ] Font-face deklarasyonları (placeholder system stack, brand kit'ten önce)
- [ ] **Kural:** Tüm CSS dosyalarında literal renk/font/size yasak, sadece `var(--*)` referansı
- [ ] `grep -nE '#[0-9a-fA-F]{3,6}|rgb\(|px |rem ' css/style.css` sonucu boş veya açıklamalı istisna
- [ ] Tokens dokümante (her değişkenin yanında 1 satırlık yorum)

**Dependencies:** None

---

### US-005: Base shell + persistent header slot
**Description:** As a developer, I need the global HTML scaffold so screens can plug in.

**Acceptance Criteria:**
- [ ] `index.html`: `<header id="topbar" hidden>` (Home + Lang slotları), `<main id="screen">` full-viewport
- [ ] `css/style.css`: global reset, tokens import, full-viewport layout, `touch-action: manipulation` body'de
- [ ] Welcome ekranında header `hidden`, diğer ekranlarda görünür
- [ ] Tap target butonları min 60px (token referansı)
- [ ] Tarayıcıda boş ama yapılı ekran açılır

**Dependencies:** US-004

---

### US-006: Hash router modülü
**Description:** As a developer, I need a tiny SPA router so screens can navigate without page reload.

**Acceptance Criteria:**
- [ ] `js/router.js` ES module export: `register(name, renderFn)`, `navigate(name, params)`, `back()`
- [ ] `hashchange` listener tetikler render
- [ ] History stack tutar; `back()` önceki ekrana döner
- [ ] `#welcome`, `#language` gibi hash'ler doğru renderFn çağırır
- [ ] Console error yok

**Dependencies:** None

---

### US-007: i18n loader modülü
**Description:** As a developer, I need a single module that swaps active language and exposes UI/data dictionaries.

**Acceptance Criteria:**
- [ ] `js/i18n.js` ES module: `loadLanguage(code)` JSON fetch eder, `state.data` + `state.ui` doldurur, `<html lang>` ve `<html dir>` set eder
- [ ] `t(key)` UI string getter (nested key path desteği opsiyonel)
- [ ] `formatPrice(value)` ve `formatDuration(value)` helper'lar — Intl.NumberFormat ve `${value} ${meta.durationUnit}` ile
- [ ] `loadLanguage('ar')` sonrası `<html dir="rtl">`
- [ ] JSON fetch hatasında console error + fallback davranışı (TR'ye düş)

**Dependencies:** US-003

---

### US-008: Welcome/idle ekranı (multilingual rotator)
**Description:** As a guest, I want to see a multilingual welcome so I feel addressed regardless of my language.

**Acceptance Criteria:**
- [ ] Full-bleed yüksek kalite spa stok görseli (`images/ui/welcome.webp` placeholder)
- [ ] Ortada tek satır metin 5 dilde rotate: TR → EN → RU → AR → DE → TR... her dil 3sn görünür, 600ms cross-fade
- [ ] AR adımı için o `<span>` elemana `dir="rtl"` set et
- [ ] `prefers-reduced-motion: reduce` → statik (TR string)
- [ ] Tap anywhere → `navigate('language')`
- [ ] Header gizli kalır
- [ ] Verify changes work in browser (5 dil sırayla görünür, fade smooth)

**Dependencies:** US-005, US-006

---

### US-009: Dil seçim ekranı
**Description:** As a guest, I want to choose my language from clear options so the menu is in my native tongue.

**Acceptance Criteria:**
- [ ] 5 dil kartı grid layout: Türkçe / English / Русский / العربية / Deutsch
- [ ] Arapça etiketi `العربية` (ا alif ile başlar — al- definite article + عربية) — güvenilir kaynaktan, render visual doğrulanmış
- [ ] Her kart tap target ≥60px, yumuşak köşe (radius token)
- [ ] Tap → `loadLanguage(code)` + `navigate('categories')`
- [ ] AR seçince `<html dir="rtl">` aktif olur
- [ ] Header görünür hale gelir
- [ ] Verify changes work in browser

**Dependencies:** US-007, US-008

---

### US-010: Kategori listesi ekranı
**Description:** As a guest, I want to browse spa service categories so I can find what interests me.

**Acceptance Criteria:**
- [ ] Card grid: 5 kategori, her kart `{image, name, description}` gösterir
- [ ] `<img loading="lazy">` ile lazy load
- [ ] Tap → `navigate('services', {categoryId})`
- [ ] AR aktifken grid akışı RTL (logical properties)
- [ ] Verify changes work in browser

**Dependencies:** US-007, US-009

---

### US-011: Hizmet listesi ekranı
**Description:** As a guest, I want to see services with prices and durations so I can compare options.

**Acceptance Criteria:**
- [ ] Belirli kategorinin hizmet kartları: küçük görsel + isim + süre + fiyat
- [ ] Süre format: `${value} ${meta.durationUnit}` (örn TR `60 dk`, EN `60 min`)
- [ ] Fiyat format: `Intl.NumberFormat(meta.locale, {style:'currency', currency:'EUR'}).format(value)` — TR `1.800,00 €`, EN `€1,800.00`
- [ ] Tap → `navigate('detail', {serviceId})`
- [ ] Verify changes work in browser (dil değiştiğinde format değişir)

**Dependencies:** US-010

---

### US-012: Hizmet detay ekranı
**Description:** As a guest, I want full details of a service so I can decide whether to book.

**Acceptance Criteria:**
- [ ] Hero görsel + isim + uzun açıklama + benefits liste (bullet) + süre + fiyat
- [ ] Süre/fiyat US-011 ile aynı locale-aware formatter
- [ ] Header'daki Geri/Home çalışır
- [ ] Verify changes work in browser

**Dependencies:** US-011

---

### US-013: Persistent header (Home + Lang Change)
**Description:** As a guest, I want quick navigation buttons available throughout so I can reset or change language anytime.

**Acceptance Criteria:**
- [ ] Header sağ üstte 2 buton: "Ana Sayfa" → categories ekranı, "Dil Değiştir" → language ekranı
- [ ] İkon + label, label i18n dict'ten
- [ ] Welcome ekranında header gizli, diğerlerinde görünür
- [ ] Tap target ≥60px
- [ ] AR aktifken sol üstte (logical position)
- [ ] Verify changes work in browser

**Dependencies:** US-005, US-009

---

### US-014: Arapça RTL doğrulama
**Description:** As an Arabic-speaking guest, I want the layout to flow right-to-left so it reads naturally.

**Acceptance Criteria:**
- [ ] CSS `padding`/`margin` yerine `padding-inline-start/end`, `margin-inline-*` kullanılmış (logical properties)
- [ ] AR seçince layout mirror: header sağ→sol, grid akışı sağdan başlar
- [ ] Navigasyon ok ikonları flip (chevron-left ↔ chevron-right)
- [ ] Sayılar Latin rakam (`numberingSystem:"latn"` zaten JSON'da)
- [ ] Verify changes work in browser (AR sekmesinde tüm ekranlar mirror)

**Dependencies:** US-009

---

### US-015: 60sn idle timer
**Description:** As the kiosk, I need to reset to welcome after inactivity so the next guest sees a clean start.

**Acceptance Criteria:**
- [ ] `js/idle.js` ES module: `pointerdown` ve `touchstart` resetler timer
- [ ] Timeout süresi 60sn → `navigate('welcome')`
- [ ] Welcome ekranında dil state temizlenir (sıradaki misafir kendi dilini seçer)
- [ ] Welcome ekranında timer pasif (zaten attract loop'ta)
- [ ] Verify changes work in browser (60sn dokunma → welcome'a döner)

**Dependencies:** US-006, US-008

---

### US-016: Sayfa geçiş animasyonları
**Description:** As a guest, I want smooth transitions so the experience feels premium.

**Acceptance Criteria:**
- [ ] Router render'ında 300ms fade-in/out + ufak translate (8-12px)
- [ ] `prefers-reduced-motion: reduce` → animasyon devre dışı
- [ ] Geçişlerde jank yok (60fps tabletde)
- [ ] Transition timing token'dan referans
- [ ] Verify changes work in browser

**Dependencies:** US-006

---

### US-017: Service worker offline cache + günlük update check
**Description:** As the kiosk, I need offline resilience and automatic updates so guests always see a working menu and owners' edits propagate without manual reload.

**Acceptance Criteria:**
- [ ] `service-worker.js` üstte `const SW_VERSION = 'v1.0.0'`; cache adı `spa-menu-${SW_VERSION}`
- [ ] App shell precache (HTML, CSS, JS, manifest, ui icons) → cache-first
- [ ] JSON dosyaları → **network-first 5 saniye timeout**, timeout sonrası cache fallback
- [ ] Images → cache-first
- [ ] `activate` event eski versiyon cache'leri temizler
- [ ] `index.html`'de SW register + `setInterval(() => registration.update(), 24 * 60 * 60 * 1000)` (24sa'lik update tetiği)
- [ ] Wifi offline test: app açılır, son cache serve edilir
- [ ] SW_VERSION bump + reload sonrası eski cache silinmiş

**Dependencies:** US-001

---

### US-018: GitHub Actions Pages deploy (public repo)
**Description:** As the developer, I need automatic deploy on push so menu updates go live without manual steps.

**Acceptance Criteria:**
- [ ] Repo public (ücretsiz GitHub Pages)
- [ ] `.github/workflows/deploy.yml`: `main` push → GitHub Pages deploy (no build step, static files)
- [ ] Workflow yeşil geçer
- [ ] Public Pages URL menüyü serve eder
- [ ] Push to main → ~1dk içinde live

**Dependencies:** US-017

---

### US-019: Owner edit guide README
**Description:** As the spa owner, I need a Turkish guide so I can update the menu via GitHub web UI without help.

**Acceptance Criteria:**
- [ ] `README.md` Türkçe: GitHub web UI'dan JSON düzenleme adımları (her 5 dilde nasıl)
- [ ] Yeni hizmet ekleme örneği (kopyala-yapıştır)
- [ ] Görsel yükleme adımları (`images/services/` altına)
- [ ] Deploy timing açıklaması (~1dk + 24sa SW update worst case)
- [ ] Ekran görüntüsü veya net adım numaralandırma

**Dependencies:** US-018

---

### US-020: Tablet kiosk konfigürasyon notları
**Description:** As the technician, I need a setup doc so any new tablet can be deployed identically.

**Acceptance Criteria:**
- [ ] `docs/kiosk-setup.md`: Fully Kiosk Browser ayarları
  - Start URL (Pages URL)
  - Screensaver off, screen always on
  - Auto-restart on crash
  - Allow service worker, allow JS
  - Ekran kilidi (exit lock)
- [ ] Antimikrobiyal koruyucu + sabit stand notu
- [ ] Yeni tablet bu dökümanla baştan ayaklanabilir

**Dependencies:** US-018

---

## Functional Requirements

- FR-1: Uygulama 5 mantıksal ekran sunar: welcome, language, categories, services, detail (hash routing).
- FR-2: Welcome ekranı 5 dilde rotate eden tek satır gösterir (3sn/dil, 600ms cross-fade); default dil yok.
- FR-3: Aktif dil `<html lang>` + `<html dir>` set eder; AR için `dir="rtl"`.
- FR-4: Her dil için ayrı JSON dosyası; tek menü tüm lokasyonlarda kullanılır.
- FR-5: Fiyatlar EUR (number); render `Intl.NumberFormat(locale, {style:'currency', currency:'EUR'})` ile dile göre.
- FR-6: Süre birimi i18n dict'ten (`meta.durationUnit`); sayı + birim string.
- FR-7: 60sn dokunulmazsa welcome'a döner ve dil state temizlenir.
- FR-8: Persistent header (welcome dışı) Home + Lang Change butonları içerir; tap target ≥60px.
- FR-9: Service worker app shell + JSON + images cache eder; JSON network-first 5sn timeout; tablet 24 saatte bir `registration.update()` tetikler.
- FR-10: Geçişler 300-400ms; `prefers-reduced-motion` saygı duyulur.
- FR-11: Ses çalmaz, hiçbir UI sound feedback yok.
- FR-12: Public GitHub repo + GitHub Pages, push ile deploy; ~1dk içinde tabletlerde güncelleme.
- FR-13: CSS'de literal renk/font/size yasak, sadece `var(--token)` referansı.
- FR-14: AR rakam sistemi Latin (`numberingSystem:"latn"`); sadece metin RTL akar.

## Non-Goals

- Backend / API / DB / login / rezervasyon / ödeme yok
- Lokasyon bazlı menü farkı yok (tek menü, tüm şubelerde aynı)
- Analytics yok, MDM yok, otomatik çeviri yok
- CMS arayüzü v1'de yok — sahip GitHub web UI kullanır (Decap CMS sonra eklenebilir)
- Çoklu para birimi yok (sadece EUR)
- Klavye/screen reader optimizasyonu yok (kiosk dokunmatik-only)
- Resepsiyona bildirim gönderme yok (sonra eklenebilir)
- Hizmet rezervasyon/sepet özelliği yok

## Technical Considerations

- Vanilla JS, framework yok; bundler yok; ES modules
- Görseller WebP, lazy load, repo içinde
- CSS custom properties ile tema; logical properties (margin-inline, padding-inline) RTL için
- Router hash-based; tek `index.html` SPA
- Service worker cache versioning: `SW_VERSION` const, her deploy'da bump → activate'de eski silinir
- Brand kit 1-2 gün içinde gelir → US-004 token'ları gelince override; v1 placeholder palet kabul
- Pilot TR+EN gerçek içerik; RU/AR/DE pilot başarısı sonrası pro çevirmenle doldurulur — JSON'larda `[RU]/[AR]/[DE]` prefix kolay grep edilebilir
- Locale formatting: `Intl.NumberFormat` ve `Intl.DateTimeFormat` standart, ekstra bağımlılık yok
- Süre birimi i18n dict'te, plural handling yok (sayı zaten `dakika`)
- Tap latency: `touch-action: manipulation` ile 300ms delay'i kaldır
- Performans hedefi: 60fps geçişler, ilk yük <2sn (3G simülasyonunda), bundle <100KB (görseller hariç)

## Success Metrics

- Tablette geçişler 60fps, jank yok
- İlk yük <2sn (3G simülasyon, soğuk cache)
- Offline test: wifi kapalı app açılır, son cache serve eder
- Sahibi 10dk içinde GitHub web UI'dan hizmet ekleyip değişikliği tablete yansıtabilir
- Pilot 2 hafta sonu: hangi dillerin seçildiği, misafirin takıldığı ekran raporu

## Open Questions

(yok — tüm kritik kararlar verildi)
