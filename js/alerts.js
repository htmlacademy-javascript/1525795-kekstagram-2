import { documentEscHandler } from './upload-photo';
import { thumbnailClickHandler } from './view-photo';

const ALERT_SHOW_TIME = 5000;

const loadErrorTemplate = document.querySelector('#data-error').content;
const sendErrorTemplate = document.querySelector('#error').content;
const successTemplate = document.querySelector('#success').content;


// Используется только при загрузке миниатюр
export function showLoadErrMessage() {
  const errDiv = document.createElement('div');
  errDiv.appendChild(loadErrorTemplate.cloneNode(true));
  document.body.appendChild(errDiv);

  setTimeout(() => {
    errDiv.remove();
  }, ALERT_SHOW_TIME);
}


function closeAlert() {
  document.removeEventListener('keydown', messageEscHandler);
  document.removeEventListener('click', messageClickHandler);
  document.querySelector('.alert').remove();
  document.querySelector('.pictures').addEventListener('click', thumbnailClickHandler);
  document.addEventListener('keydown', documentEscHandler);
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


function showMessage(messageTemplate, messageClass) {
  document.body.appendChild(messageTemplate.cloneNode(true));
  const sectionMessage = document.querySelector(messageClass);
  sectionMessage.classList.add('alert');

  document.addEventListener('keydown', messageEscHandler);
  document.addEventListener('click', messageClickHandler);
}


// Используется при отправке изображения
export function showSendErrMessage() {
  showMessage(sendErrorTemplate, '.error');
}


// Используется при отправке изображения
export function showSuccessMessage() {
  showMessage(successTemplate, '.success');
}
