const imgPreview = document.querySelector('.img-upload__preview img');
const radioEffects = document.querySelector('.effects__list');
const imgEffectLevel = document.querySelector('.img-upload__effect-level');
const sliderEffect = document.querySelector('.effect-level__slider');
const inputEffectLevel = document.querySelector('.effect-level__value');
const radioDefaultEffect = document.querySelector('#effect-none');

let currentFilter = 'none';
const FilterSettings = {
  'none': {
    OPTIONS: {range: {min: 0, max: 0}, start: 0, step: 0},
  },
  'chrome': {
    OPTIONS: {range: {min: 0, max: 1}, start: 1, step: 0.1},
    FUNCTION: 'grayscale',
    UNIT: '',
  },
  'sepia': {
    OPTIONS: {range: {min: 0, max: 1}, start: 1, step: 0.1},
    FUNCTION: 'sepia',
    UNIT: '',
  },
  'marvin': {
    OPTIONS: {range: {min: 0, max: 100}, start: 100, step: 1},
    FUNCTION: 'invert',
    UNIT: '%',
  },
  'phobos': {
    OPTIONS: {range: {min: 0, max: 3}, start: 3, step: 0.1},
    FUNCTION: 'blur',
    UNIT: 'px'
  },
  'heat': {
    OPTIONS: {range: {min: 1, max: 3}, start: 3, step: 0.1},
    FUNCTION: 'brightness',
    UNIT: ''
  }
};

const defaultSliderOptions = FilterSettings['none']['OPTIONS'];
defaultSliderOptions['connect'] = 'lower';
defaultSliderOptions['format'] = {
  to: function (value) {
    if (Number.isInteger(value)) {
      return value.toFixed(0);
    }
    return value.toFixed(1);
  },
  from: function (value) {
    return parseFloat(value);
  },
};

const filterClickHandler = (evt) => {
  if (evt.target.nodeName === 'INPUT') {
    currentFilter = evt.target.value;

    if (currentFilter === 'none') {
      imgPreview.style = '';
      imgEffectLevel.hidden = true;
    } else {
      imgEffectLevel.hidden = false;

      sliderEffect.noUiSlider.updateOptions(FilterSettings[currentFilter]['OPTIONS']);
      sliderEffect.value = FilterSettings[currentFilter]['OPTIONS']['range']['max'];
      inputEffectLevel.value = sliderEffect.value;
    }
  }
};


const initSlider = () => {
  noUiSlider.create(sliderEffect, defaultSliderOptions);

  sliderEffect.noUiSlider.on('update', () => {
    inputEffectLevel.value = sliderEffect.noUiSlider.get();
    imgPreview.style.filter = `${FilterSettings[currentFilter]['FUNCTION']}(${inputEffectLevel.value}${FilterSettings[currentFilter]['UNIT']})`;
  });
};


export const resetEffectPreview = () => {
  currentFilter = 'none';
  imgPreview.style = '';
  imgEffectLevel.hidden = true;
  radioDefaultEffect.checked = true;

  sliderEffect.noUiSlider.updateOptions(FilterSettings[currentFilter]['OPTIONS']);
};


radioEffects.addEventListener('click', filterClickHandler);
imgEffectLevel.hidden = true;
initSlider();
resetEffectPreview();
