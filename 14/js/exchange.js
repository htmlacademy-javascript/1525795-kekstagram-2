import { showThumbnail } from './show-photos';
import { showErrMessage, showSuccessMessage } from './alerts';
let loadedPhotos = {};
const GET_ENDPOINT = 'https://31.javascript.htmlacademy.pro/kekstagram/data';
const POST_ENDPOINT = 'https://31.javascript.htmlacademy.pro/kekstagram';
const submitButton = document.querySelector('#upload-submit');


const getData = () =>
  fetch(GET_ENDPOINT)
    .then((response) => {
      if (!response.ok) {
        throw new Error(); // Некорректный ответ сервера!
      }
      return response.json();
    })
    .then((photos) => {
      loadedPhotos = photos;
      showThumbnail(photos);
    })
    .catch((err) => {
      showErrMessage(err.message); // Ошибка соединения с сервером!
    });


const enableSubmit = () => {
  submitButton.disabled = false;
};


const sendData = (formData) =>
  fetch(POST_ENDPOINT, {method: 'POST', body: formData})
    .then((response) => {
      if (!response.ok) {
        throw new Error(); // Некорректный ответ сервера
      }
    })
    .then(() => {
      showSuccessMessage();
    })
    .catch((err) => {
      showErrMessage(err.message); // Ошибка соединения с сервером
    })
    .finally(enableSubmit);


export { getData, sendData, loadedPhotos };
