// exportar la función que trae array de paises

import Notiflix from "notiflix";


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






