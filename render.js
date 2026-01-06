export function createGallery(images) {
  return images
    .map(
      (image) => `
      <li>
        <div class="photo-card">
          <img src="${image.webformatURL}" alt="${image.tags}" />
          <div class="stats">
            <p class="stats-item">
              <i class="material-icons">thumb_up</i>${image.likes}
            </p>
            <p class="stats-item">
              <i class="material-icons">visibility</i>${image.views}
            </p>
            <p class="stats-item">
              <i class="material-icons">comment</i>${image.comments}
            </p>
            <p class="stats-item">
              <i class="material-icons">cloud_download</i>${image.downloads}
            </p>
          </div>
        </div>
      </li>
    `
    )
    .join('');
}
