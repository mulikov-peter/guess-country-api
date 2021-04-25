import game from '../game.js';
import View from './View.js';

class KeyboardView extends View {
  _parentEl = document.querySelector('.keyboard-letters');

  addHandlerClickBtnLetter() {
    this._parentEl.addEventListener('click', e => {
      const letter = e.target.closest('.keyboard__item');

      if (!letter) return;

      letter.firstElementChild.firstElementChild.checked = true;

      e.preventDefault();
      game.checkIsLetterCorrect(letter);
    });
  }

  //^ Create keyboard
  _generateMarkup() {
    this._clear();
    return [...Array(26)]
      .map((_, i) => {
        const letter = `${String.fromCharCode(i + 65)}`;

        const btnLetter = `
          <li class="keyboard__item" id=${letter}>
            <label>
              <input class="keyboard__checkbox" type="checkbox" />
              <div class="icon-box">
                <p>${letter}</p>
              </div>
            </label>
          </li>`;
        this._parentEl.insertAdjacentHTML('beforeend', btnLetter);
        return btnLetter;
      })
      .join('');
  }

  changeLetterColor(target, newClassName) {
    target.classList.add(newClassName);
    target.firstElementChild.firstElementChild.checked = true;
  }
}

export default new KeyboardView();
