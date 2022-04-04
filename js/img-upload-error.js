import { onCloseOverlay } from './img-upload-form.js';

const documentBody = document.querySelector('#body');
const postUploadForm = document.querySelector('#upload-select-image');

const showErrorMessage = () => {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessageFragment = document.createDocumentFragment();
  const errorMessageElement = errorMessageTemplate.cloneNode(true);

  errorMessageFragment.append(errorMessageElement);
  documentBody.append(errorMessageElement);

  const errorSectionElement = document.querySelector('.error');
  const uploadOtherFileButton = document.querySelector('.error__button');

  function distructErrorMessage() {
    uploadOtherFileButton.removeEventListener('click', distructErrorMessage);
    document.removeEventListener('click', onErrorMessageOuterClick);
    document.removeEventListener('keydown', onErrorMessageEscapeDown);
    errorMessageElement.remove();
    postUploadForm.reset();
    location.reload();
    onCloseOverlay();
  }

  function onErrorMessageOuterClick(evt) {
    if (evt.target === errorSectionElement) {
      distructErrorMessage();
    }
  }

  function onErrorMessageEscapeDown(evt) {
    if (evt.key === 'Escape') {
      distructErrorMessage();
    }
  }

  uploadOtherFileButton.addEventListener('click', distructErrorMessage);
  errorSectionElement.addEventListener('click', onErrorMessageOuterClick);
  document.addEventListener('keydown', onErrorMessageEscapeDown);
};

export { showErrorMessage };
