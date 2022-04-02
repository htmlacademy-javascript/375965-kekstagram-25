import {onClickPictures} from './init-modal-popup.js';
import { onClickBigger, onClickSmaller } from './scale-control.js';
import { onRadioChange } from './filter-control.js';
import { showErrorMessage, showSuccessMessage } from './showInfoMessage.js';
import { sendData } from './api.js';

const MAX_COMMENT_LENGTH = 140;
const HASH_TAGS_MAX_COUNT = 5;
const picturesContainer = document.querySelector('.pictures');
const postUploadForm = document.querySelector('#upload-select-image');
const uploadFileItem = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('#upload-cancel');
const submitButton = document.querySelector('#upload-submit');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const hashTagsField = postUploadForm.querySelector('.text__hashtags');
const commentField = postUploadForm.querySelector('.text__description');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const imgUploadLogo = document.querySelector('.img-upload__start');
const re = /^#[A-Za-zA-Яа-яЁё0-9]{2,20}$/;

const pristine = new Pristine(postUploadForm, {
  classTo: 'text__item',
  errorClass: 'text--invalid',
  successClass: 'text--valid',
  errorTextParent: 'text__item',
  errorTextTag: 'span',
  errorTextClass: 'text__error'
});

let isInputFocused = false;

hashTagsField.addEventListener('focus', () => { isInputFocused = true; });
hashTagsField.addEventListener('focusout', () => { isInputFocused = false; });
commentField.addEventListener('focus', () => { isInputFocused = true; });
commentField.addEventListener('focusout', () => { isInputFocused = false; });

const onCloseOverlay = () => { // может переделать на оpenOverlay и closeOverlay? чтобы передавать потом в then и catch?
  postUploadForm.reset(); // сбрасывание значений формы
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  picturesContainer.addEventListener('click', onClickPictures);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const imgDownloadOverlay = () => {
  uploadFileItem.addEventListener('change', () => {
    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    picturesContainer.removeEventListener('click', onClickPictures);
  });

  uploadCancel.addEventListener('click', onCloseOverlay);

  scaleControlSmaller.addEventListener('click', onClickSmaller);
  scaleControlBigger.addEventListener('click', onClickBigger);
  onRadioChange();

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && !isInputFocused) {
      onCloseOverlay();
    }
  });
};

const getHashtagsAsArray = (value) => value.toString().trim().toLowerCase().split(' ').filter((e) => e.trim() !== '');

const validateHashtagsCount = (value) => getHashtagsAsArray(value).length <= HASH_TAGS_MAX_COUNT;

const validateUniqueHashTag = (value) => {
  const arr = getHashtagsAsArray(value).sort();
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1]) {
      return false;
    }
  }
  return true;
};

const validateHashtags = (value) => {
  const hashTagList = getHashtagsAsArray(value);
  for (let i = 0; i < hashTagList.length; i++) {
    if (re.test(hashTagList[i]) === false) {
      return false;
    }
  }
  return true;
};

const validateComment = (value) => value.length >= 0 && value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(hashTagsField, validateUniqueHashTag, 'Хэш-тэги не должны повторяться');
pristine.addValidator(hashTagsField, validateHashtagsCount, 'Укажите не более 5 хэш-тэгов');
pristine.addValidator(hashTagsField, validateHashtags, 'Хэш-тэг должен начинаться с #, содержать от 2 до 20 символов');
pristine.addValidator(commentField, validateComment, `Превышен лимит ${MAX_COMMENT_LENGTH} символов`);

const setUserFormSubmit = (onSuccess) => {
  postUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault(); // Добавьте обработчик отправки формы, если ещё этого не сделали, который бы отменял действие формы по умолчанию и отправлял данные формы посредством fetch на сервер.
    if (!pristine.validate()) {
      evt.preventDefault();
    }
    blockSubmitButton();
    sendData(
      () => {
        onSuccess();
        showSuccessMessage();
        imgUploadLogo.classList.add('hidden');
      },
      () => {
        onCloseOverlay();
        showErrorMessage();
      },
      new FormData(evt.target),
    );
  });
};
export { imgDownloadOverlay, setUserFormSubmit, onCloseOverlay, unblockSubmitButton };
