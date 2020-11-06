import countryCardTpl from "../templates/country-card.hbs";
import countryListTpl from '../templates/country-list.hbs';
import debounce from 'lodash.debounce';
import API from '../js/fetchCountries.js';
import getRefs from '../js/get-refs';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { info, error } from '@pnotify/core'

const refs = getRefs();
 
refs.inputEl.addEventListener(
   'input',
   debounce(onInputChange, 500)
);


function onInputChange() {
  let searchQuery = refs.inputEl.value;
   console.log(searchQuery)

  if (!searchQuery) {
    clearMarkup();
    return;
  }
  
  API.fetchCountries(searchQuery)
    .then(onFetchSucces)
    .catch(onFetchError)
}

function onFetchSucces(data) {
  if (data.length === 1) {
    renderCountryMarkup(data);

  }
  else if (data.length >= 2 && data.length <= 10) {
    enterFullName()
    renderCountryList(data);
    
  } else if (data.length > 10) {
    toMatchCountries(info);

  } else
    onFetchError(error);
}

function onFetchError() {
  error({
    text: "Please enter a more specific query!",
    text: 'No result',
    delay: 1500,
  });

  clearMarkup();
}

function toMatchCountries() {
  info({
    text: 'Too many matches found.Please enter a more specific query!',
    delay: 1500,
  })

  clearMarkup();
}

function enterFullName() {
   info({
    text: 'Please enter a more specific query!',
    delay: 1500,
   })
  clearMarkup()
}

function renderCountryMarkup(country) {
   const markup = countryCardTpl(country[0]);
   refs.countryContainer.innerHTML = markup;
};

function renderCountryList(listCountry) {
   const markup = countryListTpl(listCountry)
   refs.countryContainer.innerHTML = markup;
}

function clearMarkup() {
   refs.countryContainer.innerHTML = '';
}