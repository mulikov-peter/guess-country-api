import { async } from 'regenerator-runtime';

const TIMEOUT_SEC = 10;

const timeout = function (s) {
  return new Promise((_, reject) => {
    setTimeout(
      () =>
        reject(
          new Error(`Request took too long! Time after ${s} seconds. Try again`)
        ),
      s * 1000
    );
  });
};

// Get json function
export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

    const data = await res.json();

    if (!res.ok) throw new Error(`Something went wrong...`);

    return data;
  } catch (err) {
    // throw err;
    throw new Error('We could not find that region. Please try another one...');
  }
};

export const getRandomCountry = data => Math.floor(Math.random() * data.length);

export const getCorrectCountryName = country => {
  // Some country names have ',' or '()'. We don't need it
  const re = /[^(\,\()]*/;
  const countryName = country.name.match(re)[0].trim().toUpperCase();
  return countryName;
};

export const getEncodedCounryName = countryName => {
  const characters = ['Å', 'Ç', 'Ô', '-', `'`, ' '];

  const encodedCountryName = countryName
    .split('')
    .map(el => (characters.includes(el) ? el : '-'));

  return encodedCountryName;
};

// NAVIGATION
const navCheckBox = document.querySelector('.navigation__checkbox');
const navList = document.querySelector('.navigation__list');

navList.addEventListener('click', e => {
  const li = e.target.closest('.navigation__link');
  if (!li) return;
  navCheckBox.checked = !navCheckBox.checked;
});

// Open popup
export const openPopup = message => {
  const popup = document.querySelector('.popup');
  document.querySelector('.message').textContent = message;
  popup.classList.remove('hidden');
  popup.classList.add('active');
};

// Play again

document
  .querySelector('.play-again')
  .addEventListener('click', () => location.reload());
