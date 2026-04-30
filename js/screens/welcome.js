// Welcome ekranı: 5 dilde rotate eden tek satır + tap to start.

import { navigate } from "../router.js";

const ROTATE_LANGS = ["tr", "en", "ru", "ar", "de"];
const DWELL_MS = 3000;
const FADE_MS = 600;

const FALLBACK_TEXTS = {
  tr: "Dokunarak başlayın",
  en: "Touch to start",
  ru: "Прикоснитесь, чтобы начать",
  ar: "اضغط للبدء",
  de: "Berühren zum Starten",
};

let rotateTimer = null;

export async function render() {
  cleanup();

  // welcomeRotate verisini TR JSON'dan al — yüklü değilse fallback kullan
  let texts = FALLBACK_TEXTS;
  try {
    const res = await fetch("data/tr.json", { cache: "force-cache" });
    if (res.ok) {
      const tr = await res.json();
      if (tr?.ui?.welcomeRotate) texts = tr.ui.welcomeRotate;
    }
  } catch { /* fallback */ }

  const root = document.createElement("section");
  root.className = "welcome";
  root.innerHTML = `
    <div class="welcome-bg" aria-hidden="true"></div>
    <div class="welcome-overlay" aria-hidden="true"></div>
    <button type="button" class="welcome-tap" aria-label="${texts.en}">
      <span class="welcome-rotator" data-rotator></span>
      <span class="welcome-hint" aria-hidden="true"></span>
    </button>
  `;

  const rotator = root.querySelector("[data-rotator]");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced) {
    setText(rotator, "tr", texts.tr);
  } else {
    let i = 0;
    const showNext = () => {
      const code = ROTATE_LANGS[i];
      const txt = texts[code] ?? "";
      // fade out -> swap -> fade in
      rotator.classList.add("is-fading");
      setTimeout(() => {
        setText(rotator, code, txt);
        rotator.classList.remove("is-fading");
      }, FADE_MS / 2);
      i = (i + 1) % ROTATE_LANGS.length;
    };
    showNext();
    rotateTimer = setInterval(showNext, DWELL_MS);
  }

  root.querySelector(".welcome-tap").addEventListener("click", () => {
    cleanup();
    navigate("language");
  });

  return root;
}

function setText(el, code, text) {
  el.textContent = text;
  el.lang = code;
  el.dir = code === "ar" ? "rtl" : "ltr";
}

function cleanup() {
  if (rotateTimer) {
    clearInterval(rotateTimer);
    rotateTimer = null;
  }
}
