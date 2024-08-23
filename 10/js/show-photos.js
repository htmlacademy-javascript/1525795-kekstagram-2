import { getGeneratedId } from './utils';
import {
  getRandomInteger,
  getUniqueRandomInteger
} from './random';
import {
  getRandomDescription,
  getRandomNickName,
  getCommentsList
} from './data';

const MIN_COMMENTS_COUNT = 0;
const MAX_COMMENTS_COUNT = 30;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const PHOTOS_COUNT = 25;

// Генерация комментария
const commentId = getGeneratedId();
const getComments = () => ({
  id: commentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getCommentsList().join(' '),
  name: getRandomNickName(),
});

// Функция генерации фото
const photoId = getGeneratedId();
const photoNum = getUniqueRandomInteger(1, 25);

const getPhoto = () => ({
  id: photoId(),
  url: `photos/${photoNum()}.jpg`,
  description: getRandomDescription(),
  likes: getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
  comments: Array.from({
    length: getRandomInteger(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT)
  }, getComments),
});

export const photosList = Array.from({ length: PHOTOS_COUNT }, getPhoto);
const pictureTemplate = document.querySelector('#picture').content.querySelector('a');
const documentFragment = document.createDocumentFragment();

photosList.forEach((photo) => {
  const photoItem = pictureTemplate.cloneNode(true);
  photoItem.dataset.id = photo.id;

  photoItem.querySelector('img').setAttribute('src', photo.url);
  photoItem.querySelector('img').setAttribute('alt', photo.description);
  photoItem.querySelector('.picture__likes').textContent = photo.likes;
  photoItem.querySelector('.picture__comments').textContent = photo.comments.length;

  documentFragment.appendChild(photoItem);
});

const pictures = document.querySelector('.pictures');
pictures.appendChild(documentFragment);
