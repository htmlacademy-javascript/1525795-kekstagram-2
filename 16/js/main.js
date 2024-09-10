import { getData } from './exchange';
import { getDefaultPhotos, getRandomPhotos, getDiscussedPhotos } from './photos-state';
import { debounce } from './utils';

const sectionFilters = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const RENDERER_DELAY = 500;


sectionFilters.classList.remove('img-filters--inactive');
filterDefault.addEventListener('click', renderDefaultPhotos);
filterRandom.addEventListener('click', renderRandomPhotos);
filterDiscussed.addEventListener('click', renderDiscussedPhotos);

const debounceWrapper = debounce(getData, RENDERER_DELAY);

renderDefaultPhotos();


function renderDefaultPhotos() {
  filterDefault.classList.add('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  filterDiscussed.classList.remove('img-filters__button--active');

  debounceWrapper(getDefaultPhotos);
}


function renderRandomPhotos() {
  filterDefault.classList.remove('img-filters__button--active');
  filterRandom.classList.add('img-filters__button--active');
  filterDiscussed.classList.remove('img-filters__button--active');

  debounceWrapper(getRandomPhotos);
}


function renderDiscussedPhotos() {
  filterDefault.classList.remove('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  filterDiscussed.classList.add('img-filters__button--active');

  debounceWrapper(getDiscussedPhotos);
}
