import {getDescriptions} from './data.js';
import {getPictures} from './render-pictures.js';
import {getNewImageForm} from './form.js';

const photos = getDescriptions();
getPictures(photos);

getNewImageForm();
