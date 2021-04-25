import View from './View.js';

class CountryView extends View {
  _parentEl = document.querySelector('.flag');

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  _generateMarkup() {
    return `
      <img src="${this._data.flag}" alt="flag of country"/>
  `;
  }
}

export default new CountryView();
