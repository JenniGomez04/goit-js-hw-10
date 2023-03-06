import './css/styles.css';
import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

let inputCountries = document.querySelector('#search-box');
let countryList = document.querySelector('.country-list');
let countryInfo = document.querySelector('.country-info');

//console.log(inputCountries, countryList, countryInfo)

const DEBOUNCE_DELAY = 300;

inputCountries.addEventListener('input', (event) => {
  event.preventDefault();
  const name = inputCountries.value.trim();
  if (name.length < 2) {
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    countryList.innerHTML = '';
    return;
  }
  fetchCountries(name).then(countries => {
    countryList.innerHTML = '';
    countries.slice(0, 10).forEach(country => {
      let li = document.createElement('li');
      li.innerHTML = `
        <img src="${country.flag}" alt="${country.name} flag" width = 30px>
        <span>${country.name}</span>
      `;
      li.addEventListener('click', () => {
        CountryDetails(country);
      });
      countryList.appendChild(li);
    });
  }).catch(error => {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  });
});

function CountryDetails(country) {
  fetchCountries(country.name).then(countries => {
    const details = countries[0];
    inputCountries.value = details.name;
    countryList.value = '';
    countryInfo.innerHTML = `
     <h2>${details.name}</h2>
      <img src="${details.flag}" alt="${details.name} flag" width = 30px>
      <p class = "capital"><b>Capital:</b> ${details.capital}</p>
      <p class = "population"><b>Capital:</b> ${details.population.toLocaleString()}</p>
      <p class = "Languages"><b>Languages:</b> ${details.languages.map(lang => lang.name).join(', ')}</p>
    `;
  }).catch(error => {
    Notiflix.Notify.failure(error.message);
  });
}


















/*
inputCountries.addEventListener('input', event => {
  event.preventDefault();
  const countries = inputCountries.value.trim();
  fetchCountries(countries)
    .then(data => {
      countryList.innerHTML = '';
      data.forEach(country => {
        let li = document.createElement('li');
        let flag = country.flags.svg;
        let name = country.name.official;
        li.innerHTML = `<img src="${flag}" alt="${name}" width = 20px> ${name}`;
        countryList.appendChild(li);
      });
    })
    .catch(error => console.error(error));
});*/






/*
const imputCountr = (e) =>{let countryName = e.target.value.trim();
  let api_Url = `https://restcountries.com/v3.1/name/${countryName}`;
  //console.log(countryName)
  fetch(`${api_Url}`)
  .then((response) => response.json())  // me retorna lo que hay en response.json
  .then((data) => {
    data.forEach(element => {
    console.log(element)
  });

  // AGREGA EN EL DIV LA INFO CORRESPONDIENTE
  countryInfo.innerHTML = `
  <img src = "${data[element].flags.svg}"
  class = "icons.svg" width = 30px>
  <h1 class="country-name">${data[element].name.official}</h1>
  <p class = "capital"><b>Capital:</b> ${data[element].capital[0]}</p>
  <p class = "poputation"><b>Population:</b> ${data[element].population}</p>
  <p class = "languages"><b>Language:</b> ${Object.values(data[element].languages).toString().split(",").join(", ")}</p>
  `
})//console.log(data)) // me imprime lo que hay en response.json
.catch(error => console.error(error));
}

const debouncechange = debounce(imputCountr,300)
inputCountries.addEventListener('input',debouncechange)*/
/*
form.addEventListener('submit', event => {
  event.preventDefault();
  const name = input.value;
  fetchCountries(name)
    .then(data => {
      countryList.innerHTML = '';
      data.forEach(country => {
        const li = document.createElement('li');
        const flag = country.flags.svg;
        const name = country.name.common;
        li.innerHTML = `<img src="${flag}" alt="${name}">${name}`;
        countryList.appendChild(li);
      });
    })
    .catch(error => console.error(error));
});*/