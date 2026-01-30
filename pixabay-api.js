const API_KEY = "53972263-c9e9823441f8f52f69cf141bb";
const BASE_URL = "https://pixabay.com/api/";

export async function fetchApi(query, perPage) {
  try {
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
      query
    )}&image_type=photo&orientation=horizontal&page=1&per_page=${perPage}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("API error");
    }

    const data = await response.json();
    return data.hits;
  } catch (error) {
    console.error(error);
    return [];
  }
}
