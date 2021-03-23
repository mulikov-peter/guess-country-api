import View from './View.js';

class KeyboardView extends View {
  _parentEl = document.querySelector('.keyboard');

  addHandlerClickBtnLetter(handler) {
    this._parentEl.addEventListener('click', e => {
      const letter = e.target.closest('.letter');

      if (!letter) return;

      handler(e);
      e.preventDefault();
    });
  }

  //^ Create keyboard
  _generateMarkup() {
    this._clear();
    return [...Array(26)]
      .map((_, i) => {
        const letter = `${String.fromCharCode(i + 65)}`;
        const btnLetter = `<button  class="btn btn-secondary letter m-1" id=${letter}>${letter}</button>`;
        this._parentEl.insertAdjacentHTML('beforeend', btnLetter);
        return btnLetter;
      })
      .join('');
  }

  changeLetterColor(target, msg) {
    target.classList.remove('btn-secondary');
    target.classList.add(msg);
    target.classList.add('disabled');
  }
}

export default new KeyboardView();
