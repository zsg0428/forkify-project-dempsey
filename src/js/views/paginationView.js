import View from './View';

import icons from 'url:../../img/icons.svg'; // Parcel 1

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);
      if (!btn) {
        return;
      }

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
      console.log(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );
    console.log(numPages);

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }
    // page 1, and there are no other pages.
    if (curPage === 1 && numPages === 1) {
      return '';
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>`;
    }
    //Other pages

    if (curPage < numPages && curPage > 1) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
       <button data-goto="${
         curPage + 1
       }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }
  }
}

export default new PaginationView();
