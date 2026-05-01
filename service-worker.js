// Service worker — offline cache + günlük update check.
// SW_VERSION her deploy'da bump edilir; eski cache activate'de silinir.

const SW_VERSION = "v1.0.2";
const CACHE_SHELL = `spa-menu-shell-${SW_VERSION}`;
const CACHE_DATA = `spa-menu-data-${SW_VERSION}`;
const CACHE_IMG = `spa-menu-img-${SW_VERSION}`;
const NETWORK_TIMEOUT_MS = 5000;

const SHELL_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/tokens.css",
  "./css/style.css",
  "./css/screens.css",
  "./js/app.js",
  "./js/router.js",
  "./js/i18n.js",
  "./js/idle.js",
  "./js/screens/welcome.js",
  "./js/screens/language.js",
  "./js/screens/categories.js",
  "./js/screens/services.js",
  "./js/screens/detail.js",
  "./fonts/cormorant-garamond-300.woff2",
  "./fonts/cormorant-garamond-400.woff2",
  "./fonts/cormorant-garamond-500.woff2",
  "./fonts/inter-400.woff2",
  "./fonts/inter-500.woff2",
  "./fonts/noto-naskh-arabic-400.woff2",
  "./fonts/noto-naskh-arabic-500.woff2",
];

const DATA_ASSETS = [
  "./data/tr.json",
  "./data/en.json",
  "./data/ru.json",
  "./data/ar.json",
  "./data/de.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const shell = await caches.open(CACHE_SHELL);
      await shell.addAll(SHELL_ASSETS);
      const data = await caches.open(CACHE_DATA);
      // JSON precache best-effort — bir tanesi düşse bile install başarısız olmasın
      await Promise.allSettled(
        DATA_ASSETS.map((url) =>
          fetch(url, { cache: "no-cache" }).then((res) => {
            if (res && res.ok) return data.put(url, res);
          })
        )
      );
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      const valid = new Set([CACHE_SHELL, CACHE_DATA, CACHE_IMG]);
      await Promise.all(keys.filter((k) => !valid.has(k)).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

function isJsonReq(url) {
  return url.pathname.startsWith("/data/") && url.pathname.endsWith(".json");
}

function isImageReq(url) {
  return /\.(webp|png|jpg|jpeg|svg|avif)$/i.test(url.pathname);
}

async function networkFirst(request, cacheName, timeoutMs) {
  const cache = await caches.open(cacheName);
  return new Promise((resolve) => {
    let settled = false;
    const t = setTimeout(async () => {
      if (settled) return;
      const cached = await cache.match(request);
      if (cached) {
        settled = true;
        resolve(cached);
      }
    }, timeoutMs);

    fetch(request)
      .then(async (res) => {
        clearTimeout(t);
        if (res && res.ok) {
          cache.put(request, res.clone());
        }
        if (!settled) {
          settled = true;
          resolve(res);
        }
      })
      .catch(async () => {
        clearTimeout(t);
        if (settled) return;
        const cached = await cache.match(request);
        settled = true;
        resolve(cached || new Response("", { status: 504 }));
      });
  });
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  if (hit) return hit;
  try {
    const res = await fetch(request);
    if (res && res.ok) cache.put(request, res.clone());
    return res;
  } catch {
    return new Response("", { status: 504 });
  }
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (isJsonReq(url)) {
    event.respondWith(networkFirst(req, CACHE_DATA, NETWORK_TIMEOUT_MS));
    return;
  }
  if (isImageReq(url)) {
    event.respondWith(cacheFirst(req, CACHE_IMG));
    return;
  }
  event.respondWith(cacheFirst(req, CACHE_SHELL));
});
