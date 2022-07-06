import {
  HASHTAGS_PATTERN,
  MAX_HASHTAGS_AMOUNT,
  MAX_HASHTAG_LENGTH,
  HASH,
  Error,
} from './data.js';

const textHashtagsField = document.querySelector('.text__hashtags');
const template = document.querySelector('#validate-error').content;
const templateContent = template.querySelector('div');
const hashtagsContainer = document.querySelector('.img-upload__field-wrapper');
const validateError = templateContent.cloneNode(true);

const removeError = () => {
  hashtagsContainer.removeChild(validateError);
  hashtagsContainer.classList.remove('has-danger');
  textHashtagsField.removeEventListener('keydown', removeError);
};

const addError = (errorName) => {
  hashtagsContainer.append(validateError);
  hashtagsContainer.classList.add('has-danger');
  textHashtagsField.addEventListener('keydown', removeError);
  validateError.textContent = errorName;
};

const hasNoHashError = (hashtag) => {
  if (hashtag.split('')[0] !== HASH) {
    return true;
  }
};
const hasIncompleteError = (hashtag) => {
  if (hashtag.split('')[0] === HASH && hashtag.split('').length === 1) {
    return true;
  }
};
const hasNoSpaceError = (hashtag) => {
  const letters = hashtag.split('');
  if (letters.filter((letter) => letter === HASH).length > 1) {
    return true;
  }
};
const hasExcessHashtagsCountError = (hashtags) => {
  if (hashtags.length > MAX_HASHTAGS_AMOUNT) {
    return true;
  }
};
const hasHashtagLengthError = (hashtag) => {
  if (hashtag.length > MAX_HASHTAG_LENGTH) {
    return true;
  }
};
const hasInvalidSymbolsError = (hashtag) => {
  if (!HASHTAGS_PATTERN.test(hashtag)) {
    return true;
  }
};

const hasDublicatesError = (hashtags, hashtag) => {
  const lowerСaseHashtag = hashtag.toLowerCase();
  const lowerСaseHashtags = hashtags.map((oneHashtag) => oneHashtag.toLowerCase());
  if (lowerСaseHashtags.filter((j) => j === lowerСaseHashtag).length > 1) {
    return true;
  }
};

const isValid = (evt) => {
  evt.preventDefault();
  const textHashtagsFieldElements = textHashtagsField.value.split(' ');
  const hashtags = textHashtagsFieldElements.filter((word) => word.length >= 1);
  hashtags.forEach((hashtag) => {
    if (hasNoHashError(hashtag) === true) {
      addError(Error.missingHash);
      return;
    }
    if (hasIncompleteError(hashtag) === true) {
      addError(Error.emptyHashtag);
      return;
    }
    if (hasNoSpaceError(hashtag) === true) {
      addError(Error.noSpace);
      return;
    }
    if (hasHashtagLengthError(hashtag) === true) {
      addError(Error.longHashtag);
      return;
    }
    if (hasDublicatesError(hashtags, hashtag) === true) {
      addError(Error.repeatHashtag);
      return;
    }
    if (hasExcessHashtagsCountError(hashtags) === true) {
      addError(Error.manyHashtags);
      return;
    }
    if (hasInvalidSymbolsError(hashtag) === true) {
      addError(Error.badSymbols);
    }
  });
};

export {
  isValid
};
