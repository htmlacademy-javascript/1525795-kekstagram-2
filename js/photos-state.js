import { getRandomInteger } from './utils';

const RANDOM_COUNT = 10;

let loadedPhotos = {};


export const saveLoadedPhotos = (photos) => {
  loadedPhotos = photos;
};


export const getLoadedPhotos = () => loadedPhotos;


export const getDefaultPhotos = () => loadedPhotos;


export const getRandomPhotos = (countPhotos = RANDOM_COUNT) => {
  const randomPhotos = [];
  const copyPhotos = loadedPhotos.slice();

  for (let i = 0; i < countPhotos; i += 1) {
    randomPhotos.push(copyPhotos.splice(getRandomInteger(0, copyPhotos.length - 1), 1)[0]);
  }

  return randomPhotos;
};


const sortByComments = (a, b) => b.comments.length - a.comments.length;


export const getDiscussedPhotos = () => loadedPhotos.slice().sort(sortByComments);
