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
const PHOTO_COUNT = 25;

// Генерация комментария
const commentId = getGeneratedId();
const createComment = () => ({
  id: commentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getCommentsList().join(' '),
  name: getRandomNickName(),
});

// Функция генерации фото
const photoId = getGeneratedId();
const photoNum = getUniqueRandomInteger(1, 25);

const createPhoto = () => ({
  id: photoId(),
  url: `photos/${photoNum()}.jpg`,
  description: getRandomDescription(),
  likes: getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
  comments: Array.from({
    length: getRandomInteger(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT)
  }, createComment),
});

const photoList = Array.from({ length: PHOTO_COUNT }, createPhoto);

// eslint-disable-next-line no-console
console.log(photoList);
