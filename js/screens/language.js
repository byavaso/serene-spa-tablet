// Dil seçim ekranı: 5 dil kartı, tap → loadLanguage + categories.

import { navigate } from "../router.js";
import { loadLanguage } from "../i18n.js";

// Her dil için native isim (görsel doğrulamalı). Arabic harf sırası: العربية (ع ile başlar).
const LANGS = [
  { code: "tr", label: "Türkçe", subtitle: "Türkçe" },
  { code: "en", label: "English", subtitle: "English" },
  { code: "ru", label: "Русский", subtitle: "Russian" },
  { code: "ar", label: "العربية", subtitle: "Arabic", dir: "rtl" },
  { code: "de", label: "Deutsch", subtitle: "German" },
];

export async function render() {
  const root = document.createElement("section");
  root.className = "language";
  root.innerHTML = `
    <div class="language-inner">
      <h1 class="language-title">Welcome · Hoş geldiniz · Добро пожаловать · مرحبا · Willkommen</h1>
      <ul class="language-grid" role="list">
        ${LANGS.map(
          (l) => `
          <li>
            <button type="button" class="language-card" data-lang="${l.code}" ${l.dir ? `dir="${l.dir}"` : ""} lang="${l.code}">
              <span class="language-card-label">${l.label}</span>
              <span class="language-card-sub">${l.subtitle}</span>
            </button>
          </li>`
        ).join("")}
      </ul>
    </div>
  `;

  root.querySelectorAll(".language-card").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const code = btn.dataset.lang;
      try {
        await loadLanguage(code);
        navigate("categories");
      } catch (e) {
        console.error("[language] load failed", e);
      }
    });
  });

  return root;
}
