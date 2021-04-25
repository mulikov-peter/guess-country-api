import * as model from './model.js';

import hintView from './ui-views/hintView.js';
import keyboardView from './ui-views/keyboardView.js';
import scoreView from './ui-views/scoreView.js';
import secretWordView from './ui-views/secretWordView.js';
import { openPopup } from '../js/helpers';

class Game {
  checkIsLetterCorrect = function (letterEl) {
    const { country } = model.state;

    let correct = false;
    [...country.countryName].forEach((letter, i) => {
      if (letterEl.id === letter) {
        correct = true;
        this.openLetter(letterEl, i, letter);
        this.checkWin();
      }
    });

    if (!correct) {
      this.handleWrongLetter(letterEl);
      this.checkLost();
    }
  };

  // Open letter on display
  openLetter = function (target, i, letter) {
    const { country } = model.state;
    //Add class to letter and change color
    keyboardView.changeLetterColor(target, 'correct');
    // Open correct letter
    country.encodedName.splice(i, 1, letter);
    // Update display encoded name
    secretWordView.render(country);

    this.checkWin();
  };

  // Check if won
  checkWin = function () {
    const { country } = model.state;
    if (country.countryName === country.encodedName.join('')) {
      // Opem modal window - You win
      openPopup('You won!!!');
    }
  };

  // Check if lost
  checkLost = function () {
    if (model.state.attempts >= 6) {
      // Open modal window - You lost
      openPopup('You lost :(');
    }
  };

  // Increase attempts, change color of letter, update score:
  handleWrongLetter = function (target) {
    if (target.classList.contains('wrong')) return;

    model.state.attempts++;
    keyboardView.changeLetterColor(target, 'wrong');
    scoreView.updateScores();
  };
}

export default new Game();
