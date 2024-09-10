const pictureTemplate = document.querySelector('#picture').content.querySelector('a');
const documentFragment = document.createDocumentFragment();

export const showThumbnail = (photos) => {
  clearPreviousPictures();

  if (photos.length) {
    photos.forEach((photo) => {
      const photoItem = createPhotoItem(photo);
      documentFragment.appendChild(photoItem);
    });
  } else {
    // Nothing to render
  }

  const pictures = document.querySelector('.pictures');
  pictures.appendChild(documentFragment);
};


function createPhotoItem(photo) {
  const photoItem = pictureTemplate.cloneNode(true);
  photoItem.dataset.id = photo.id;
  photoItem.querySelector('img').src = photo.url;
  photoItem.querySelector('img').alt = photo.description;
  photoItem.querySelector('.picture__likes').textContent = photo.likes;
  photoItem.querySelector('.picture__comments').textContent = photo.comments.length;

  return photoItem;
}


function clearPreviousPictures() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const pictureElement = document.querySelector('.picture');
    if (pictureElement) {
      pictureElement.parentNode.removeChild(pictureElement);
    } else {
      break;
    }
  }
}
