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

function searchCountries() {
  let name = inputCountries.value.trim();
  if (name === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(name)
  .then(countries => {
    console.log(countries)
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    if(countries.length > 10){
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }

    if(countries.length > 1 && countries.length < 10 ){
      countries.forEach(country => {
            let li = document.createElement('li');
            li.innerHTML = `
              <img src="${country.flag}" alt="${country.name} flag" width = 30px>
              <span>${country.name}</span>
            `;
            countryList.appendChild(li);
          });
      }
        else{
          countryList.remove()
          CountryDetails(countries[0])
        }
        if (countries.length === 1) {
          countryInfo.innerHTML = countryInfo(countries);
        }
    })
    .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        return error;
  });
}

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
  }).join('');
}

inputCountries.addEventListener('input', debounce(searchCountries, DEBOUNCE_DELAY));
