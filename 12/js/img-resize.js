const btnSmaller = document.querySelector('.scale__control--smaller');
const btnBigger = document.querySelector('.scale__control--bigger');
const sizeValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');
let currentSize = 100;
const sizeStep = 25;

// ToDo: При закрытии окна preview удалить listeners!!
btnSmaller.addEventListener('click', () => {
  currentSize = currentSize === 0 ? 0 : currentSize -= sizeStep;
  changePreview();
});


btnBigger.addEventListener('click', () => {
  currentSize = currentSize === 100 ? 100 : currentSize += sizeStep;
  changePreview();
});

function changePreview() {
  sizeValue.value = `${currentSize}%`;
  imgPreview.style.transform = `scale(${currentSize / 100})`;
}
