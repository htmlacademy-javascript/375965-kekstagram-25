import { renderPictures } from './render-pictures.js';
import { initModalPopup } from './init-modal-popup.js';
import { imgDownloadOverlay } from './img-upload-form.js';

fetch('https://25.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw Error(`${response.status} ${response.statusText}`);
  }).then((posts) => {
    renderPictures(posts);
    initModalPopup(posts);
  })
  .catch((err) => {
    onerror(err);
  });

imgDownloadOverlay();
