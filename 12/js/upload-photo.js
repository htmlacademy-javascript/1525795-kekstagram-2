import { isDuplicates } from './utils';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const inputTags = uploadForm.querySelector('.text__hashtags');
const validateError = document.createElement('p');
const pristine = new Pristine(uploadForm, {}, false);

uploadInput.addEventListener('change', uploadInputHandler);
uploadCancelButton.addEventListener('click', uploadCancelButtonHandler);


function uploadInputHandler() {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
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

  if (tags.length > 5) {
    validateError.textContent = 'Не более 5 хэштегов!';
    isError = true;
  }

  // eslint-disable-next-line no-console
  if (!tags.every((tag) => hashtag.test(tag))) {
    validateError.textContent = 'Один из хэштегов не соответствует требуемому формату!';
    isError = true;
  }

  if (isDuplicates(tags)) {
    validateError.textContent = 'Присутствуют дубликаты хэштегов!';
    isError = true;
  }

  if (isError) {
    inputTags.parentNode.insertAdjacentElement('beforeend', validateError);
    inputTags.classList.add('img-upload__field-wrapper--error');

    return false;
  }

  return true;
}


pristine.addValidator(inputTags, validateHashtags);


uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  // Очистить результат предыдущей валидации
  inputTags.classList.remove('img-upload__field-wrapper--error');
  validateError.textContent = '';

  pristine.validate();
});
