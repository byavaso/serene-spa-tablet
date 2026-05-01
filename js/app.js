// Ana giriş noktası — router + ekran kayıtları + boot.

import { register, start, navigate } from "./router.js";
import { t, state } from "./i18n.js";
import { startIdle } from "./idle.js";
import { render as renderWelcome } from "./screens/welcome.js";
import { render as renderLanguage } from "./screens/language.js";
import { render as renderCategories } from "./screens/categories.js";
import { render as renderServices } from "./screens/services.js";
import { render as renderDetail } from "./screens/detail.js";

const topbar = document.getElementById("topbar");
const btnHome = document.getElementById("btn-home");
const btnLang = document.getElementById("btn-lang");

register("welcome", renderWelcome);
register("language", renderLanguage);
register("categories", renderCategories);
register("services", renderServices);
register("detail", renderDetail);

document.addEventListener("route:change", (e) => {
  const name = e.detail?.name;
  // welcome ekranında header gizli, diğerlerinde görünür
  if (name === "welcome") {
    topbar.hidden = true;
  } else {
    topbar.hidden = false;
  }
});

btnHome.addEventListener("click", () => navigate("categories"));
btnLang.addEventListener("click", () => navigate("language"));

document.addEventListener("i18n:change", () => {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = t(key);
    if (value && value !== key) el.textContent = value;
  });
  document.title = state.ui?.title ?? "Serene Spa Wellness";
});

// Toast helper
const toastEl = document.getElementById("toast");
let toastTimer = null;
export function showToast(message, { duration = 4000 } = {}) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.hidden = false;
  // force reflow for transition
  void toastEl.offsetWidth;
  toastEl.classList.add("is-visible");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove("is-visible");
    setTimeout(() => { toastEl.hidden = true; }, 300);
  }, duration);
}
window.__showToast = showToast;

start();
startIdle();

// Service worker register + günlük update check (kiosk modda manuel reload yok)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const reg = await navigator.serviceWorker.register("service-worker.js");
      // 24 saatte bir update kontrolü
      setInterval(() => reg.update().catch(() => {}), 24 * 60 * 60 * 1000);
    } catch (e) {
      console.warn("[sw] register failed", e);
    }
  });
}

console.info("[app] boot");
