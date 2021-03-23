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
    const markup = `
      <div class="spinner d-flex justify-content-center position-absolute top-50 start-50 translate-middle">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div> 
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
