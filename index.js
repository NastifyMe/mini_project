import { fetchApi } from "./pixabay-api.js";

const refs = {
  list: document.querySelector(".image-list"),
  input: document.querySelector("#search-input"),
  loadBtn: document.querySelector("#load-more"),
};

let query = "";
let perPage = Number(localStorage.getItem("per_page")) || 12;

localStorage.setItem("per_page", perPage);

function renderImages(images) {
  const markup = images
    .map(
      img => `
      <li class="image-item">
        <article class="image-card">
          <img src="${img.largeImageURL}" alt="" loading="lazy"/>
          <ul class="image-info">
            <li>❤ ${img.likes}</li>
            <li>👁 ${img.views}</li>
            <li>💬 ${img.comments}</li>
            <li>⬇ ${img.downloads}</li>
          </ul>
        </article>
      </li>`
    )
    .join("");

  refs.list.insertAdjacentHTML("beforeend", markup);
}

function loadImages(reset = false) {
  if (reset) refs.list.innerHTML = "";

  return fetchApi(query, perPage).then(renderImages);
}

const handleSearch = e => {
  query = e.target.value.trim();

  if (!query) {
    refs.list.innerHTML = "";
    return;
  }

  perPage = 12;
  localStorage.setItem("per_page", perPage);
  loadImages(true);
};

refs.input.addEventListener("input", _.debounce(handleSearch, 500));

refs.loadBtn.addEventListener("click", () => {
  perPage += 12;
  localStorage.setItem("per_page", perPage);

  loadImages().then(() => {
    const lastItem = refs.list.lastElementChild;
    lastItem?.scrollIntoView({ behavior: "smooth" });
  });
});
