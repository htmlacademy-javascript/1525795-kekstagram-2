import { getData } from './exchange';
import { getDefaultPhotos, getRandomPhotos, getDiscussedPhotos } from './photos-state';
import { debounce } from './utils';
import { thumbnailClickHandler } from './view-photo';

const RENDERER_DELAY = 500;

const buttonFilterDefault = document.querySelector('#filter-default');
const buttonFilterRandom = document.querySelector('#filter-random');
const buttonFilterDiscussed = document.querySelector('#filter-discussed');
const sectionPictures = document.querySelector('.pictures');

const debounceWrapper = debounce(getData, RENDERER_DELAY);


const selectFilter = (filterName) => {
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
};


const loadPhotos = (filterName, cb) => {
  selectFilter(filterName);
  debounceWrapper(cb);
};


loadPhotos('default', getDefaultPhotos);


const defaultPhotosClickHandler = () => loadPhotos('default', getDefaultPhotos);


const randomPhotosClickHandler = () => loadPhotos('random', getRandomPhotos);


const discussedPhotosClickHandler = () => loadPhotos('discussed', getDiscussedPhotos);


buttonFilterDefault.addEventListener('click', defaultPhotosClickHandler);
buttonFilterRandom.addEventListener('click', randomPhotosClickHandler);
buttonFilterDiscussed.addEventListener('click', discussedPhotosClickHandler);
sectionPictures.addEventListener('click', thumbnailClickHandler);


// На события addEventListener нет смысла добавлять {once: true}. Например, модальное окно, два события:
// 1. Закрытие окна по кнопке
// 2. Закрытие окна по Esc
// Если сработало одно событие, второй слушатель остается висеть в памяти!
