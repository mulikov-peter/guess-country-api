import View from './View.js';

class SecretWordView extends View {
  _parentEl = document.querySelector('.secret-word');

  _generateMarkup() {
    return `
      <h4 class="secret-word">${this._data.encodedName.join('')}</h4>
    `;
  }
}

export default new SecretWordView();
