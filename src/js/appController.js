import { async } from 'regenerator-runtime';

import * as model from './model.js';
import game from './game.js';
import countryView from './ui-views/countryView.js';
import hintView from './ui-views/hintView.js';
import keyboardView from './ui-views/keyboardView.js';
import secretWordView from './ui-views/secretWord.View.js';
import { openModal } from './helpers.js';
import lifeImgView from './ui-views/lifeImgView.js';

if (module.hot) {
  module.hot.accept();
}

// LOAD COUNTRY DATA
const controlCountry = async function () {
  try {
    let region = window.location.hash.slice(1);

    if (!region || region === 'whole-world') region = 'all';

    // Render spinner
    countryView.renderSpinner();

    // Loading country
    await model.loadCountry(region);
    const { country } = model.state;
    lifeImgView.renderSpinner();
    // Rendering message
    countryView.renderMessage(region);

    // Rendering life image
    lifeImgView.render(model.state);

    // Rendering flag
    countryView.render(country);

    model.state.attempts = 0;

    // Rendering hint buttons
    hintView.render();

    // Rendering secret word
    secretWordView.render(country);

    keyboardView.render();
  } catch (err) {
    openModal('Something went wrong...');
  }
};

// The handler of button OPEN CAPITAL or OPEN LETTER
const controlHint = function (e) {
  const { country } = model.state;

  // Handle wrong letter:
  game.handleWrongLetter(e.target);

  // Check is it enough life for open hint
  game.checkAEnoughLife();

  // Click btn hint open letter or open capital
  hintView.update(country);
};

// The handler of button letter of gameplay keyboard
const controlKeyboard = function (e) {
  game.checkIsLetterCorrect(e);
  game.checkAEnoughLife();
};

const reloadPage = () => {
  const url = window.location.toString();

  if (url.indexOf('#') > 0) {
    const cleanUrl = url.substring(0, url.indexOf('#'));

    window.history.replaceState({}, document.title, cleanUrl);
    location.reload();
  }

  controlCountry();
};

document.querySelector('.play-again').addEventListener('click', reloadPage);

const init = () => {
  countryView.addHandlerRender(controlCountry);
  hintView.addHandlerUseHint(controlHint);
  keyboardView.addHandlerClickBtnLetter(controlKeyboard);
};

init();
