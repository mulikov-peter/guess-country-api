import View from './View.js';

class CountryView extends View {
  _parentEl = document.querySelector('.flag');

  _messageEl = document.querySelector('.message');

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  _generateMarkup() {
    return `
      <img
        src="${this._data.flag}"
        alt="flag of country"
        class="h-100 w-100"
      />
  `;
  }

  renderMessage(region) {
    const continent = region.replace('region/', '');

    this._clear();
    this._messageEl.textContent = `You are guessing country from "${continent}" continent(s)`;
  }
}

export default new CountryView();
