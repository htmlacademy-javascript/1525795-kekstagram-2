import { getData } from './exchange';
import { getDefaultPhotos, getRandomPhotos, getDiscussedPhotos } from './photos-state';
import { debounce } from './utils';

const buttonFilterDefault = document.querySelector('#filter-default');
const buttonFilterRandom = document.querySelector('#filter-random');
const buttonFilterDiscussed = document.querySelector('#filter-discussed');
const RENDERER_DELAY = 500;

const debounceWrapper = debounce(getData, RENDERER_DELAY);


buttonFilterDefault.addEventListener('click', defaultPhotosClickHandler);
buttonFilterRandom.addEventListener('click', randomPhotosClickHandler);
buttonFilterDiscussed.addEventListener('click', discussedPhotosClickHandler);


loadPhotos('default', getDefaultPhotos);


function defaultPhotosClickHandler() {
  loadPhotos('default', getDefaultPhotos);
}


function randomPhotosClickHandler() {
  loadPhotos('random', getRandomPhotos);
}


function discussedPhotosClickHandler() {
  loadPhotos('discussed', getDiscussedPhotos);
}


function loadPhotos(filterName, cb) {
  selectFilter(filterName);
  debounceWrapper(cb);
}


function selectFilter(filterName) {
  buttonFilterDefault.classList.remove('img-filters__button--active');
  buttonFilterRandom.classList.remove('img-filters__button--active');
  buttonFilterDiscussed.classList.remove('img-filters__button--active');

  if (filterName === 'default') {
    buttonFilterDefault.classList.add('img-filters__button--active');
  } else if (filterName === 'random') {
    buttonFilterRandom.classList.add('img-filters__button--active');
  } else {
    buttonFilterDiscussed.classList.add('img-filters__button--active');
  }
}


// На события addEventListener нет смысла добавлять {once: true}. Например, модальное окно, два события:
// 1. Закрытие окна по кнопке
// 2. Закрытие окна по Esc
// Если сработало одно событие, второй слушатель остается висеть в памяти!
