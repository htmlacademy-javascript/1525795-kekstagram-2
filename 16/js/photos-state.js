import { getUniqueRandomNumbers } from './utils';

let loadedPhotos = {};
const RANDOM_COUNT = 10;


export function saveLoadedPhotos(photos) {
  loadedPhotos = photos;
}


export function getLoadedPhotos() {
  return loadedPhotos;
}


export function getDefaultPhotos() {
  return loadedPhotos;
}


export function getRandomPhotos(countPhotos = RANDOM_COUNT) {
  const randomIds = getUniqueRandomNumbers(0, loadedPhotos.length - 1, countPhotos)();
  const randomPhotos = [];

  for (let i = 0; i < randomIds.length; i++) {
    randomPhotos.push(loadedPhotos[randomIds[i]]);
  }

  return randomPhotos;
}


export function getDiscussedPhotos() {
  const sortedPhotos = loadedPhotos.slice().sort(sortByComments);

  return sortedPhotos;
}


function sortByComments(a, b) {
  {
    if (a.comments.length > b.comments.length) {
      return -1;
    }
    if (a.comments.length < b.comments.length) {
      return 1;
    }
    return 0;
  }
}
