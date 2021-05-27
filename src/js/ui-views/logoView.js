import View from './View.js';

class LogoView extends View {
  _parentEl = document.querySelector('.navigation__logo');

  _generateMarkup() {
    return this._data === 'all'
      ? `<i class="fas fa-globe"></i>`
      : `<i class="fas fa-globe-${this._data.slice(7)}"></i>`;
  }
}

export default new LogoView();
