export const fetchApi = async(value, per_page) => {
    return await fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${value}&page=1&per_page=${per_page}&key=53972263-c9e9823441f8f52f69cf141bb`)
        .then(res => res.json())
        .then(res => res.hits)
};

