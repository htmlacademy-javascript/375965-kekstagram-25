import { ESCAPE } from './constants.js';
import { onCloseOverlay } from './img-upload-form.js';

const documentBodyMainElement = document.querySelector('#body');

const showErrorConnectMessage = () => {
  const errorMessageTemplateElement = document.querySelector('#load-error').content.querySelector('.load-error');
  const errorConnectMessageFragment = document.createDocumentFragment();
  const errorConnectMessageElement = errorMessageTemplateElement.cloneNode(true);

  errorConnectMessageFragment.append(errorConnectMessageElement);
  documentBodyMainElement.append(errorConnectMessageElement);

  const errorConnectSectionElement = document.querySelector('.load-error');
  const checkConnectButtonElement = document.querySelector('.load-error__button');

  const distructConnectErrorMessage = () => {
    checkConnectButtonElement.removeEventListener('click', distructConnectErrorMessage);
    document.removeEventListener('click', onConnectErrorMessageOuterClick);
    document.removeEventListener('click', onConnectErrorMesageEscDown);
    errorConnectMessageElement.remove();
    onCloseOverlay();
  };

  function onConnectErrorMessageOuterClick(evt) {
    if (evt.target === errorConnectSectionElement) {
      distructConnectErrorMessage();
    }
  }

  function onConnectErrorMesageEscDown(evt) {
    if (evt.key === ESCAPE) {
      distructConnectErrorMessage();
    }
  }

  checkConnectButtonElement.addEventListener('click', distructConnectErrorMessage);
  errorConnectSectionElement.addEventListener('click', onConnectErrorMessageOuterClick);
  document.addEventListener('keydown', onConnectErrorMesageEscDown);
};

export { showErrorConnectMessage };
