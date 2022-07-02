import { COMMENTS_SHOW_AMOUNT } from './data.js';
import { AVATAR_WIDTH } from './data.js';
import { AVATAR_HEIGHT } from './data.js';

const body = document.querySelector('body');
const commentsLoaderButton = document.querySelector('.comments-loader');
const fullScreenDisplay = document.querySelector('.big-picture');
const viewPhoto = document.querySelector('.big-picture__img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const socialCommentsUl = document.querySelector('.social__comments');
const buttonCancel = document.querySelector('.big-picture__cancel');
const commentsShowCount = document.querySelector('.comments-count-show');

const onModalEsc = (event) => {
  if (event.key === 'Escape'){
    closeModal();
  }
};

const openModal = () => {
  fullScreenDisplay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onModalEsc);
};

function closeModal () {
  fullScreenDisplay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEsc);
  commentsLoaderButton.classList.remove('hidden');
  commentsShowCount.textContent = COMMENTS_SHOW_AMOUNT;
}


const loadComments = () => {
  const comments = socialCommentsUl.querySelectorAll('li');
  let newCommentCounter = 0;
  comments.forEach((comment) => {
    if (comment.classList.contains('hidden') && newCommentCounter !== COMMENTS_SHOW_AMOUNT) {
      comment.classList.remove('hidden');
      newCommentCounter++;
      commentsShowCount.textContent = Number(commentsShowCount.textContent) + 1;
    }
  });
  newCommentCounter = 0;
  if (commentsShowCount.textContent === commentsCount.textContent) {
    commentsLoaderButton.classList.add('hidden');
  }
};

const showFullSizeImage = (photo) => {
  socialCommentsUl.innerHTML = null;
  viewPhoto.querySelector('img').src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;

  photo.comments.forEach((comment) => {
    const li = document.createElement('li');
    li.classList.add('social__comment');
    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = comment.avatar;
    img.alt = comment.name;
    img.width = AVATAR_WIDTH;
    img.height = AVATAR_HEIGHT;
    li.append(img);
    const p = document.createElement('p');
    p.classList.add('social__text');
    p.textContent = comment.message;
    li.append(p);
    if (socialCommentsUl.children.length >= COMMENTS_SHOW_AMOUNT) {
      li.classList.add('hidden');
    }
    socialCommentsUl.append(li);
  });
  commentsLoaderButton.addEventListener('click', loadComments);
  openModal();
  buttonCancel.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeModal();
  });
};


export { showFullSizeImage };

