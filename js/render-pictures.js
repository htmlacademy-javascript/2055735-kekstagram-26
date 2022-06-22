import {getDescriptions} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const template = document.querySelector('#picture').content;
const templateContent = template.querySelector('.picture');

// Функция ниже отображает картинки в разметке

const getPictures = () => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < getDescriptions().length; i++){
    const picture = templateContent.cloneNode(true);
    picture.querySelector('.picture__img').src = getDescriptions()[i].url;
    picture.querySelector('.picture__likes').textContent = getDescriptions()[i].likes;
    picture.querySelector('.picture__comments').textContent = getDescriptions()[i].comments.length;
    fragment.append(picture);
  }
  picturesContainer.append(fragment);
};


export {getPictures};
