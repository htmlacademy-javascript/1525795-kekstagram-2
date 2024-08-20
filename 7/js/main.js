import { getPhotos } from './get-photos';

const pictureTemplate = document.querySelector('#picture').content.querySelector('a');

const photosList = getPhotos();
const documentFragment = document.createDocumentFragment();

photosList.forEach((photo) => {
  const photoItem = pictureTemplate.cloneNode(true);

  photoItem.querySelector('img').setAttribute('src', photo.url);
  photoItem.querySelector('img').setAttribute('alt', photo.description);
  photoItem.querySelector('.picture__likes').textContent = photo.likes;
  photoItem.querySelector('.picture__comments').textContent = photo.comments.length;

  documentFragment.appendChild(photoItem);
});

const pictures = document.querySelector('.pictures');
pictures.appendChild(documentFragment);
