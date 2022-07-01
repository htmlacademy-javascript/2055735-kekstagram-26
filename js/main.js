import {getPhotos} from './data.js';
import {createPictures} from './render-pictures.js';
import {addFormListenners} from './form.js';

const photos = getPhotos();
createPictures(photos);

addFormListenners();
