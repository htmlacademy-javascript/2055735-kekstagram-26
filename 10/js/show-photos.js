import {
  showFullSizeImage,
} from './full-size-image.js';

// Функция ниже отображает картинки в разметке
const showPhotos = (photos) => {
  const picturesContainer = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content;
  const templateContent = template.querySelector('.picture');
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < photos.length; i++) {
    const picture = templateContent.cloneNode(true);
    picture.querySelector('.picture__img').src = photos[i].url;
    picture.querySelector('.picture__likes').textContent = photos[i].likes;
    picture.querySelector('.picture__comments').textContent = photos[i].comments.length;
    fragment.append(picture);

    picture.addEventListener('click', () => {
      showFullSizeImage(photos[i]);
    });
  }
  picturesContainer.append(fragment);
};


export {
  showPhotos
};
