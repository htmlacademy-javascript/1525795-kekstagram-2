const ALERT_SHOW_TIME = 5000;
const errorTemplate = document.querySelector('#data-error').content;
const successTemplate = document.querySelector('#success').content;

export const showErrMessage = () => {
  const errDiv = document.createElement('div');
  errDiv.appendChild(errorTemplate);
  document.body.appendChild(errDiv);

  setTimeout(() => {
    errDiv.remove();
  }, ALERT_SHOW_TIME);
};


export const showSuccessMessage = () => {
  document.body.appendChild(successTemplate.cloneNode(true));

  document.addEventListener('keydown', closeSuccessAlertByEsc);
  document.addEventListener('click', closeSuccessAlertByClick);

  document.querySelector('.success__title').textContent = 'Изображение успешно отправлено!';
};


function closeSuccessAlertByEsc(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeSuccessAlert();
  }
}


function closeSuccessAlertByClick(evt) {
  if (evt.target === document.querySelector('.success') || evt.target === document.querySelector('.success__button')) {
    evt.preventDefault();
    closeSuccessAlert();
  }
}

function closeSuccessAlert() {
  document.removeEventListener('keydown', closeSuccessAlertByEsc);
  document.removeEventListener('click', closeSuccessAlertByClick);
  document.querySelector('.success').remove();
}
