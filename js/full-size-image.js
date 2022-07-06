import {
  SHOWN_COMMENTS_AMOUNT,
  AvatarDimension,
  Key
} from './data.js';
import {
  getComments
} from './photos.js';


const body = document.querySelector('body');
const commentsLoaderButton = document.querySelector('.comments-loader');
const fullScreenDisplay = document.querySelector('.big-picture');
const viewPhoto = document.querySelector('.big-picture__img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const socialCommentsContainer = document.querySelector('.social__comments');
const buttonCancel = document.querySelector('.big-picture__cancel');
const commentsShownCount = document.querySelector('.comments-count-show');


const createComments = (comments) => {
  for (let i = 0; i < SHOWN_COMMENTS_AMOUNT; i++) {
    const li = document.createElement('li');
    li.classList.add('social__comment');
    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = comments[i].avatar;
    img.alt = comments[i].name;
    img.width = AvatarDimension.WIDTH;
    img.height = AvatarDimension.HEIGHT;
    li.append(img);
    const p = document.createElement('p');
    p.classList.add('social__text');
    p.textContent = comments[i].message;
    li.append(p);
    socialCommentsContainer.append(li);
  }
};

const showFullSizeImage = (photo) => {
  socialCommentsContainer.innerHTML = null;
  viewPhoto.querySelector('img').src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  createComments(getComments());
  openModal();

};
const loadComments = () => {
  createComments(getComments());
  commentsShownCount.textContent = Number(commentsShownCount.textContent) + SHOWN_COMMENTS_AMOUNT;
  if (commentsShownCount.textContent === commentsCount.textContent) {
    commentsLoaderButton.classList.add('hidden');
  }
};

const onModalEsc = (event) => {
  if (event.key === Key.ESCAPE) {
    closeModal();
  }
};

function openModal() {
  document.addEventListener('keydown', onModalEsc);
  buttonCancel.addEventListener('click', closeModal);
  commentsLoaderButton.addEventListener('click', loadComments);
  fullScreenDisplay.classList.remove('hidden');
  body.classList.add('modal-open');
}

function closeModal() {
  document.removeEventListener('keydown', onModalEsc);
  buttonCancel.removeEventListener('click', closeModal);
  commentsLoaderButton.removeEventListener('click', loadComments);
  fullScreenDisplay.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsLoaderButton.classList.remove('hidden');
  commentsShownCount.textContent = SHOWN_COMMENTS_AMOUNT;
}

export {
  showFullSizeImage,
};
