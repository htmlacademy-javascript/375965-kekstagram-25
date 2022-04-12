import { onCloseOverlay } from './img-upload-form.js';
import { resetFilter } from './filter-control.js';
import { ESCAPE } from './constants.js';

const documentBodyMainElement = document.querySelector('#body');
const postUploadFormElement = document.querySelector('#upload-select-image');

const showErrorMessage = () => {
  const errorMessageTemplateElement = document.querySelector('#error').content.querySelector('.error');
  const errorMessageFragment = document.createDocumentFragment();
  const errorMessageElement = errorMessageTemplateElement.cloneNode(true);

  errorMessageFragment.append(errorMessageElement);
  documentBodyMainElement.append(errorMessageElement);

  const errorSectionElement = document.querySelector('.error');
  const uploadOtherFileButtonElement = document.querySelector('.error__button');

  function distructErrorMessage() {
    uploadOtherFileButtonElement.removeEventListener('click', distructErrorMessage);
    document.removeEventListener('click', onErrorMessageOuterClick);
    document.removeEventListener('keydown', onErrorMessageEscapeDown);
    errorMessageElement.remove();
    postUploadFormElement.reset();
    resetFilter();
    onCloseOverlay();
  }

  function onErrorMessageOuterClick(evt) {
    if (evt.target === errorSectionElement) {
      distructErrorMessage();
    }
  }

  function onErrorMessageEscapeDown(evt) {
    if (evt.key === ESCAPE) {
      distructErrorMessage();
    }
  }

  uploadOtherFileButtonElement.addEventListener('click', distructErrorMessage);
  errorSectionElement.addEventListener('click', onErrorMessageOuterClick);
  document.addEventListener('keydown', onErrorMessageEscapeDown);
};

export { showErrorMessage };
