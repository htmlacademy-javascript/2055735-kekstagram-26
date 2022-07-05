import {
  KEY,
  PREVIEW_SCALE_MAX,
} from './data.js';

import {
  isValid
} from './validation.js';

import {
  addScaleListeners,
  removeScaleListeners
} from './image-scale.js';

import {
  addEffectsListener,
  removeEffectsListener
} from './image-effects.js';

const imgEditForm = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const scaleControl = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');
const uploadFile = document.querySelector('#upload-file');
const buttonUploadCancel = document.querySelector('#upload-cancel');
const form = document.querySelector('.img-upload__form');
const textHashtagsField = document.querySelector('.text__hashtags');
const textDescriptionsField = document.querySelector('.text__description');
const slider = document.querySelector('.effect-level__slider');


const closeModal = () => {
  imgEditForm.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFile.value = '';
  imgPreview.style.filter = '';
  imgPreview.className = '';
  imgPreview.style.transform = `scale(${1})`;
  scaleControl.value = PREVIEW_SCALE_MAX;
  removeScaleListeners();
  removeEffectsListener();
  buttonUploadCancel.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', onModalEsc);
  form.removeEventListener('submit', isValid);
};

const openModal = () => {
  imgEditForm.classList.remove('hidden');
  body.classList.add('modal-open');
  slider.classList.add('hidden');
  addScaleListeners();
  addEffectsListener();
  buttonUploadCancel.addEventListener('click', closeModal);
  document.addEventListener('keydown', onModalEsc);
  form.addEventListener('submit', isValid);
};

function onModalEsc(evt) {
  if (evt.key !== KEY.ESCAPE) {
    return;
  }
  if (textHashtagsField !== document.activeElement && textDescriptionsField !== document.activeElement) {
    closeModal();
  }
}

const addUploadImageButtonListener = () => {
  uploadFile.addEventListener('change', openModal);
};


export {
  addUploadImageButtonListener
};
