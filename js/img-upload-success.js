import { onCloseOverlay } from './img-upload-form.js';
import { ESCAPE } from './constants.js';

const documentBodyMainElement = document.querySelector('#body');
const postUploadFormElement = document.querySelector('#upload-select-image');

const showSuccessMessage = () => {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessageFragment = document.createDocumentFragment();
  const successMessageElement = successMessageTemplate.cloneNode(true);

  successMessageFragment.append(successMessageElement);
  documentBodyMainElement.append(successMessageFragment);

  const successSectionElement = document.querySelector('.success');
  const successSectionButtonElement = document.querySelector('.success__button');

  const distructSuccessMessage = () => {
    document.removeEventListener('click', onSuccessMessageOuterAreaClick);
    document.removeEventListener('keydown', onSuccessMessageEscapeDown);
    successSectionButtonElement.removeEventListener('click', distructSuccessMessage);
    successMessageElement.remove();
    postUploadFormElement.reset();
    onCloseOverlay();
  };

  function onSuccessMessageOuterAreaClick(evt) {
    if (evt.target === successSectionElement) {
      distructSuccessMessage();
    }
  }

  function onSuccessMessageEscapeDown(evt) {
    if (evt.key === ESCAPE) {
      distructSuccessMessage();
    }
  }

  successSectionButtonElement.addEventListener('click', distructSuccessMessage);
  document.addEventListener('click', onSuccessMessageOuterAreaClick);
  document.addEventListener('keydown', onSuccessMessageEscapeDown);
};

export { showSuccessMessage };
