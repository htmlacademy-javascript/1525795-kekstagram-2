const imgPreview = document.querySelector('.img-upload__preview img');
const filters = document.querySelector('.effects__list');
let currentFilter = 'none';
const imgEffectLevel = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const filterSettings = {
  'none': {
    min: 0,
    max: 0,
    step: 0,
    start: 0
  },
  'chrome': {
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    function: 'grayscale',
    unit: ''
  },
  'sepia': {
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    function: 'sepia',
    unit: ''
  },
  'marvin': {
    min: 0,
    max: 100,
    step: 1,
    start: 100,
    function: 'invert',
    unit: '%'
  },
  'phobos': {
    min: 0,
    max: 3,
    step: 0.1,
    start: 3,
    function: 'blur',
    unit: 'px'
  },
  'heat': {
    min: 1,
    max: 3,
    step: 0.1,
    start: 3,
    function: 'brightness',
    unit: ''
  }
};

imgEffectLevel.hidden = true;

noUiSlider.create(slider, {
  range: {
    min: filterSettings[currentFilter]['min'],
    max: filterSettings[currentFilter]['max'],
  },
  start: filterSettings[currentFilter]['start'],
  step: filterSettings[currentFilter]['step'],
  connect: 'lower',
});


filters.addEventListener('click', (evt) => {
  if (evt.target.nodeName === 'INPUT') {
    currentFilter = evt.target.value;

    if (currentFilter === 'none') {
      imgPreview.style = '';
      imgEffectLevel.hidden = true;
    } else {
      imgEffectLevel.hidden = false;

      slider.noUiSlider.updateOptions({
        range: {
          min: filterSettings[currentFilter]['min'],
          max: filterSettings[currentFilter]['max'],
        },
        start: filterSettings[currentFilter]['start'],
        step: filterSettings[currentFilter]['step']
      });

      slider.value = filterSettings[currentFilter]['max'];
      valueElement.value = filterSettings[currentFilter]['max'];
    }
  }
});


slider.noUiSlider.on('update', () => {
  valueElement.value = slider.noUiSlider.get();
  imgPreview.style.filter = `${filterSettings[currentFilter]['function']}(${valueElement.value}${filterSettings[currentFilter]['unit']})`;
});
