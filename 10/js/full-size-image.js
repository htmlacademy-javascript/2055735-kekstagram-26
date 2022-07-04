import {
  SHOWN_COMMENTS_AMOUNT,
  AVATAR_DIMENSION
} from './data.js';


const body = document.querySelector('body');
const commentsLoaderButton = document.querySelector('.comments-loader');
const fullScreenDisplay = document.querySelector('.big-picture');
const viewPhoto = document.querySelector('.big-picture__img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const socialCommentsContainer = document.querySelector('.social__comments');
const buttonCancel = document.querySelector('.big-picture__cancel');
const commentsShownCount = document.querySelector('.comments-count-show');

const onModalEsc = (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
};

const openModal = () => {
  fullScreenDisplay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onModalEsc);
};

function closeModal() {
  fullScreenDisplay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEsc);
  commentsLoaderButton.classList.remove('hidden');
  commentsShownCount.textContent = SHOWN_COMMENTS_AMOUNT;
}


const loadComments = () => {
  const comments = socialCommentsContainer.querySelectorAll('li');
  let newCommentCounter = 0;
  comments.forEach((comment) => {
    if (comment.classList.contains('hidden') && newCommentCounter !== SHOWN_COMMENTS_AMOUNT) {
      comment.classList.remove('hidden');
      newCommentCounter++;
      commentsShownCount.textContent = Number(commentsShownCount.textContent) + 1;
    }
  });
  newCommentCounter = 0;
  if (commentsShownCount.textContent === commentsCount.textContent) {
    commentsLoaderButton.classList.add('hidden');
  }
};

const showFullSizeImage = (photo) => {
  socialCommentsContainer.innerHTML = null;
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
    img.width = AVATAR_DIMENSION.WIDTH;
    img.height = AVATAR_DIMENSION.HEIGHT;
    li.append(img);
    const p = document.createElement('p');
    p.classList.add('social__text');
    p.textContent = comment.message;
    li.append(p);
    if (socialCommentsContainer.children.length >= SHOWN_COMMENTS_AMOUNT) {
      li.classList.add('hidden');
    }
    socialCommentsContainer.append(li);
  });
  commentsLoaderButton.addEventListener('click', loadComments);
  openModal();
  buttonCancel.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeModal();
  });
};


export {
  showFullSizeImage
};
