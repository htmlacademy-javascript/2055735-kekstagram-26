const esc = { key: 'Escape' };
const regular = /^#[A-Za-zA-Яа-яЁё0-9]{1,999}$/;
const maxHashtagsLength = 5;
const hash = '#';
const errors = {
  manyHashtags: 'Введено больше 5 хештегов',
  badSymbols: 'Хэштег должен содержать в себе буквы или цифры',
  missingGrille: 'Хэштег должен начинаться с #',
  noCompleteHashtag: 'Не дописан хэштег',
  noSpace: 'Хештеги должны быть разделены пробелом',
  longHashtag: 'Хэштег не может быть длиннее 20 символов',
  repeatHashtag: 'Хэштеги не должны повторяться',
  noImage: 'Не загружено изображение'
};
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
const validateError = templateContent.cloneNode(true);

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
  if (evt.key === esc.key) {
    if (textHashtags !== document.activeElement && textDescriptions !== document.activeElement) {
      closeModal();
    }
  }
}

const addFormListenners = () => {
  const addUploadImageButtonListener = () => {
    uploadFile.addEventListener('change', openModal);
  };
  addUploadImageButtonListener();
  buttonUploadCancel.addEventListener('click', closeModal);
  document.addEventListener('keydown', onModalEsc);
};

// Валидация

// Удаление ошибки при невалидной валидации
const removeError = () => {
  containerHashtags.removeChild(validateError);
  containerHashtags.classList.remove('has-danger');
  textHashtags.removeEventListener('keydown', removeError);
};
// Добавление ошибки при невалидной валидации
const addError = (errorName) => {
  containerHashtags.append(validateError);
  containerHashtags.classList.add('has-danger');
  textHashtags.addEventListener('keydown', removeError);
  validateError.textContent = errorName;
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const hashtags = textHashtags.value.split(' ');
  hashtags.forEach((hashtag) => {
    if (hashtags.length > maxHashtagsLength) {
      addError(errors.manyHashtags);
    }
    if(!regular.test(hashtag) && textHashtags.value.length !== 0){
      addError(errors.badSymbols);
    }
    if (hashtag.split('')[0] !== hash && textHashtags.value.length !== 0) {
      addError(errors.missingGrille);
    }
    if (hashtag.split('')[0] === hash && hashtag.split('').length === 1) {
      addError(errors.noCompleteHashtag);
    }
    if (hashtag.indexOf('#', 1) >= 1) {
      addError(errors.noSpace);
    }
    if (hashtag.length > 20) {
      addError(errors.longHashtag);
    }
    const hashtagsLowLetters = [];
    const hashtagLowLetters = hashtag.toLowerCase();
    for (let i = 0; i < hashtags.length; i++){
      hashtagsLowLetters.push(hashtags[i].toLowerCase());
    }
    if (hashtagsLowLetters.filter((i) => i === hashtagLowLetters).length > 1) {
      addError(errors.repeatHashtag);
    }
  });
});


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

export { addFormListenners };
