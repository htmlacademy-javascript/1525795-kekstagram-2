import { showErrMessage, showSuccessMessage } from './alerts';
import { saveLoadedPhotos } from './photos-state';
import { showThumbnail } from './show-thumbnail';

const GET_ENDPOINT = 'https://31.javascript.htmlacademy.pro/kekstagram/data';
const POST_ENDPOINT = 'https://31.javascript.htmlacademy.pro/kekstagram';
const submitButton = document.querySelector('#upload-submit');


const getData = (cb) => {
  fetch(GET_ENDPOINT)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Некорректный ответ сервера!');
      }
      return response.json();
    })
    .then((data) => {
      saveLoadedPhotos(data);
    })
    .then(() => cb())
    .then((photos) => {
      showThumbnail(photos);
    })
    .catch((err) => {
      showErrMessage(err.message); // Ошибка соединения с сервером!
    });
};


function enableSubmit () {
  submitButton.disabled = false;
}


const sendData = (formData, cb) =>
  fetch(POST_ENDPOINT, { method: 'POST', body: formData })
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
      showErrMessage(err.message); // Ошибка соединения с сервером
    })
    .finally(enableSubmit);


export { getData, sendData };
