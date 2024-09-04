const btnSmaller = document.querySelector('.scale__control--smaller');
const btnBigger = document.querySelector('.scale__control--bigger');
const sizeValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');
let currentSize = 100;
const sizeStep = 25;
const minSize = 25;
const maxSize = 100;

// ToDo: При закрытии окна preview удалить listeners!!
btnSmaller.addEventListener('click', () => {
  currentSize = currentSize > minSize ? currentSize -= sizeStep : currentSize;
  changePreview();
});


btnBigger.addEventListener('click', () => {
  currentSize = currentSize < maxSize ? currentSize += sizeStep : currentSize;
  changePreview();
});

function changePreview() {
  sizeValue.value = `${currentSize}%`;
  imgPreview.style.transform = `scale(${currentSize / 100})`;
}
