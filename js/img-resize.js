const inputScaleSize = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');
let CURRENT_SIZE = 100;
const STEP_SIZE = 25;
const MIN_SIZE = 25;
const MAX_SIZE = 100;


export const previewScaleDown = () => {
  CURRENT_SIZE = CURRENT_SIZE > MIN_SIZE ? CURRENT_SIZE -= STEP_SIZE : CURRENT_SIZE;
  changePreview();
};


export const previewScaleUp = () => {
  CURRENT_SIZE = CURRENT_SIZE < MAX_SIZE ? CURRENT_SIZE += STEP_SIZE : CURRENT_SIZE;
  changePreview();
};


export const resetSizePreview = () => {
  CURRENT_SIZE = 100;
  changePreview();
};


function changePreview() {
  inputScaleSize.value = `${CURRENT_SIZE}%`;
  imgPreview.style.transform = `scale(${CURRENT_SIZE / 100})`;
}
