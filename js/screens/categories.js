// Kategori listesi ekranı: card grid.

import { navigate } from "../router.js";
import { state, t } from "../i18n.js";

export async function render() {
  if (!state.data) {
    navigate("language");
    return document.createElement("div");
  }

  const root = document.createElement("section");
  root.className = "categories";
  root.innerHTML = `
    <div class="categories-inner">
      <h1 class="screen-title">${t("categoriesTitle")}</h1>
      <ul class="card-grid" role="list">
        ${state.data.categories
          .map(
            (cat) => `
          <li>
            <button type="button" class="cat-card" data-id="${cat.id}" aria-label="${cat.name}">
              <div class="cat-card-media">
                <img src="${cat.image}" alt="" loading="lazy" decoding="async" onerror="this.parentElement.classList.add('missing-image'); this.style.display='none';">
              </div>
              <div class="cat-card-body">
                <h2 class="cat-card-name">${cat.name}</h2>
                <p class="cat-card-desc">${cat.description}</p>
              </div>
            </button>
          </li>`
          )
          .join("")}
      </ul>
    </div>
  `;

  root.querySelectorAll(".cat-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      navigate("services", { categoryId: btn.dataset.id });
    });
  });

  return root;
}
