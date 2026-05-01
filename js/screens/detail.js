// Hizmet detay ekranı.

import { navigate } from "../router.js";
import { state, t, formatPrice, formatDuration, serviceById } from "../i18n.js";

export async function render(params) {
  if (!state.data) {
    navigate("language");
    return document.createElement("div");
  }
  const found = serviceById(params.serviceId);
  if (!found) {
    navigate("categories");
    return document.createElement("div");
  }
  const { service: svc, category: cat } = found;

  const root = document.createElement("section");
  root.className = "detail";
  root.innerHTML = `
    <div class="detail-inner">
      <button type="button" class="detail-back" data-action="back" aria-label="${t("back")}">
        <span class="detail-back-icon" aria-hidden="true">←</span>
        <span>${t("back")}</span>
      </button>
      <article class="detail-card">
        <div class="detail-hero">
          <img src="${svc.image}" alt="${svc.name}" loading="lazy" decoding="async" onerror="this.parentElement.classList.add('missing-image'); this.style.display='none';">
        </div>
        <div class="detail-body">
          <p class="screen-eyebrow">${cat.name}</p>
          <h1 class="detail-name">${svc.name}</h1>
          <p class="detail-long">${svc.longDescription}</p>

          <div class="detail-meta">
            <div class="detail-meta-item">
              <span class="svc-meta-label">${t("duration")}</span>
              <span class="detail-meta-value">${formatDuration(svc.duration)}</span>
            </div>
            <div class="detail-meta-item detail-meta-price">
              <span class="svc-meta-label">${t("price")}</span>
              <span class="detail-meta-value">${formatPrice(svc.price)}</span>
            </div>
          </div>

          <section class="detail-benefits">
            <h2 class="detail-benefits-title">${t("benefits")}</h2>
            <ul class="benefits-list">
              ${svc.benefits.map((b) => `<li>${b}</li>`).join("")}
            </ul>
          </section>
        </div>
      </article>
    </div>
  `;

  root.querySelector('[data-action="back"]').addEventListener("click", () => {
    navigate("services", { categoryId: cat.id });
  });

  return root;
}
