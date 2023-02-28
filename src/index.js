import './css/styles.css';
import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import debounce from 'lodash.debounce';
//import { fetchCountries } from './fetchCountries';

let inputCountries = document.querySelector('#search-box');
let countryList = document.querySelector('.country-list');
let countryInfo = document.querySelector('.country-info');

//console.log(inputCountries, countryList, countryInfo)

const DEBOUNCE_DELAY = 300;

inputCountries.addEventListener('input', ({target}) => {
  let countryName = target.value.trim();
  let api_Url = `https://restcountries.com/v3.1/name/${countryName}`;
  //console.log(countryName)
  fetch(`${api_Url}`)
  .then((response) => response.json())  // me retorna lo que hay en response.json
  .then((data) => {
  console.log(data[0].name.official);
  console.log(data[0].capital[0]);
  console.log(data[0].population);
  console.log(Object.values(data[0].languages).toString().split(",").join(", "));//devuelve un array se separa por comas

  // AGREGA EN EL DIV LA INFO CORRESPONDIENTE
  countryInfo.innerHTML = `
  <img src = "${data[0].flags.svg}"
  class = "icons.svg" width = 30px>
  <h1 class="country-name">${data[0].name.official}</h1>
  <p class = "capital"><b>Capital:</b> ${data[0].capital[0]}</p>
  <p class = "poputation"><b>Population:</b> ${data[0].population}</p>
  <p class = "languages"><b>Language:</b> ${Object.values(data[0].languages).toString().split(",").join(", ")}</p>
  `
})//console.log(data)) // me imprime lo que hay en response.json
.catch(error => console.error(error));
});






//-----------------------------------------------------------------------------------

/*
//evento de busqueda
inputCountries.addEventListener('input', ({target}) => {
  searchValue = target.value.trim();
  console.log(searchValue);

  if(searchValue.length){
    let autocompleValue = autoComplete(searchValue)
      countryList.innerHTML = `${autocompleValue.map((value) => {
        return (`<li>${value}</li>`)
        }).join('')}
    `}
})
//---------------------------------------------------------------------------------------------------------

/*
//FUNCION CON ARRAY DE NOMBRES
let countries = [];
function fetchCountries(){
fetch("https://restcountries.com/v3.1/all")
.then((response) => response.json())  // me retorna lo que hay en response.json
.then((data) => {
  countries = data.map(country => country.name.official);
  countries.sort() // ordenado de A-Z
  console.log(countries)
});
}

fetchCountries();

inputCountries.addEventListener('keyup', (event) =>{
  //recorre el array de paises
  for(let country of countries){
 // compara la entrada con cada elemento
 // metodo startsWith indica la cadena con la que comienza el texto
 // metodo substr retorna las partes de la cadena del inicio al final por letra
    if(country.toLowerCase().startsWith(inputCountries.value.toLowerCase()) && inputCountries.value !== ""){
// crear un li, y agg clase al li
 let listLi = document.createElement("li");
    listLi.classList.add("listItemCountry");
      let word = "<b>" + country.substr(0, inputCountries.value.length) + "</b>";
        word += country.substr(inputCountries.value.length);
        console.log(word)
  //ver valor de array
    listLi.innerHTML = word;
    countryList.appendChild(listLi)
    }
  }
  countryInfo.innerHTML = `
  <img src = "${data[0].flags.svg}"
  class = "icons.svg" width = 30px>
  <h1 class="country-name">${data[0].name.official}</h1>
  <p class = "capital"><b>Capital:</b> ${data[0].capital[0]}</p>
  <p class = "poputation"><b>Population:</b> ${data[0].population}</p>
  <p class = "languages"><b>Language:</b> ${Object.values(data[0].languages).toString().split(",").join(", ")}</p>
  `
})

function inputCountriesSearch(value){
  inputCountries.value;
}
inputCountriesSearch() //LLAMA LA FUNCION

// LIMPIA EL INPUT
function removeItem(){
  countryList.forEach((item) => {
    item.remove();
  });
}
removeItem();
*/