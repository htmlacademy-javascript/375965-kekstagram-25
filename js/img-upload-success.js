import { onCloseOverlay } from './img-upload-form.js';
import { resetFilter } from './filter-control.js';

const documentBody = document.querySelector('#body');
const imgUploadLogo = document.querySelector('.img-upload__label');
const postUploadForm = document.querySelector('#upload-select-image');

const showSuccessMessage = () => {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessageFragment = document.createDocumentFragment();
  const successMessageElement = successMessageTemplate.cloneNode(true);

  successMessageFragment.append(successMessageElement);
  documentBody.append(successMessageFragment);

  const successSectionElement = document.querySelector('.success');
  const successSectionButtonElement = document.querySelector('.success__button');

  function distructSuccessMessage() {
    document.removeEventListener('click', onSuccessMessageOuterAreaClick);
    document.removeEventListener('keydown', onSuccessMessageEscapeDown);
    successSectionButtonElement.removeEventListener('click', distructSuccessMessage);
    imgUploadLogo.classList.add('hidden');
    successMessageElement.remove();
    postUploadForm.reset();
    resetFilter();
    onCloseOverlay();
  }

  function onSuccessMessageOuterAreaClick(evt) {
    if (evt.target === successSectionElement) {
      distructSuccessMessage();
    }
  }

  function onSuccessMessageEscapeDown(evt) {
    if (evt.key === 'Escape') {
      distructSuccessMessage();
    }
  }

  successSectionButtonElement.addEventListener('click', distructSuccessMessage);
  document.addEventListener('click', onSuccessMessageOuterAreaClick);
  document.addEventListener('keydown', onSuccessMessageEscapeDown);
};

export { showSuccessMessage };
