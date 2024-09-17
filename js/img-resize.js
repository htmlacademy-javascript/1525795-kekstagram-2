const STEP_SIZE = 25;
const MIN_SIZE = 25;
const MAX_SIZE = 100;

let currentSize = MAX_SIZE;

const inputScaleSize = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');


export const previewScaleDown = () => {
  currentSize = currentSize > MIN_SIZE ? currentSize -= STEP_SIZE : currentSize;
  changePreview();
};


export const previewScaleUp = () => {
  currentSize = currentSize < MAX_SIZE ? currentSize += STEP_SIZE : currentSize;
  changePreview();
};


export const resetSizePreview = () => {
  currentSize = 100;
  changePreview();
};


function changePreview() {
  inputScaleSize.setAttribute('value', `${currentSize}%`);
  imgPreview.style.transform = `scale(${currentSize / 100})`;
}
