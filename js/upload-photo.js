import { sendData } from './exchange';
import { previewScaleDown, previewScaleUp } from './img-resize';
import { resetEffectPreview } from './img-effects';
import { validateHashtags, validateComment } from './validation';
import { resetSizePreview } from './img-resize';
import { thumbnailClickHandler } from './view-photo';

const formUpload = document.querySelector('.img-upload__form');
const inputFile = document.querySelector('.img-upload__input');
const buttonCancel = document.querySelector('.img-upload__cancel');
const divUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const inputTags = formUpload.querySelector('.text__hashtags');
const inputComment = formUpload.querySelector('.text__description');
const buttonSubmit = document.querySelector('.img-upload__submit');

const btnSmaller = document.querySelector('.scale__control--smaller');
const btnBigger = document.querySelector('.scale__control--bigger');

const sectionPictures = document.querySelector('.pictures');

inputFile.addEventListener('change', inputFileChangeHandler);


function inputFileChangeHandler(evt) {
  // Отключаем слушатели с главной страницы
  sectionPictures.removeEventListener('click', thumbnailClickHandler);

  // Здесь Esc нужно навешивать целиком на весь документ, в противном случае при открытии формы и при клике на картинку
  // не срабатывает событие keyDown-Esc
  document.addEventListener('keydown', documentEscHandler);
  buttonCancel.addEventListener('click', uploadClickHandler);
  formUpload.addEventListener('submit', uploadSubmitHandler);

  btnSmaller.addEventListener('click', previewScaleDown);
  btnBigger.addEventListener('click', previewScaleUp);
  document.querySelector('.pictures').removeEventListener('click', thumbnailClickHandler);


  resetEffectPreview();
  resetSizePreview();
  inputTags.value = '';
  inputComment.value = '';
  divUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  imgUploadPreview.src = URL.createObjectURL(evt.target.files[0]);

  document.querySelectorAll('.effects__preview').forEach((radioItem) => {
    radioItem.style.backgroundImage = `url(${URL.createObjectURL(evt.target.files[0])})`;
  });
}


function uploadClickHandler() {
  closeUploadForm();
}


function closeUploadForm () {
  // Удаляем слушатели на изменение размеров изображения
  btnSmaller.removeEventListener('click', previewScaleDown);
  btnBigger.removeEventListener('click', previewScaleUp);

  // Удаляем слушатели на закрытие модального окна
  document.removeEventListener('keydown', documentEscHandler);
  buttonCancel.removeEventListener('click', uploadClickHandler);
  formUpload.removeEventListener('submit', uploadSubmitHandler);

  divUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  inputFile.value = '';
  resetSizePreview();
  resetEffectPreview();

  // Восстанавливаем слушатели с главной страницы
  document.querySelector('.pictures').addEventListener('click', thumbnailClickHandler);
}


export function documentEscHandler(evt) {
  if (evt.key === 'Escape') {
    // Если Esc не на поле хэштега или примечания, закрыть форму
    if (!(evt.target === inputTags || evt.target === inputComment)) {
      evt.preventDefault();
      closeUploadForm();
    }
  }
}


function uploadSubmitHandler(evt) {
  evt.preventDefault();
  if (validateHashtags() && validateComment()) {
    buttonSubmit.disabled = true;
    sendData(new FormData(evt.target), closeUploadForm);
  }
}
