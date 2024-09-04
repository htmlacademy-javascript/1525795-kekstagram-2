import { isDuplicates } from './utils';
import { sendData } from './exchange';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadPreview = document.querySelector('.img-upload__preview img');
const inputTags = uploadForm.querySelector('.text__hashtags');
const validateError = document.createElement('p');
const pristine = new Pristine(uploadForm, {}, false);
const submitButton = document.querySelector('#upload-submit');

uploadInput.addEventListener('change', uploadInputHandler);
uploadCancelButton.addEventListener('click', uploadCancelButtonHandler);


function uploadInputHandler(evt) {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadPreview.src = URL.createObjectURL(evt.target.files[0]);
  document.addEventListener('keydown', checkEscKey);
}


function checkEscKey(evt) {
  if (evt.key === 'Escape') {
    // Если Esc не на поле хэштега или примечания, закрыть форму
    if (evt.target !== uploadForm.querySelector('.text__hashtags') &&
      evt.target !== uploadForm.querySelector('.text__description')) {
      evt.preventDefault();
      uploadCancelButtonHandler();
    }
  }
}


function uploadCancelButtonHandler() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', checkEscKey);
  uploadInput.value = '';
}


function validateHashtags() {
  if (!inputTags.value) {
    return true;
  }

  const tags = inputTags.value.split(' ');
  const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
  let isError = false;
  let errText = '';

  if (tags.length > 5) {
    errText += 'Не более 5 хэштегов!';
    isError = true;
  }

  if (!tags.every((tag) => hashtag.test(tag))) {
    errText += 'Один из хэштегов не соответствует требуемому формату!';
    isError = true;
  }

  if (isDuplicates(tags)) {
    errText += 'Присутствуют дубликаты хэштегов!';
    isError = true;
  }

  if (isError) {
    validateError.textContent = errText;
    inputTags.parentNode.insertAdjacentElement('beforeend', validateError);
    inputTags.classList.add('img-upload__field-wrapper--error');

    return false;
  }

  return true;
}


pristine.addValidator(inputTags, validateHashtags);


const disableSubmit = () => {
  submitButton.disabled = true;
};


uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  // Очистить результат предыдущей валидации
  inputTags.classList.remove('img-upload__field-wrapper--error');
  validateError.textContent = '';

  if (pristine.validate()) {
    disableSubmit();
    sendData(new FormData(evt.target));
    uploadCancelButtonHandler();
  }
});
