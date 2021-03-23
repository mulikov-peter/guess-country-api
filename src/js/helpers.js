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
    .map(l => (characters.includes(l) ? l : '-'));

  return encodedCountryName;
};

export const openModal = message => {
  document.querySelector('#myModal h2').textContent = message;
  // Bootstrap open modal window
  $('#myModal').modal({
    backdrop: 'static',
  });
};

$('.navbar-nav li a').on('click', function () {
  if (!$(this).hasClass('dropdown-toggle')) {
    $('.navbar-collapse').collapse('hide');
  }
});

$('.navbar-nav a').on('click', function () {
  $('.navbar-nav').find('li.active').removeClass('active');
  $(this).parent('li').addClass('active');
});
