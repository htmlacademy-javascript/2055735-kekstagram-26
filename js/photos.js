import {
  getRandomNumber
} from './util.js';

import {
  MESSAGES,
  NAMES,
  PHOTOS_AMOUNT,
  COMMENTS_AMOUNT
} from './data.js';


const getComments = () => {
  const comments = [];
  for (let i = 0; i < COMMENTS_AMOUNT; i++) {
    const comment = {};
    comment.id = i + 1;
    comment.avatar = `img/avatar-${getRandomNumber(1, 6)}.svg`;
    comment.message = MESSAGES[getRandomNumber(0, MESSAGES.length - 1)];
    comment.name = NAMES[getRandomNumber(0, NAMES.length - 1)];
    comments.push(comment);
  }
  return comments;
};

const getPhotos = () => {
  const photos = [];
  for (let i = 0; i < PHOTOS_AMOUNT; i++) {
    photos[i] = {};
    photos[i].id = i + 1;
    photos[i].url = `photos/${i + 1}.jpg`;
    photos[i].description = 'Описание к фото';
    photos[i].likes = getRandomNumber(15, 200);
    photos[i].comments = getComments();
  }
  return photos;
};

export {
  getPhotos,
  getComments
};
