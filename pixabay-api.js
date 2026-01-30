export const fetchApi = async (value, per_page) => {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${encodeURIComponent(
      value
    )}&page=1&per_page=${per_page}&key=53972263-c9e9823441f8f52f69cf141bb`;
  
    const response = await fetch(url);
    const data = await response.json();
    return data.hits;
  };
  