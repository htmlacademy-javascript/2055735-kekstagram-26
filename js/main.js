import { getPhotos } from './photos.js';
import { createPictures } from './render-pictures.js';
import { addUploadImageButtonListener } from './form.js';

const photos = getPhotos();
createPictures(photos);

addUploadImageButtonListener();
