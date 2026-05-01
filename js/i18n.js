// Çoklu dil yükleyici + locale-aware formatters.

export const SUPPORTED = ["tr", "en", "ru", "ar", "de"];
export const FALLBACK = "tr";

export const state = {
  code: null,
  data: null,
  ui: null,
  meta: null,
};

let priceFormatter = null;
let numberFormatter = null;

export async function loadLanguage(code) {
  if (!SUPPORTED.includes(code)) {
    console.warn(`[i18n] unsupported lang ${code}, falling back to ${FALLBACK}`);
    code = FALLBACK;
  }
  try {
    const res = await fetch(`data/${code}.json`, { cache: "no-cache" });
    if (!res.ok) throw new Error(`http ${res.status}`);
    const data = await res.json();
    apply(data);
    return data;
  } catch (err) {
    console.error(`[i18n] failed to load ${code}.json`, err);
    document.dispatchEvent(new CustomEvent("i18n:error", { detail: { code, error: String(err) } }));
    if (code !== FALLBACK) return loadLanguage(FALLBACK);
    throw err;
  }
}

function apply(data) {
  state.code = data.meta.language;
  state.data = data;
  state.meta = data.meta;
  state.ui = data.ui;

  const html = document.documentElement;
  html.lang = data.meta.language;
  html.dir = data.meta.direction || "ltr";

  const numberOpts = data.meta.numberingSystem
    ? { numberingSystem: data.meta.numberingSystem }
    : {};

  priceFormatter = new Intl.NumberFormat(data.meta.locale, {
    style: "currency",
    currency: data.meta.currency || "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...numberOpts,
  });

  numberFormatter = new Intl.NumberFormat(data.meta.locale, numberOpts);

  document.dispatchEvent(new CustomEvent("i18n:change", { detail: { code: state.code } }));
}

export function t(key) {
  if (!state.ui) return key;
  return state.ui[key] ?? key;
}

export function formatPrice(value) {
  if (!priceFormatter) return String(value);
  return priceFormatter.format(value);
}

export function formatDuration(value) {
  const unit = state.meta?.durationUnit ?? "min";
  const num = numberFormatter ? numberFormatter.format(value) : String(value);
  return `${num} ${unit}`;
}

export function reset() {
  state.code = null;
  state.data = null;
  state.ui = null;
  state.meta = null;
  priceFormatter = null;
  numberFormatter = null;
  const html = document.documentElement;
  html.lang = "tr";
  html.dir = "ltr";
}

export function categoryById(id) {
  return state.data?.categories.find((c) => c.id === id) ?? null;
}

export function serviceById(serviceId) {
  if (!state.data) return null;
  for (const cat of state.data.categories) {
    const svc = cat.services.find((s) => s.id === serviceId);
    if (svc) return { service: svc, category: cat };
  }
  return null;
}
