import game from '../game.js';
import View from './View.js';

class HintView extends View {
  _parentEl = document.querySelector('.hint');
  _target = '';

  addHandlerUseHint(handler) {
    this._parentEl.addEventListener('click', e => {
      const hint = e.target.closest('.btn-hint');

      if (!hint) return;

      this._target = hint;

      handler(e);
      e.preventDefault();
    });
  }

  _generateMarkup() {
    return `
    <button type="button"
      class="btn btn-secondary w-40 btn-hint hint-capital">
      Show Capital
    </button>
    <button type="button"
      class="btn btn-secondary w-40 btn-hint hint-letter">
      Open letter
    </button>
  `;
  }

  update(country) {
    // Click open capital
    if (this._target.classList.contains('hint-capital'))
      this._target.textContent = country.capital;

    // Click open letter
    if (this._target.classList.contains('hint-letter')) {
      const index = country.encodedName.indexOf('-');
      const targetLetter = country.countryName[index];

      [...country.countryName].forEach((letter, i) => {
        if (letter === targetLetter) {
          // Get button of letter for mark it like correct
          const btnLetter = document.querySelector(`#${letter}`);
          // Open letter
          game.openLetter(btnLetter, i, letter);
          // Check if won
          game.checkWin();
        }
      });
    }
  }

  disableHintBtn() {
    Array.from(this._parentEl.children).forEach(btn =>
      btn.classList.add('disabled')
    );
  }
}

export default new HintView();
