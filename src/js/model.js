import { async } from 'regenerator-runtime';
import {
  getCorrectCountryName,
  getEncodedCounryName,
  getJSON,
  getRandomCountry,
} from './helpers.js';

export const state = {
  country: {},
  attempts: 0,
};

const createCountryObject = function (data) {
  const randomCountry = getRandomCountry(data);
  const correctCountryName = getCorrectCountryName(data[randomCountry]);
  const encodedCountryName = getEncodedCounryName(correctCountryName);
  
  return {
    countryName: correctCountryName,
    encodedName: encodedCountryName,
    flag: data[randomCountry].flag,
    capital: data[randomCountry].capital,
    region: data[randomCountry].region,
  };
};

export const loadCountry = async function (region) {
  try {
    const data = await getJSON(`https://restcountries.eu/rest/v2/${region}`);

    state.country = createCountryObject(data);
  } catch (err) {
    throw err;
  }
};
