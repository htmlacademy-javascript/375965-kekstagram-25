import { renderPictures } from './render-pictures.js';
import { initModalPopup } from './init-modal-popup.js';
import { imgDownloadOverlay, onCloseOverlay, setUserFormSubmit } from './img-upload-form.js';
import { getData, } from './api.js';

getData((posts) => {
  renderPictures(posts);
  initModalPopup(posts);
});

imgDownloadOverlay();
setUserFormSubmit(onCloseOverlay);
// правильно ли передавать onCloseOverlay
// где сбрасывается форма с postUploadForm.reset();?
