import { showLoadErrMessage, showSendErrMessage, showSuccessMessage } from './alerts';
import { saveLoadedPhotos } from './photos-state';
import { showThumbnail } from './show-thumbnail';

const GET_ENDPOINT = 'https://31.javascript.htmlacademy.pro/kekstagram/data/';
const POST_ENDPOINT = 'https://31.javascript.htmlacademy.pro/kekstagram/';
const submitButton = document.querySelector('.img-upload__submit');
const Method = {
  GET: 'GET',
  POST: 'POST'
};


export const getData = (cb) => {
  fetch(GET_ENDPOINT, {method: Method.GET})
    .then((response) => {
      if (!response.ok) {
        throw new Error('Некорректный ответ сервера!');
      }
      return response.json();
    })
    .then((data) => {
      saveLoadedPhotos(data);
    })
    .then(() => cb()) // Фильтрация фотографий
    .then((photos) => {
      showThumbnail(photos);
    })
    .catch((err) => {
      showLoadErrMessage(err.message); // Ошибка соединения с сервером!
    });
};


function enableSubmit () {
  submitButton.disabled = false;
}


export const sendData = (formData, cb) =>
  fetch(POST_ENDPOINT, { method: Method.POST, body: formData })
    .then((response) => {
      if (!response.ok) {
        throw new Error(); // Некорректный ответ сервера
      }
    })
    .then(() => {
      showSuccessMessage();
    })
    .then(() => {
      cb();
    })
    .catch((err) => {
      showSendErrMessage(err.message); // Ошибка соединения с сервером
    })
    .finally(enableSubmit);
