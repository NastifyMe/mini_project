
const searchForm = document.getElementById('search-form')
const gallery = document.querySelector('.gallery')
const more = document.querySelector('.more')

const API = '53866451-00fcffb608ed44a02a942cc2f'
const PER_PAGE = 12
let page = 1
let searchText = ''


function createGallery(images) {
    const newPhoto =  images
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
      ).join('');
      gallery.insertAdjacentHTML('beforeend', newPhoto)
  }
  

async function fetchImages() {
    try {
        const respone = await fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchText}&page=${page}&per_page=${PER_PAGE}&key=${API}`)
        const data = await respone.json()
        return data.hits
    }
    catch(error) {
        console.log('Fetch error')
        return []
    }
}



searchForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    searchText = event.target.elements.query.value.trim()

    if (searchText === ''){
        return
    }
    

    page = 1
    gallery.innerHTML = ''
    more.hidden = true

    await loadImages()
})

more.addEventListener('click', async () => {
    page += 1;
    await loadImages(true);
  });
  
async function loadImages(isLoadMore = false) {
    try {
        const images = await fetchImages(searchText, page)

        if (images.length === 0){
            more.hidden = true
        }


        more.hidden = false

    }
    catch (error) {
        console.log('Error')
    }

}