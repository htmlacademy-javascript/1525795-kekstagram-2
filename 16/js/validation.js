import { isDuplicates } from './utils';

const uploadForm = document.querySelector('.img-upload__form');
const inputTags = uploadForm.querySelector('.text__hashtags');
const inputComment = uploadForm.querySelector('.text__description');
const pristine = new Pristine(uploadForm, {}, false);
const validateError = document.createElement('p');

pristine.addValidator(inputTags, validateHashtags);


export function validateHashtags() {
  if (!inputTags.value) {
    return true;
  }

  inputTags.classList.remove('img-upload__field-wrapper--error');
  validateError.textContent = '';

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

export function validateComment() {
  inputComment.classList.remove('img-upload__field-wrapper--error');
  validateError.textContent = '';
  if (inputComment.value.length > 140) {
    validateError.textContent = 'Длина комментария не может быть больше 140 символов!';
    inputComment.parentNode.insertAdjacentElement('beforeend', validateError);
    inputComment.classList.add('img-upload__field-wrapper--error');

    return false;
  }
  return true;
}
