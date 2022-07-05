import {
  PREVIEW_SCALE_MIN,
  PREVIEW_SCALE_MAX,
  PREVIEW_SCALE_STEP
} from './data.js';

const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleControl = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');

const getScaleControlToNumber = () => Number(scaleControl.value.slice(0, -1));

const increaseScale = () => {
  if (scaleControl.value !== PREVIEW_SCALE_MAX) {
    const scaleControlToNumber = getScaleControlToNumber();
    scaleControl.value = `${scaleControlToNumber + PREVIEW_SCALE_STEP}%`;
    imgPreview.style.transform = `scale(${  (scaleControlToNumber + PREVIEW_SCALE_STEP) / 100  })`;
  }
};

const reduceScale = () => {
  if (scaleControl.value !== PREVIEW_SCALE_MIN) {
    const scaleControlToNumber = getScaleControlToNumber();
    scaleControl.value = `${scaleControlToNumber -  PREVIEW_SCALE_STEP}%`;
    imgPreview.style.transform = `scale(${  (scaleControlToNumber -  PREVIEW_SCALE_STEP) / 100  })`;
  }
};

const addScaleListeners = () => {
  scaleBiggerButton.addEventListener('click', increaseScale);
  scaleSmallerButton.addEventListener('click', reduceScale);
};

const removeScaleListeners = () => {
  scaleBiggerButton.removeEventListener('click', increaseScale);
  scaleSmallerButton.removeEventListener('click', reduceScale);
};

export {
  addScaleListeners,
  removeScaleListeners
};
