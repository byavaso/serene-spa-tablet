// 60sn idle → welcome'a dön. Welcome ekranında pasif.

import { navigate, getCurrent } from "./router.js";
import { reset as resetI18n } from "./i18n.js";

const TIMEOUT_MS = 60_000;
let timer = null;

function clear() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}

function arm() {
  clear();
  const cur = getCurrent();
  if (cur?.name === "welcome") return; // welcome zaten dil-agnostik
  timer = setTimeout(() => {
    resetI18n();
    navigate("welcome");
  }, TIMEOUT_MS);
}

function bumpListener() {
  arm();
}

export function startIdle() {
  document.addEventListener("pointerdown", bumpListener, { passive: true });
  document.addEventListener("touchstart", bumpListener, { passive: true });
  document.addEventListener("route:change", arm);
  arm();
}

export function _testForceTimeout() {
  // sadece manual test/debug için
  clear();
  resetI18n();
  navigate("welcome");
}
