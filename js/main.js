import { renderPictures, setFilterButton } from './render-pictures.js';
import { initModalPopup } from './init-modal-popup.js';
import { uploadForm } from './img-upload-form.js';
import { getData } from './api.js';
import { debounce } from './util.js';
import { RERENDER_DELAY } from './constants.js';

getData((posts) => {
  renderPictures(posts);
  setFilterButton(debounce(() => renderPictures(posts), RERENDER_DELAY,
  ));
  initModalPopup(posts);
});

uploadForm();
