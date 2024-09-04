const ALERT_SHOW_TIME = 5000;
const errorTemplate = document.querySelector('#data-error').content;
const successTemplate = document.querySelector('#success').content;
const successDiv = document.createElement('div');

export const showErrMessage = () => {
  const errDiv = document.createElement('div');
  errDiv.appendChild(errorTemplate);
  document.body.appendChild(errDiv);

  setTimeout(() => {
    errDiv.remove();
  }, ALERT_SHOW_TIME);
};


export const showSuccessMessage = () => {
  successDiv.appendChild(successTemplate);
  document.body.appendChild(successDiv);

  setTimeout(() => {
    successDiv.remove();
  }, ALERT_SHOW_TIME);
};
