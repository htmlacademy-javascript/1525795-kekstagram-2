import { sendData } from './exchange';
import { previewScaleDown, previewScaleUp } from './img-resize';
import { resetCurrentFilter } from './img-filters';
import { validateHashtags, validateComment } from './validation';

const uploadForm = document.querySelector('.img-upload__form');
const fileUploadInput = document.querySelector('.img-upload__input');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadPreview = document.querySelector('.img-upload__preview img');
const inputTags = uploadForm.querySelector('.text__hashtags');
const inputComment = uploadForm.querySelector('.text__description');
const submitButton = document.querySelector('#upload-submit');

const btnSmaller = document.querySelector('.scale__control--smaller');
const btnBigger = document.querySelector('.scale__control--bigger');

fileUploadInput.addEventListener('change', openUploadForm);


function openUploadForm(evt) {
  document.addEventListener('keydown', closeUploadByEsc);
  uploadCancelButton.addEventListener('click', closeUploadForm);
  uploadForm.addEventListener('submit', submitUploadForm);

  btnSmaller.addEventListener('click', previewScaleDown);
  btnBigger.addEventListener('click', previewScaleUp);

  resetCurrentFilter();
  inputTags.value = '';
  inputComment.value = '';
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadPreview.src = URL.createObjectURL(evt.target.files[0]);

  document.querySelectorAll('.effects__preview').forEach((radioItem) => {
    radioItem.style.backgroundImage = `url(${URL.createObjectURL(evt.target.files[0])})`;
  });

}


function closeUploadForm() {
  btnSmaller.removeEventListener('click', previewScaleDown);
  btnBigger.removeEventListener('click', previewScaleUp);

  document.removeEventListener('keydown', closeUploadByEsc);
  uploadCancelButton.removeEventListener('click', closeUploadForm);
  uploadForm.removeEventListener('submit', submitUploadForm);

  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  fileUploadInput.value = '';
}


function closeUploadByEsc(evt) {
  if (evt.key === 'Escape') {
    // Если Esc не на поле хэштега или примечания, закрыть форму
    if (evt.target !== inputTags && evt.target !== inputComment) {
      evt.preventDefault();
      closeUploadForm();
    }
  }
}


function submitUploadForm(evt) {
  evt.preventDefault();
  if (validateHashtags() && validateComment()) {
    submitButton.disabled = true;
    sendData(new FormData(evt.target), closeUploadForm);
  }
}
