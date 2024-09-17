import { documentEscHandler } from './upload-photo';
import { thumbnailClickHandler } from './view-photo';

const ALERT_SHOW_TIME = 5000;

const loadErrorTemplate = document.querySelector('#data-error').content;
const sendErrorTemplate = document.querySelector('#error').content;
const successTemplate = document.querySelector('#success').content;


// Используется только при загрузке миниатюр
export const showLoadErrMessage = () => {
  const errDiv = document.createElement('div');
  errDiv.appendChild(loadErrorTemplate.cloneNode(true));
  document.body.appendChild(errDiv);

  setTimeout(() => {
    errDiv.remove();
  }, ALERT_SHOW_TIME);
};


// Используется при отправке изображения
export const showSendErrMessage = () => {
  showMessage(sendErrorTemplate, '.error');
};


// Используется при отправке изображения
export const showSuccessMessage = () => {
  showMessage(successTemplate, '.success');
};


function showMessage(messageTemplate, messageClass) {
  document.body.appendChild(messageTemplate.cloneNode(true));
  const sectionMessage = document.querySelector(messageClass);
  sectionMessage.classList.add('alert');

  document.addEventListener('keydown', messageEscHandler);
  document.addEventListener('click', messageClickHandler);
}


function messageEscHandler(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeAlert();

  }
}


function messageClickHandler(evt) {
  if (['success', 'success__button', 'error', 'error__button'].some((item) => evt.target.classList.contains(item))) {
    evt.preventDefault();
    closeAlert();
  }
}


function closeAlert() {
  document.removeEventListener('keydown', messageEscHandler);
  document.removeEventListener('click', messageClickHandler);
  document.querySelector('.alert').remove();
  document.querySelector('.pictures').addEventListener('click', thumbnailClickHandler);
  document.addEventListener('keydown', documentEscHandler);
}
