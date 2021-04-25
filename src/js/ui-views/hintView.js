import View from './View.js';
import game from '../game';

class HintView extends View {
  _parentEl = document.querySelector('.keyboard-hints');
  _target = '';

  addHandlerUseHint(handler) {
    this._parentEl.addEventListener('click', e => {
      const hint = e.target.closest('.keyboard__item');

      if (!hint) return;

      hint.firstElementChild.firstElementChild.checked = true;

      this._target = hint;

      handler();
      e.preventDefault();
    });
  }

  _generateMarkup() {
    return `
      <li class='keyboard__item hint-capital'>
        <label>
          <input type="checkbox" />
          <div class="icon-box">
            <p class='capital'>show capital</p>
          </div>
        </label>
      </li>
      <li class='keyboard__item hint-letter'>
        <label>
          <input type="checkbox" />
          <div class="icon-box">
            <p>open letter</p>
          </div>
        </label>
      </li>
  `;
  }

  showHint(country) {
    if (this._target.classList.contains('hint-capital')) {
      document.querySelector('.capital').textContent = country.capital;
    }

    if (this._target.classList.contains('hint-letter')) {
      const index = country.encodedName.indexOf('-');
      const targetLetter = country.countryName[index];

      [...country.countryName].forEach((letter, i) => {
        if (letter === targetLetter) {
          // Get button of letter for mark it like correct
          const btnLetter = document.querySelector(`#${letter}`);

          // Open letter
          game.openLetter(btnLetter, i, letter);
        }
      });

      this._target.style.display = 'none';
    }
  }
}

export default new HintView();
