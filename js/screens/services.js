// Hizmet listesi ekranı (kategori-filtreli).

import { navigate } from "../router.js";
import { state, t, formatPrice, formatDuration, categoryById } from "../i18n.js";

export async function render(params) {
  if (!state.data) {
    navigate("language");
    return document.createElement("div");
  }
  const cat = categoryById(params.categoryId);
  if (!cat) {
    navigate("categories");
    return document.createElement("div");
  }

  const root = document.createElement("section");
  root.className = "services";
  root.innerHTML = `
    <div class="services-inner">
      <header class="screen-header">
        <p class="screen-eyebrow">${t("servicesTitle")}</p>
        <h1 class="screen-title">${cat.name}</h1>
        <p class="screen-sub">${cat.description}</p>
      </header>
      <ul class="service-list" role="list">
        ${cat.services
          .map(
            (svc) => `
          <li>
            <button type="button" class="svc-card" data-id="${svc.id}" aria-label="${svc.name}, ${formatDuration(svc.duration)}, ${formatPrice(svc.price)}">
              <div class="svc-card-media">
                <img src="${svc.image}" alt="" loading="lazy" decoding="async" onerror="this.parentElement.classList.add('missing-image'); this.style.display='none';">
              </div>
              <div class="svc-card-body">
                <h2 class="svc-card-name">${svc.name}</h2>
                <p class="svc-card-desc">${svc.shortDescription}</p>
                <div class="svc-card-meta">
                  <span class="svc-meta-item">
                    <span class="svc-meta-label">${t("duration")}</span>
                    <span class="svc-meta-value">${formatDuration(svc.duration)}</span>
                  </span>
                  <span class="svc-meta-item svc-meta-price">
                    <span class="svc-meta-value">${formatPrice(svc.price)}</span>
                  </span>
                </div>
              </div>
            </button>
          </li>`
          )
          .join("")}
      </ul>
    </div>
  `;

  root.querySelectorAll(".svc-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      navigate("detail", { serviceId: btn.dataset.id });
    });
  });

  return root;
}
