import {
  KEY,
  HASHTAGS_PATTERN,
  MAX_HASHTAGS_AMOUNT,
  MAX_HASHTAG_LENGTH,
  HASH,
  ERROR
} from './data.js';


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
const slider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');
// Открытие редактирования
const openModal = () => {
  imgEditForm.classList.remove('hidden');
  body.classList.add('modal-open');
  slider.classList.add('hidden');
};

// Закрытие редактирования
const closeModal = () => {
  imgEditForm.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFile.value = '';
  imgPreview.style.filter = '';
  imgPreview.className = '';
};

// Закрытие редактирования на ESC
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
buttonUploadCancel.addEventListener('click', closeModal);
document.addEventListener('keydown', onModalEsc);

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

  const hasDublicates = () => {
    hashtags.forEach((hashtag) => {
      const hashtagsLowLetters = [];
      const hashtagLowLetters = hashtag.toLowerCase();
      for (let i = 0; i < hashtags.length; i++) {
        hashtagsLowLetters.push(hashtags[i].toLowerCase());
      }
      if (hashtagsLowLetters.filter((i) => i === hashtagLowLetters).length > 1) {
        addError(ERROR.repeatHashtag);
      }
    });
  };

  const isValidSymbols = () => {
    let errorConter = 0;
    hashtags.forEach((hashtag) => {
      if (!HASHTAGS_PATTERN.test(hashtag) && textHashtagsField.value.length !== 0) {
        addError(ERROR.badSymbols);
        errorConter++;
      }
    });
    if (errorConter === 0) {
      hasDublicates();
    }
  };

  const checkHashtagLength = () => {
    let errorConter = 0;
    hashtags.forEach((hashtag) => {
      if (hashtag.length > MAX_HASHTAG_LENGTH) {
        addError(ERROR.longHashtag);
        errorConter++;
      }
    });
    if (errorConter === 0) {
      isValidSymbols();
    }
  };

  const checkHashtagsAmount = () => {
    if (hashtags.length > MAX_HASHTAGS_AMOUNT) {
      addError(ERROR.manyHashtags);
    } else {
      checkHashtagLength();
    }
  };

  const checkHashtagsSpace = () => {
    let errorConter = 0;
    hashtags.forEach((hashtag) => {
      if (hashtag.indexOf(HASH, 1) >= 1) {
        addError(ERROR.noSpace);
        errorConter++;
      }
    });
    if (errorConter === 0) {
      checkHashtagsAmount();
    }
  };

  const checkCompleteHash = () => {
    let errorConter = 0;
    hashtags.forEach((hashtag) => {
      if (hashtag.split('')[0] === HASH && hashtag.split('').length === 1) {
        addError(ERROR.emptyHashtag);
        errorConter++;
      }
    });
    if (errorConter === 0) {
      checkHashtagsSpace();
    }
  };

  const checkHash = () => {
    let errorCounter = 0;
    hashtags.forEach((hashtag) => {
      if (hashtag.split('')[0] !== HASH && textHashtagsField.value.length !== 0) {
        addError(ERROR.missingHash);
        errorCounter++;
      }
    });
    if (errorCounter === 0) {
      checkCompleteHash();
    }
  };

  checkHash();

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
  if (scaleControl.value !== '25%') {
    scaleControlToNumber -= 25;
    scaleControl.value = `${scaleControlToNumber  }%`;
    imgPreview.style.transform = `scale(${  scaleControlToNumber/100  })`;
  }
});


// Эффекты изображения: (сделал раньше времени)

noUiSlider.create(slider, {
  connect: 'lower',
  range: {
    'min': 0,
    'max': 1
  },
  start: 1,
  step: 0.1,
});

const checkPreviewNone = () => {
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

effects.forEach((effect) => {
  effect.addEventListener('change', () => {
    setupEffect(effect);
    checkPreviewNone();
    if (imgPreview.classList.contains('effects__preview--chrome')) {
      slider.noUiSlider.updateOptions({
        connect: 'lower',
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      slider.noUiSlider.on('update', () => {
        effectLevel.value = slider.noUiSlider.get();
        imgPreview.style.filter = `grayscale(${effectLevel.value})`;
      });
    }
    if (imgPreview.classList.contains('effects__preview--sepia')) {
      slider.noUiSlider.updateOptions({
        connect: 'lower',
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      slider.noUiSlider.on('update', () => {
        effectLevel.value = slider.noUiSlider.get();
        imgPreview.style.filter = `sepia(${effectLevel.value})`;
      });
    }
    if (imgPreview.classList.contains('effects__preview--marvin')) {
      slider.noUiSlider.updateOptions({
        connect: 'lower',
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      slider.noUiSlider.on('update', () => {
        effectLevel.value = slider.noUiSlider.get();
        imgPreview.style.filter = `invert(${effectLevel.value}%)`;
      });
    }
    if (imgPreview.classList.contains('effects__preview--phobos')) {
      slider.noUiSlider.updateOptions({
        connect: 'lower',
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      slider.noUiSlider.on('update', () => {
        effectLevel.value = slider.noUiSlider.get();
        imgPreview.style.filter = `blur(${effectLevel.value}px)`;
      });
    }
    if (imgPreview.classList.contains('effects__preview--heat')) {
      slider.noUiSlider.updateOptions({
        connect: 'lower',
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      slider.noUiSlider.on('update', () => {
        effectLevel.value = slider.noUiSlider.get();
        imgPreview.style.filter = `brightness(${effectLevel.value})`;
      });
    }
  });
});

// effects.forEach((effect) => {
//   effect.addEventListener('change', () => {
//     setupEffect(effect);
//     checkPreviewNone();
//     if (imgPreview.classList.contains('effects__preview--chrome')) {
//       slider.noUiSlider.updateOptions({
//         connect: 'lower',
//         range: {
//           min: 0,
//           max: 1,
//         },
//         start: 1,
//         step: 0.1,
//       });
//       slider.noUiSlider.on('update', () => {
//         effectLevel.value = slider.noUiSlider.get();
//         imgPreview.style.filter = `grayscale(${effectLevel.value})`;
//       });
//     }
//     if (imgPreview.classList.contains('effects__preview--sepia')) {
//       slider.noUiSlider.updateOptions({
//         connect: 'lower',
//         range: {
//           min: 0,
//           max: 1,
//         },
//         start: 1,
//         step: 0.1,
//       });
//       slider.noUiSlider.on('update', () => {
//         effectLevel.value = slider.noUiSlider.get();
//         imgPreview.style.filter = `sepia(${effectLevel.value})`;
//       });
//     }
//     if (imgPreview.classList.contains('effects__preview--marvin')) {
//       slider.noUiSlider.updateOptions({
//         connect: 'lower',
//         range: {
//           min: 0,
//           max: 100,
//         },
//         start: 100,
//         step: 1,
//       });
//       slider.noUiSlider.on('update', () => {
//         effectLevel.value = slider.noUiSlider.get();
//         imgPreview.style.filter = `invert(${effectLevel.value}%)`;
//       });
//     }
//     if (imgPreview.classList.contains('effects__preview--phobos')) {
//       slider.noUiSlider.updateOptions({
//         connect: 'lower',
//         range: {
//           min: 0,
//           max: 3,
//         },
//         start: 3,
//         step: 0.1,
//       });
//       slider.noUiSlider.on('update', () => {
//         effectLevel.value = slider.noUiSlider.get();
//         imgPreview.style.filter = `blur(${effectLevel.value}px)`;
//       });
//     }
//     if (imgPreview.classList.contains('effects__preview--heat')) {
//       slider.noUiSlider.updateOptions({
//         connect: 'lower',
//         range: {
//           min: 1,
//           max: 3,
//         },
//         start: 3,
//         step: 0.1,
//       });
//       slider.noUiSlider.on('update', () => {
//         effectLevel.value = slider.noUiSlider.get();
//         imgPreview.style.filter = `brightness(${effectLevel.value})`;
//       });
//     }
//   });
// });

export {
  addUploadImageButtonListener
};
