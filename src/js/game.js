import * as model from './model.js';

import hintView from './ui-views/hintView.js';
import keyboardView from './ui-views/keyboardView.js';
import lifeImgView from './ui-views/lifeImgView.js';
import secretWordView from './ui-views/secretWord.View.js';
import { openModal } from './helpers.js';

class Game {
  checkIsLetterCorrect = function (e) {
    const { country } = model.state;

    let correct = false;
    [...country.countryName].forEach((letter, i) => {
      if (e.target.id === letter) {
        correct = true;
        this.openLetter(e.target, i, letter);
        this.checkWin();
      }
    });

    if (!correct) {
      this.handleWrongLetter(e.target);
      this.checkLost();
    }
  };

  // Open letter on display
  openLetter = function (target, i, letter) {
    const { country } = model.state;
    // Change color of letter
    keyboardView.changeLetterColor(target, 'btn-outline-success');
    // Open correct letter
    country.encodedName.splice(i, 1, letter);
    // Update display encoded name
    secretWordView.render(country);
  };

  // Check if won
  checkWin = function () {
    const { country } = model.state;
    if (country.countryName === country.encodedName.join('')) {
      // Opem modal window - You win
      openModal('You won!!!');
    }
  };

  // Check if lost
  checkLost = function () {
    if (model.state.attempts >= 9) {
      // Open modal window - You lost
      openModal('You lost :(');
    }
  };

  // Check is it enough life
  checkAEnoughLife = function () {
    if (model.state.attempts > 7) hintView.disableHintBtn();
  };

  // Increase attempts, change color of letter, update life image:
  handleWrongLetter = function (target) {
    model.state.attempts++;
    keyboardView.changeLetterColor(target, 'btn-outline-danger');
    lifeImgView.renderSpinner();
    lifeImgView.render(model.state);
  };
}

export default new Game();
