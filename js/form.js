const ESC = { key: 'Escape' };
const REGULAR = /^#[A-Za-zA-Яа-яЁё0-9]{1,999}$/;
const MAX_HASHTAGS_AMOUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const HASH = '#';
const ERRORS = {
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
const textHashtagsField = document.querySelector('.text__hashtags');
const textDescriptionsField = document.querySelector('.text__description');
const template = document.querySelector('#validate-error').content;
const templateContent = template.querySelector('div');
const hashtagsContainer = document.querySelector('.img-upload__field-wrapper');
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
  if (evt.key !== ESC.key) {
    return;
  }
  if (textHashtagsField !== document.activeElement && textDescriptionsField !== document.activeElement) {
    closeModal();
  }
}


const addUploadImageButtonListener = () => {
  uploadFile.addEventListener('change', openModal);
};
buttonUploadCancel.addEventListener('click', closeModal);
document.addEventListener('keydown', onModalEsc);


// Валидация

// Удаление ошибки при невалидной валидации
const removeError = () => {
  hashtagsContainer.removeChild(validateError);
  hashtagsContainer.classList.remove('has-danger');
  textHashtagsField.removeEventListener('keydown', removeError);
};
// Добавление ошибки при невалидной валидации
const addError = (errorName) => {
  hashtagsContainer.append(validateError);
  hashtagsContainer.classList.add('has-danger');
  textHashtagsField.addEventListener('keydown', removeError);
  validateError.textContent = errorName;
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const hashtags = textHashtagsField.value.split(' ');
  hashtags.forEach((hashtag) => {
    if (hashtags.length > MAX_HASHTAGS_AMOUNT) {
      addError(ERRORS.manyHashtags);
    }
    if(!REGULAR.test(hashtag) && textHashtagsField.value.length !== 0){
      addError(ERRORS.badSymbols);
    }
    if (hashtag.split('')[0] !== HASH && textHashtagsField.value.length !== 0) {
      addError(ERRORS.missingGrille);
    }
    if (hashtag.split('')[0] === HASH && hashtag.split('').length === 1) {
      addError(ERRORS.noCompleteHashtag);
    }
    if (hashtag.indexOf('#', 1) >= 1) {
      addError(ERRORS.noSpace);
    }
    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      addError(ERRORS.longHashtag);
    }
    const hashtagsLowLetters = [];
    const hashtagLowLetters = hashtag.toLowerCase();
    for (let i = 0; i < hashtags.length; i++){
      hashtagsLowLetters.push(hashtags[i].toLowerCase());
    }
    if (hashtagsLowLetters.filter((i) => i === hashtagLowLetters).length > 1) {
      addError(ERRORS.repeatHashtag);
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

export { addUploadImageButtonListener };
