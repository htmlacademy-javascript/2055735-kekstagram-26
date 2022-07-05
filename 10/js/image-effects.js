import {
  chromeSlider,
  sepiaSlider,
  marvinSlider,
  phobosSlider,
  heatSlider
} from './nouislider-options.js';

const effects = document.querySelectorAll('.effects__radio');
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

const addEffectsListeners = () => {
  effects.forEach((effect) => {
    effect.addEventListener('change', () => {
      setupEffect(effect);
      checkNoneEffect();
      if (imgPreview.classList.contains('effects__preview--chrome')) {
        slider.noUiSlider.updateOptions(chromeSlider);
        slider.noUiSlider.on('update', () => {
          effectLevel.value = slider.noUiSlider.get();
          imgPreview.style.filter = `grayscale(${effectLevel.value})`;
        });
      }
      if (imgPreview.classList.contains('effects__preview--sepia')) {
        slider.noUiSlider.updateOptions(sepiaSlider);
        slider.noUiSlider.on('update', () => {
          effectLevel.value = slider.noUiSlider.get();
          imgPreview.style.filter = `sepia(${effectLevel.value})`;
        });
      }
      if (imgPreview.classList.contains('effects__preview--marvin')) {
        slider.noUiSlider.updateOptions(marvinSlider);
        slider.noUiSlider.on('update', () => {
          effectLevel.value = slider.noUiSlider.get();
          imgPreview.style.filter = `invert(${effectLevel.value}%)`;
        });
      }
      if (imgPreview.classList.contains('effects__preview--phobos')) {
        slider.noUiSlider.updateOptions(phobosSlider);
        slider.noUiSlider.on('update', () => {
          effectLevel.value = slider.noUiSlider.get();
          imgPreview.style.filter = `blur(${effectLevel.value}px)`;
        });
      }
      if (imgPreview.classList.contains('effects__preview--heat')) {
        slider.noUiSlider.updateOptions(heatSlider);
        slider.noUiSlider.on('update', () => {
          effectLevel.value = slider.noUiSlider.get();
          imgPreview.style.filter = `brightness(${effectLevel.value})`;
        });
      }
    });
  });
};

export {
  addEffectsListeners
};
