import {getPictures} from './render-pictures.js';
import {getDescriptions} from './data.js';
getPictures();

const body = document.querySelector('body');
const commentCounter = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const fullScreenDisplay = document.querySelector('.big-picture');
const viewPhoto = document.querySelector('.big-picture__img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const socialCommentsUl = document.querySelector('.social__comments');
const socialComments = document.querySelectorAll('.social__comment');
const buttonCancel = document.querySelector('.big-picture__cancel');

// Функция ниже отображает показ картинки в полном размере в разметке

const getFullSizeImage = () => {
  for (let j = 0; j < socialComments.length; j++) {
    socialComments[j].remove();
  }
  fullScreenDisplay.classList.remove('hidden');
  viewPhoto.querySelector('img').src = getDescriptions()[0].url;
  likesCount.textContent = getDescriptions()[0].likes;
  commentsCount.textContent = getDescriptions()[0].comments.length;
  for (let i = 0; i < getDescriptions()[0].comments.length; i++) {
    const li = document.createElement('li');
    li.classList.add('social__comment');
    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = getDescriptions()[0].comments[i].avatar;
    img.alt = getDescriptions()[0].comments[i].name;
    img.width = 35;
    img.height = 35;
    li.append(img);
    const p = document.createElement('p');
    p.classList.add('social__text');
    p.textContent = getDescriptions()[0].comments[i].message;
    li.append(p);
    socialCommentsUl.append(li);
  }
  buttonCancel.addEventListener('click', (evt) => {
    evt.preventDefault();
    fullScreenDisplay.classList.add('hidden');
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {fullScreenDisplay.classList.add('hidden');}
  });
  commentCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.add('modal-open');
};

export {getFullSizeImage};
