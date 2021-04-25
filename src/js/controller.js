import { async } from 'regenerator-runtime';

import * as model from './model.js';

import flagView from './ui-views/flagView.js';
import hintView from './ui-views/hintView.js';
import keyboardView from './ui-views/keyboardView.js';
import secretWordView from './ui-views/secretWordView.js';
import scoreView from './ui-views/scoreView.js';
import logoView from './ui-views/logoView.js';

if (module.hot) {
  module.hot.accept();
}
// LOAD COUNTRY DATA
const controlFlag = async function () {
  try {
    let region = window.location.hash.slice(1);

    if (!region || region === 'whole-world') region = 'all';

    await model.loadCountry(region);
    model.state.attempts = 0;
    const { country } = model.state;

    // Rendering
    logoView.render(region);
    scoreView.render();
    flagView.render(country);
    secretWordView.render(country);
    keyboardView.render();
    hintView.render();
  } catch (err) {
    console.log(err);
  }
};

const controlHint = function () {
  const { country } = model.state;
  hintView.showHint(country);
};

const init = () => {
  flagView.addHandlerRender(controlFlag);
  hintView.addHandlerUseHint(controlHint);
  keyboardView.addHandlerClickBtnLetter();
};

init();
