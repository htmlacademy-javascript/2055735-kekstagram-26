import {
  getPhotos
} from './photos.js';
import {
  showPhotos
} from './show-photos.js';
import {
  addUploadImageButtonListener
} from './form.js';

const photos = getPhotos();
showPhotos(photos);

addUploadImageButtonListener();
console.log(test)
