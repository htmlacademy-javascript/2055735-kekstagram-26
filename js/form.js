const imgEditForm = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleControl = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');
const uploadFile = document.querySelector('#upload-file');
const buttonUploadCancel = document.querySelector('#upload-cancel');
const effects = document.querySelectorAll('.effects__radio');
const form = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const textDescriptions = document.querySelector('.text__description');
const template = document.querySelector('#validate-error').content;
const templateContent = template.querySelector('div');
const containerHashtags = document.querySelector('.img-upload__field-wrapper');

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
    if (textHashtags !== document.activeElement && textDescriptions !== document.activeElement) {
      closeModal();
    }
  }
}

// Вызов открытия редактирования при загрузке картинки
const getNewImageForm = () => {
  uploadFile.addEventListener('change', openModal);
};

// Вызов закрытия редактирования при клике на крестик
buttonUploadCancel.addEventListener('click', closeModal);

// Вызов закрытия редактирования при нажатии ESC
document.addEventListener('keydown', onModalEsc);

// Масштаб изображения: (сделал раньше времени)
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


// Эффекты изображения: (сделал раньше времени)
effects.forEach((effect) => {
  effect.addEventListener('change', () => {
    imgPreview.className = '';
    imgPreview.classList.add(`effects__preview--${  effect.value}`);
  });
});


// Валидация по pristine.js
new Pristine(form, {
  classTo: 'hashtags-comments-form__element',
  errorTextParent: 'hashtags-comments-form__element',
  errorClass: 'has-danger'
});

// Валидация
const validateError = templateContent.cloneNode(true);
form.addEventListener('submit', (evt) => {

  const hashtagsArray = textHashtags.value.split(' ');
  if (hashtagsArray.length > 5) {
    validateError.textContent = 'Введено больше 5 хештегов';
    addError();
    evt.preventDefault();
  }
  let helper = 1;
  hashtagsArray.forEach((hashtag) => {
    const regular = /^#[A-Za-zA-Яа-яЁё0-9]{1,999}$/;
    if(!regular.test(hashtag) && typeof hashtag.split('')[0] !== 'undefined'){
      validateError.textContent = 'Хэштег должен содержать в себе буквы или цифры';
      addError();
      evt.preventDefault();
    }
    if (hashtag.split('')[0] !== '#' && typeof hashtag.split('')[0] !== 'undefined') {
      validateError.textContent = 'Хэштег должен начинаться с #';
      addError();
      evt.preventDefault();
    }
    if (hashtag.split('')[0] === '#' && hashtag.split('').length === 1) {
      validateError.textContent = 'Не дописан хэштег';
      addError();
      evt.preventDefault();
    }
    if (hashtag.indexOf('#', 1) >= 1) {
      validateError.textContent = 'Хештеги должны быть разделены пробелом';
      addError();
      evt.preventDefault();
    }
    if (hashtag.length > 20) {
      validateError.textContent = 'Хэштег не может быть длиннее 20 символов';
      addError();
      evt.preventDefault();
    }
    let repeatСounter = 0;
    for (let i = helper; i < hashtagsArray.length; i++){
      if (hashtag.toLowerCase() === hashtagsArray[i].toLowerCase()) {
        repeatСounter++;
      }
    }
    helper++;
    if (repeatСounter === 1) {
      validateError.textContent = 'Хэштеги не должны повторяться';
      addError();
      evt.preventDefault();
      repeatСounter = 0;
    }
  });
});

// Добавление ошибки при невалидной валидации
function addError() {
  containerHashtags.append(validateError);
  containerHashtags.classList.add('has-danger');
  textHashtags.addEventListener('keydown', removeError);
}

// Удаление ошибки при невалидной валидации
function removeError () {
  containerHashtags.removeChild(validateError);
  containerHashtags.classList.remove('has-danger');
  textHashtags.removeEventListener('keydown', removeError);
}

export { getNewImageForm };
