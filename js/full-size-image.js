const body = document.querySelector('body');
const commentCounter = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const fullScreenDisplay = document.querySelector('.big-picture');
const viewPhoto = document.querySelector('.big-picture__img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const socialCommentsUl = document.querySelector('.social__comments');
const buttonCancel = document.querySelector('.big-picture__cancel');


const onModalEsc = (event) => {
  if (event.key === 'Escape'){
    closeModal();
  }

};

const openModal = () => {
  fullScreenDisplay.classList.remove('hidden');
  commentCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onModalEsc);
};

function closeModal () {
  fullScreenDisplay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEsc);
}

// Функция ниже отображает в разметке показ картинки в полном размере

const getFullSizeImage = (photo) => {
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
    img.width = 35;
    img.height = 35;
    li.append(img);
    const p = document.createElement('p');
    p.classList.add('social__text');
    p.textContent = comment.message;
    li.append(p);
    socialCommentsUl.append(li);
  });

  openModal();
  buttonCancel.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeModal();
  });
};

export {getFullSizeImage};
