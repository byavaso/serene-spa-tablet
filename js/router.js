// Hash-based SPA router. Tek index.html üzerinde ekran takasları.

const routes = new Map();
const history = [];
let current = null;

const screen = () => document.getElementById("screen");

function parseHash() {
  const raw = window.location.hash.replace(/^#\/?/, "");
  if (!raw) return { name: "welcome", params: {} };
  const [name, query = ""] = raw.split("?");
  const params = Object.fromEntries(new URLSearchParams(query));
  return { name, params };
}

function buildHash(name, params = {}) {
  const qs = new URLSearchParams(params).toString();
  return qs ? `#${name}?${qs}` : `#${name}`;
}

async function render(name, params) {
  const route = routes.get(name);
  if (!route) {
    console.error(`[router] route not found: ${name}`);
    return;
  }
  const root = screen();
  // outgoing fade — animasyon stilleri US-016'da gelecek; şimdilik sınıf toggle.
  root.classList.add("screen-leaving");
  const html = await route(params);
  root.innerHTML = "";
  root.classList.remove("screen-leaving");
  root.classList.add("screen-entering");
  if (html instanceof Node) {
    root.appendChild(html);
  } else if (typeof html === "string") {
    root.innerHTML = html;
  }
  // bir frame sonra entering kaldır
  requestAnimationFrame(() => {
    requestAnimationFrame(() => root.classList.remove("screen-entering"));
  });
  current = { name, params };
  document.dispatchEvent(new CustomEvent("route:change", { detail: current }));
}

function onHashChange() {
  const { name, params } = parseHash();
  render(name, params);
}

export function register(name, renderFn) {
  routes.set(name, renderFn);
}

export function navigate(name, params = {}) {
  history.push(current);
  const target = buildHash(name, params);
  if (window.location.hash === target) {
    onHashChange();
  } else {
    window.location.hash = target;
  }
}

export function back() {
  const prev = history.pop();
  if (prev) {
    window.location.hash = buildHash(prev.name, prev.params);
  } else {
    window.history.back();
  }
}

export function getCurrent() {
  return current;
}

export function start() {
  window.addEventListener("hashchange", onHashChange);
  onHashChange();
}
