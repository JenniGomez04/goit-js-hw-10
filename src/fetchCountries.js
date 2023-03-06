// exportar la función que trae array de paises

import Notiflix from "notiflix";

/*export async function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export default fetchCountries;*/

export function fetchCountries(name) {
  const url = `https://restcountries.com/v2/name/${name}`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
}







