import img0 from 'url:../../img/img-0.png'; // Parcel 2
import img1 from 'url:../../img/img-1.png'; // Parcel 2
import img2 from 'url:../../img/img-2.png'; // Parcel 2
import img3 from 'url:../../img/img-3.png'; // Parcel 2
import img4 from 'url:../../img/img-4.png'; // Parcel 2
import img5 from 'url:../../img/img-5.png'; // Parcel 2
import img6 from 'url:../../img/img-6.png'; // Parcel 2
import img7 from 'url:../../img/img-7.png'; // Parcel 2
import img8 from 'url:../../img/img-8.png'; // Parcel 2
import img9 from 'url:../../img/img-9.png'; // Parcel 2

import View from './View.js';

class LifeImgView extends View {
  _parentEl = document.querySelector('.life');
  imgs = [img0, img1, img2, img3, img4, img5, img6, img7, img8, img9];

  _generateMarkup() {
    return `
      <img class="h-100 w-100" src="${
        this.imgs[this._data.attempts]
      }" alt="life" />
    `;
  }
}

export default new LifeImgView();
