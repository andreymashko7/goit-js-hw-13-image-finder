const API_KEY = '19012296-41da2131aa4097137b6521ff0';
const BASE_URL =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal';

export default class GaleryApiService {
  constructor() {
    this.serchQuery = '';
    this.page = 1;
  }

  async fetchFotos() {
    const url = `${BASE_URL}&q=${this.serchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
    const response = await fetch(url);
    const newImages = await response.json();

    this.incrementPage();
    return newImages.hits;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.serchQuery;
  }

  set query(newquery) {
    this.serchQuery = newquery;
  }
}

// ---------------------------- Promise ---------------------------------------------------------

// fetchFotos() {
//   const url = `${BASE_URL}&q=${this.serchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

//   return fetch(url)
//     .then(response => response.json())
//     .then(({ hits }) => {
//       this.incrementPage();
//       return hits;
//     });
// }
