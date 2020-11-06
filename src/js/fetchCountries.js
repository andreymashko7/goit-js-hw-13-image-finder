const BASE_URL = 'https://restcountries.eu/rest/v2/name'

function fetchCountries(searchQuery) {
   return fetch(`${BASE_URL}/${searchQuery}`).then((r) => r.json());
 }

export default { fetchCountries };
