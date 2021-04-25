import View from './View.js';

class SecretWordView extends View {
  _parentEl = document.querySelector('.secret-word');

  _generateMarkup() {
    return `
      <h1 class="secret-word">${this._data.encodedName.join('')}</h1>
    `;
  }
}

export default new SecretWordView();
