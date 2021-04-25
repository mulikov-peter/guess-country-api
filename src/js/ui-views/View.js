export default class View {
  _data;

  _clear() {
    this._parentEl.innerHTML = '';
  }

  // Render data to UI
  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  // Render spinner
  renderSpinner() {
    const markup = `    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
