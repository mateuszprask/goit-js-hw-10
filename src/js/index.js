import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchBox = document.getElementById('search-box');
const countryList = document.getElementById('country-list');
const countryInfo = document.getElementById('country-info');

searchBox.addEventListener('input', debounce(onSearch, 300));

async function onSearch(event) {
  const searchTerm = event.target.value.trim();

  if (searchTerm === '') {
    clearResults();
    return;
  }

  try {
    const countries = await fetchCountries(searchTerm);
    displayResults(countries);
  } catch (error) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
    clearResults();
  }
}

function displayResults(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    clearResults();
  } else if (countries.length >= 2 && countries.length <= 10) {
    const countriesHTML = countries
      .map(country => {
        return `<div><img src="${country.flags.svg}" alt="${country.name.official}" /> ${country.name.official}</div>`;
      })
      .join('');
    countryList.innerHTML = countriesHTML;
    countryInfo.innerHTML = '';
  } else if (countries.length === 1) {
    const country = countries[0];
    const languages = country.languages
      .map(language => language.name)
      .join(', ');
    const countryHTML = `
      <div>
        <img src="${country.flags.svg}" alt="${country.name.official}" />
        <h2>${country.name.official}</h2>
        <p><strong>Capital:</strong> ${country.capital}</p>
        <p><strong>Population:</strong> ${country.population}</p>
        <p><strong>Languages:</strong> ${languages}</p>
      </div>
    `;
    countryInfo.innerHTML = countryHTML;
    countryList.innerHTML = '';
  }
}

function clearResults() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
