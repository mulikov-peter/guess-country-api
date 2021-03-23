import { domElement } from './domElements.js';
import { keyboardController } from './keyboardController.js';
import { uiController } from './uiController.js';

class State {
  constructor() {
    this.countryName;
    this.countryCapital;
    this.countryFlag;
    this.encodedCountryName;
    this.atempts = 0;
  }

  //^ Get country data by region
  getCountryDataByRegion(e) {
    if (e.target.classList.contains('nav-link')) {
      e.preventDefault();
      // Get name of region
      const region = e.target.dataset.region;
      const prefix = region === 'all' ? '' : 'region/';

      // Reset previous game
      // Create new keyboard
      domElement.keyboard.innerHTML = keyboardController.createKeyboard();
      // Reset img with lifes
      uiController.changeImg(0);
      // Set attempts to 0
      this.atempts = 0;
      // Fetch new data
      this.fetchCountryData(prefix, region);
    }
  }

  //^ Fetch country data
  async fetchCountryData(prefix = '', region = 'all') {
    try {
      const res = await fetch(
        `https://restcountries.eu/rest/v2/${prefix}${region}`
      );

      if (!res.ok) {
        throw new Error(
          'Something went wrong. Problem getting a country data... Try again'
        );
      }
      const data = await res.json();

      const randomNum = Math.floor(Math.random() * data.length);
      const country = data[randomNum];

      // Some country names have ',' or '()'. We don't need it
      const re = /[^(\,\()]*/;
      const countryName = country.name.match(re)[0].trim().toUpperCase();

      this.countryName = countryName;
      this.countryCapital = country.capital;
      this.countryFlag = country.flag;
      this.encodedCountryName = this.createSecretCountryName();

      uiController.renderCountry();

      return country;
    } catch (err) {
      uiController.openModal(err);
    }
  }

  //^ Encode country name
  createSecretCountryName() {
    const characters = ['Å', 'Ç', 'Ô', '-', `'`, ' '];

    const encodedCountryName = this.countryName
      .split('')
      .map(el => ([el].some(v => characters.includes(v)) ? el : (el = '-')));

    return encodedCountryName;
  }
}

export const state = new State();
