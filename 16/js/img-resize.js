const sizeValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');
let currentSize = 100;
const sizeStep = 25;
const minSize = 25;
const maxSize = 100;


export const previewScaleDown = () => {
  currentSize = currentSize > minSize ? currentSize -= sizeStep : currentSize;
  changePreview();
};


export const previewScaleUp = () => {
  currentSize = currentSize < maxSize ? currentSize += sizeStep : currentSize;
  changePreview();
};


function changePreview() {
  sizeValue.value = `${currentSize}%`;
  imgPreview.style.transform = `scale(${currentSize / 100})`;
}
