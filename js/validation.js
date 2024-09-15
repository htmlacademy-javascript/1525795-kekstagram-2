import { isDuplicates } from './utils';

const formUpload = document.querySelector('.img-upload__form');
const inputTags = formUpload.querySelector('.text__hashtags');
const inputComment = formUpload.querySelector('.text__description');
const pristine = new Pristine(formUpload, {}, false);
const divError = document.createElement('div');

pristine.addValidator(inputTags, validateHashtags);


export function validateHashtags() {
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
    displayError(inputTags, errText);

    return false;
  }
  divError.remove();
  return true;
}

export function validateComment() {
  clearError(inputComment);
  if (inputComment.value.length > 140) {
    const errText = 'Длина комментария не может быть больше 140 символов!';
    displayError(inputComment, errText);

    return false;
  }
  return true;
}


function displayError(fieldName, errText) {
  fieldName.parentNode.insertAdjacentElement('beforeend', divError);
  divError.textContent = errText;
  divError.classList.add('pristine-error');
  divError.classList.add('img-upload__field-wrapper--error');
}


function clearError(fieldName) {
  fieldName.classList.remove('pristine-error');
  fieldName.classList.remove('img-upload__field-wrapper--error');
  divError.textContent = '';
}
