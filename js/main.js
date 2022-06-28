import {getDescriptions} from './data.js';
import {getPictures} from './render-pictures.js';


const photos = getDescriptions();
getPictures(photos);


const imgEditForm = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleControl = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');
const uploadFile = document.querySelector('#upload-file');
const buttonUploadCancel = document.querySelector('#upload-cancel');
const effects = document.querySelectorAll('.effects__radio');

// Открытие редактирования
const openModal = () => {
  imgEditForm.classList.remove('hidden');
  body.classList.add('modal-open');
};

// Закрытие редактирования
const closeModal = () => {
  imgEditForm.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFile.value = '';
};

// Закрытие редактирования на ESC
function onModalEsc (evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
}

uploadFile.addEventListener('change', openModal);

buttonUploadCancel.addEventListener('click', closeModal);

document.addEventListener('keydown', onModalEsc);

// Масштаб изображения:
let scaleControlToNumber = Number(scaleControl.value.slice(0, -1));

scaleBiggerButton.addEventListener('click', () => {
  if (scaleControl.value !== '100%') {
    scaleControlToNumber += 25;
    scaleControl.value = `${scaleControlToNumber}%`;
    imgPreview.style.transform = `scale(${  scaleControlToNumber/100  })`;
  }
});

scaleSmallerButton.addEventListener('click', () => {
  if (scaleControl.value !== '25%'){
    scaleControlToNumber -= 25;
    scaleControl.value = `${scaleControlToNumber  }%`;
    imgPreview.style.transform = `scale(${  scaleControlToNumber/100  })`;
  }
});

// Эффекты изображения:

effects.forEach((effect) => {
  effect.addEventListener('change', () => {
    imgPreview.className = '';
    imgPreview.classList.add(`effects__preview--${  effect.value}`);
    console.log(imgPreview.classList)
  });
});
