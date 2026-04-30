# Tablet Kiosk Kurulum Rehberi

Yeni tablete sıfırdan kurulum için adımlar. Hedef: Fully Kiosk Browser ile tam ekran, çıkış kilitli, otomatik açılış.

---

## 1. Tablet hazırlığı

- Android 9+ tablet (önerilen: Samsung Galaxy Tab A 10–11", Huawei MatePad)
- Wi-Fi'ye bağla, sistem güncellemelerini yap
- Tarayıcıda Pages URL'i tek seferlik aç → tabletin çalıştığını doğrula
- Antimikrobiyal ekran koruyucu yapıştır (hijyen için kritik)
- Sabit stand: vidalı, kabloyu gizleyen tipte

## 2. Fully Kiosk Browser kurulum

Google Play → **Fully Kiosk Browser & App Lockdown** → kur.

> Lisans isteğe bağlı (~7$ tek seferlik) — 'Plus' özellikleri (gelişmiş kilit, bildirim sustur) için. Ücretsiz sürüm de yeterli.

## 3. Temel ayarlar

`Settings` (üç çizgi menü) → aşağıdaki bölümleri ayarla:

### Web Content Settings
- **Start URL:** `https://<github-pages-url>/`
- **Auto Reload on Idle:** off (idle reset uygulamada hallediliyor)
- **JavaScript:** enabled
- **Service Workers:** enabled
- **Allow Application Cache:** enabled

### Web Browsing Settings
- **Disable Pull-To-Refresh:** on
- **Disable Long Tap:** on
- **Disable Context Menu:** on
- **Disable Selection:** on
- **Disable Status Bar:** on

### Universal Launcher / Kiosk Mode
- **Kiosk Mode:** on
- **Kiosk Exit Gesture:** 4-finger long tap (default)
- **Kiosk PIN:** belirle (örn 1234) — sadece teknisyen bilmeli
- **Disable Other Apps:** on

### Device Management
- **Keep Screen On:** on
- **Screen Brightness:** %80 (uygun ışığa göre ayarla)
- **Auto-Reload Tab Every:** disabled (idle uygulamada)

### Advanced Web Settings
- **Disable Hardware Keys:** on (geri/home tuşları)

### Crash Recovery
- **Restart on Crash:** on
- **Reload on URL Mismatch:** on

## 4. Otomatik açılış

`Device Management` → **Start Fully on Device Boot:** on
→ Tablet açıldığında otomatik kiosk başlar.

## 5. Doğrulama

- [ ] Tableti yeniden başlat → kiosk otomatik açılıyor
- [ ] Welcome ekranı görünüyor (5 dilde rotate)
- [ ] Bir dile dokun → kategoriler geliyor
- [ ] Bir kategoriye dokun → hizmetler geliyor
- [ ] Bir hizmete dokun → detay geliyor
- [ ] Geri / Ana Sayfa / Dil Değiştir butonları çalışıyor
- [ ] Wi-Fi'yi kapat → uygulama hala açılıyor (offline cache)
- [ ] 60sn dokunma → welcome'a dönüyor
- [ ] 4-parmak long-tap → PIN sorar (teknisyen erişimi)

## 6. Bakım

- **Menü güncellemesi:** sahip GitHub web UI'dan JSON düzenler → ~1dk içinde tablete iner
- **Worst case:** tablet 24 saatte bir otomatik SW update yapar — yeni deploy en geç 24 saat içinde tüm tabletlere ulaşır
- **Tablet ekranı sıkışırsa:** PIN ile kioskan çık → tabletteki Fully Kiosk → `Restart App`
- **Cache temizleme gerekirse:** Fully Kiosk → `Settings` → `Clear Cache` (nadiren gerekli)

## 7. Sorun giderme

| Sorun | Çözüm |
|-------|-------|
| Welcome'a dönmüyor (idle) | Browser console'da JS error var mı? Wi-Fi açık mı? |
| Beyaz ekran | Pages URL'i tarayıcıdan aç, çalışıyor mu? |
| Eski içerik gösteriyor | SW cache eski. Tableti yeniden başlat veya cache clear |
| Dokunma yavaş | Tablet RAM dolu olabilir. Yeniden başlat |
| Görseller yüklenmiyor | İlk açılışta Wi-Fi gerekli (precache); sonra offline çalışır |

---

Yeni lokasyon kurulumu: bu dökümanı baştan takip et. Tek bir tablet ~30dk.
