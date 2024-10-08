import { isDuplicates } from './utils';

const MAX_TAGS = 5;
const MAX_COMMENT_LENGTH = 140;

const formUpload = document.querySelector('.img-upload__form');
const inputTags = formUpload.querySelector('.text__hashtags');
const inputComment = formUpload.querySelector('.text__description');
const pristine = new Pristine(formUpload, {}, false);
const divError = document.createElement('div');


const displayError = (fieldName, errText) => {
  fieldName.parentNode.insertAdjacentElement('beforeend', divError);
  divError.textContent = errText;
  divError.classList.add('pristine-error');
  divError.classList.add('img-upload__field-wrapper--error');
};


const clearError = (fieldName) => {
  fieldName.classList.remove('pristine-error');
  fieldName.classList.remove('img-upload__field-wrapper--error');
  divError.textContent = '';
};


export const validateHashtags = () => {
  if (!inputTags.value) {
    return true;
  }

  clearError(inputTags);

  let tags = inputTags.value.toUpperCase().split(' ');
  // Принудительно удаляем пустые теги (replaceAll работает некорректно при нескольких подряд идущих пробелах)
  tags = tags.filter((item) => item.trim().length > 0);

  const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
  let isError = false;
  let errText = '';

  if (tags.length > MAX_TAGS) {
    errText += `Не более ${MAX_TAGS} хэштегов!`;
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
    displayError(inputTags, errText);

    return false;
  }
  divError.remove();

  return true;
};


export const validateComment = () => {
  clearError(inputComment);
  if (inputComment.value.length > MAX_COMMENT_LENGTH) {
    const errText = `Длина комментария не может быть больше ${MAX_COMMENT_LENGTH} символов!`;
    displayError(inputComment, errText);

    return false;
  }
  divError.remove();

  return true;
};

pristine.addValidator(inputTags, validateHashtags);
