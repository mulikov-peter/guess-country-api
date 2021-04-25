import View from './View.js';

class ScoreView extends View {
  _parentEl = document.querySelector('.score');
  _scores = [];

  _generateMarkup() {
    this._clear();
    const scores = [...Array(6)].fill(`<i class='fas fa-heart'></i>`);
    this._scores = scores;

    this._parentEl.insertAdjacentHTML('beforeend', scores);
    return scores.join('');
  }

  updateScores() {
    this._clear();

    const index = this._scores.indexOf(`<i class='fas fa-heart'></i>`);
    this._scores[index] = `<i class='far fa-heart'></i>`;

    this._parentEl.insertAdjacentHTML('beforeend', this._scores.join(''));
    return this._scores;
  }
}

export default new ScoreView();
