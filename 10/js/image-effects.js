import {
  ChromeSlider,
  SepiaSlider,
  MarvinSlider,
  PhobosSlider,
  HeatSlider
} from './nouislider-options.js';

const effects = document.querySelector('.img-upload__effects');
const effectLevel = document.querySelector('.effect-level__value');
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');
const slider = document.querySelector('.effect-level__slider');

noUiSlider.create(slider, {
  connect: 'lower',
  range: {
    'min': 0,
    'max': 1
  },
  start: 1,
  step: 0.1,
});

const checkNoneEffect = () => {
  if (!imgPreview.classList.contains('effects__preview--none')) {
    slider.classList.remove('hidden');
  } else {
    slider.classList.add('hidden');
  }
};

const setupEffect = (effect) => {
  imgPreview.style.filter = '';
  imgPreview.className = '';
  imgPreview.classList.add(`effects__preview--${effect.value}`);
};

const getOptions = (effect) => {
  let options;
  switch (effect) {
    case 'chrome':
      options = ChromeSlider;
      return options;
    case 'sepia':
      options = SepiaSlider;
      return options;
    case 'marvin':
      options = MarvinSlider;
      return options;
    case 'phobos':
      options = PhobosSlider;
      return options;
    case 'heat':
      options = HeatSlider;
      return options;
  }
};

const getFilterParts = (effect) => {
  const filterParts = [];
  switch (effect) {
    case 'chrome':
      filterParts.push('grayscale(');
      filterParts.push(')');
      return filterParts;
    case 'sepia':
      filterParts.push('sepia(');
      filterParts.push(')');
      return filterParts;
    case 'marvin':
      filterParts.push('invert(');
      filterParts.push(')');
      return filterParts;
    case 'phobos':
      filterParts.push('blur(');
      filterParts.push(')');
      return filterParts;
    case 'heat':
      filterParts.push('brightness(');
      filterParts.push(')');
      return filterParts;
  }
};

const addEffect = (evt) => {
  setupEffect(evt.target);
  checkNoneEffect();
  slider.noUiSlider.updateOptions(getOptions(evt.target.value));
  slider.noUiSlider.on('update', () => {
    effectLevel.value = slider.noUiSlider.get();
    imgPreview.style.filter = getFilterParts(evt.target.value)[0] + effectLevel.value + getFilterParts(evt.target.value)[1];
  });
};

const addEffectsListener = () => {
  effects.addEventListener('change', addEffect);
};

const removeEffectsListener = () => {
  effects.removeEventListener('change', addEffect);
};

export {
  addEffectsListener,
  removeEffectsListener
};
