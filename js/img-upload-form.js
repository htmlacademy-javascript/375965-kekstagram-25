import { onClickPictures } from './init-modal-popup.js';
import { onClickBigger, onClickSmaller } from './scale-control.js';
import { onRadioChange } from './filter-control.js';
import { showSuccessMessage } from './img-upload-success.js';
import { showErrorMessage } from './img-upload-error.js';
import { sendData } from './api.js';
import { ESCAPE } from './constants.js';
import { resetFilter } from './filter-control.js';

const MAX_COMMENT_LENGTH = 140;
const HASH_TAGS_MAX_COUNT = 5;
const picturesContainerElement = document.querySelector('.pictures');
const postUploadFormElement = document.querySelector('#upload-select-image');
const uploadFileInputElement = document.querySelector('#upload-file');
const uploadCancelButtonElement = document.querySelector('#upload-cancel');
const submitButtonElement = document.querySelector('#upload-submit');
const uploadMainElement = document.querySelector('.img-upload__overlay');
const hashTagInputElement = postUploadFormElement.querySelector('.text__hashtags');
const commentTextAreaElement = postUploadFormElement.querySelector('.text__description');
const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
const re = /^#[A-Za-zA-Яа-яЁё0-9]{2,20}$/;

const pristine = new Pristine(postUploadFormElement, {
  classTo: 'text__item',
  errorClass: 'text--invalid',
  successClass: 'text--valid',
  errorTextParent: 'text__item',
  errorTextTag: 'span',
  errorTextClass: 'text__error'
});

let isInputFocused = false;

hashTagInputElement.addEventListener('focus', () => { isInputFocused = true; });
hashTagInputElement.addEventListener('focusout', () => { isInputFocused = false; });
commentTextAreaElement.addEventListener('focus', () => { isInputFocused = true; });
commentTextAreaElement.addEventListener('focusout', () => { isInputFocused = false; });

const onCloseOverlay = () => {
  const imgUploadPreviewElement = document.querySelector('.img-upload__preview img');
  postUploadFormElement.reset();
  pristine.reset();
  resetFilter();
  imgUploadPreviewElement.style.transform = 'none';
  uploadMainElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  picturesContainerElement.addEventListener('click', onClickPictures);
};

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

const uploadForm = () => {
  uploadFileInputElement.addEventListener('change', () => {
    const imgPreviewContainerElement = document.querySelector('.img-upload__preview');
    const effectsPreviewContainetElement = document.querySelectorAll('.effects__preview');
    const imgPreviewElement = imgPreviewContainerElement.querySelector('img');
    const effectLevelContainerElement = document.querySelector('.effect-level');
    const selectedFile = uploadFileInputElement.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      imgPreviewElement.src = reader.result;
      effectsPreviewContainetElement.forEach((element) => {
        element.style.backgroundImage = `url("${imgPreviewElement.src}")`;
      });
    }, false);
    effectLevelContainerElement.style = 'display: none';
    uploadMainElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    picturesContainerElement.removeEventListener('click', onClickPictures);
    imgPreviewContainerElement.appendChild(imgPreviewElement);
    reader.readAsDataURL(selectedFile);
  });

  uploadCancelButtonElement.addEventListener('click', onCloseOverlay);

  scaleControlSmallerElement.addEventListener('click', onClickSmaller);
  scaleControlBiggerElement.addEventListener('click', onClickBigger);
  onRadioChange();

  document.addEventListener('keydown', (evt) => {
    if (evt.key === ESCAPE && !isInputFocused) {
      onCloseOverlay();
    }
  });

  postUploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      sendData(
        () => {
          onCloseOverlay();
          showSuccessMessage();
        },
        () => {
          onCloseOverlay();
          showErrorMessage();
        },
        new FormData(evt.target),
      );
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

pristine.addValidator(hashTagInputElement, validateUniqueHashTag, 'Хэш-тэги не должны повторяться');
pristine.addValidator(hashTagInputElement, validateHashtagsCount, `Укажите не более ${HASH_TAGS_MAX_COUNT} хэш-тэгов`);
pristine.addValidator(hashTagInputElement, validateHashtags, 'Хэш-тэг должен начинаться с #, содержать от 2 до 20 символов');
pristine.addValidator(commentTextAreaElement, validateComment, `Превышен лимит ${MAX_COMMENT_LENGTH} символов`);

export { uploadForm, onCloseOverlay, unblockSubmitButton, blockSubmitButton };
