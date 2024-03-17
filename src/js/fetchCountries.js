const BASE_URL = 'https://restcountries.com/v3.1/name/';

async function fetchCountries(name) {
  try {
    const response = await fetch(
      `${BASE_URL}${name}?fields=name.official,capital,population,flags.svg,languages`
    );
    if (!response.ok) {
      throw new Error('Country not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Country not found');
  }
}

export { fetchCountries };
