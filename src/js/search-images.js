import GaleryApiService from './apiService';
import imageTpl from '../templates/img-card.hbs';
import getRefs from './get-refs';
import LoadMoreBtn from './load-more-btn';
import { onOpenModal } from './modal.js';
import { emptyInput, searchError } from './notify.js';

const refs = getRefs();
let currentPosition = 0;
const galeryApiService = new GaleryApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchFotos);
refs.imageContainer.addEventListener('click', onOpenModal);

function onSearch(e) {
  e.preventDefault();
  galeryApiService.query = e.currentTarget.elements.query.value;

  if (galeryApiService.query === '') {
    clearMarkup();
    loadMoreBtn.hide();
    emptyInput();
    return;
  } else {
    loadMoreBtn.show();
    galeryApiService.resetPage();
    clearMarkup();
    fetchFotos();
  }
}

function fetchFotos() {
  loadMoreBtn.show();
  loadMoreBtn.disable();

  currentPosition = refs.imageContainer.offsetHeight;
  galeryApiService.fetchFotos().then(images => {
    renderImagesMarcup(images);
    loadMoreBtn.enable();
  });
}

function renderImagesMarcup(images) {
  refs.imageContainer.insertAdjacentHTML('beforeend', imageTpl(images));
  scrollingPage();
}

function clearMarkup() {
  refs.imageContainer.innerHTML = '';
}

function scrollingPage() {
  window.scrollTo({
    top: currentPosition,
    left: 0,
    behavior: 'smooth',
  });
}
