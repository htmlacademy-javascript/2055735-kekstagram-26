import {
  HASHTAGS_PATTERN,
  MAX_HASHTAGS_AMOUNT,
  MAX_HASHTAG_LENGTH,
  HASH,
  ERROR,
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

const hasNoHashError = (hashtags) => {
  for (let i = 0; i < hashtags.length; i++) {
    if (hashtags[i].split('')[0] !== HASH) {
      return true;
    }
  }
};
const hasIncompleteError = (hashtags) => {
  for (let i = 0; i < hashtags.length; i++) {
    if (hashtags[i].split('')[0] === HASH && hashtags[i].split('').length === 1) {
      return true;
    }
  }
};
const hasNoSpaceError = (hashtags) => {
  for (let i = 0; i < hashtags.length; i++) {
    const letters = hashtags[i].split('');
    if (letters.filter((letter) => letter === HASH).length > 1) {
      return true;
    }
  }
};
const hasExcessHashtagsCountError = (hashtags) => {
  if (hashtags.length > MAX_HASHTAGS_AMOUNT) {
    return true;
  }
};
const hasHashtagLengthError = (hashtags) => {
  for (let i = 0; i < hashtags.length; i++) {
    if (hashtags[i].length > MAX_HASHTAG_LENGTH) {
      return true;
    }
  }
};
const hasInvalidSymbolsError = (hashtags) => {
  for (let i = 0; i < hashtags.length; i++) {
    if (!HASHTAGS_PATTERN.test(hashtags[i])) {
      return true;
    }
  }
};
const hasDublicatesError = (hashtags) => {
  for (let i = 0; i < hashtags.length; i++) {
    const lowerСaseHashtag = hashtags[i].toLowerCase();
    const lowerСaseHashtags = hashtags.map((oneHashtag) => oneHashtag.toLowerCase());
    if (lowerСaseHashtags.filter((j) => j === lowerСaseHashtag).length > 1) {
      return true;
    }
  }
};

const isValid = (hashtags) => {
  if (hasNoHashError(hashtags) === true) {
    addError(ERROR.missingHash);
    return;
  }
  if (hasIncompleteError(hashtags) === true) {
    addError(ERROR.emptyHashtag);
    return;
  }
  if (hasNoSpaceError(hashtags) === true) {
    addError(ERROR.noSpace);
    return;
  }
  if (hasHashtagLengthError(hashtags) === true) {
    addError(ERROR.longHashtag);
    return;
  }
  if (hasDublicatesError(hashtags) === true) {
    addError(ERROR.repeatHashtag);
    return;
  }
  if (hasExcessHashtagsCountError(hashtags) === true) {
    addError(ERROR.manyHashtags);
    return;
  }
  if (hasInvalidSymbolsError(hashtags) === true) {
    addError(ERROR.badSymbols);
  }
};

export {
  isValid
};
