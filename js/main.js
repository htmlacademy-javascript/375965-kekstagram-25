import { renderPictures } from './render-pictures.js';
import { initModalPopup } from './init-modal-popup.js';
import { uploadForm } from './img-upload-form.js';
import { getData, } from './api.js';

getData((posts) => {
  renderPictures(posts);
  initModalPopup(posts);
});

uploadForm();
