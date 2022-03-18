import {onClickPictures} from './init-modal-popup.js';
// const uploadFileIcon = document.querySelector('.img-upload__label');
const picturesContainer = document.querySelector('.pictures');
const postUploadForm = document.querySelector('#upload-select-image');
const uploadFileItem = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const hashTagsField = postUploadForm.querySelector('.text__hashtags');
const commentField = postUploadForm.querySelector('.text__description');
const re = /^#[A-Za-zA-Яа-яЕё0-9]{1,19}$/;

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

const onCloseOverlay = () => {
  postUploadForm.reset();
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  picturesContainer.addEventListener('click', onClickPictures);
};

const imgDownloadOverlay = () => {
  uploadFileItem.addEventListener('change', () => {
    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    picturesContainer.removeEventListener('click', onClickPictures);
    // const input = event.target;
    // const file = input.files[0];
    // для загрузки файла
  });

  uploadCancel.addEventListener('click', () => {
    onCloseOverlay();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && !isInputFocused) {
      onCloseOverlay();
    }
  });
};

function validateHashtags (value) {
  const hashTagList = value.toString().split(' ');

  for (let i = 0; i < hashTagList.length; i++) {
    if (re.test(hashTagList[i]) === false) {
      return false;
    } else if (hashTagList.length > 5) {
      return false;
    }
  }
  return true;
}

function validateComment (value) {
  return value.length >= 0 && value.length <= 140;
}

pristine.addValidator(hashTagsField, validateHashtags, 'Максимальная длина одного хэш-тэга 20 символов, минимальная 2');
pristine.addValidator(commentField, validateComment, 'Превышен лимит 140 символов');

postUploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (isValid) {
    return true;
  } else {
    evt.preventDefault();
  }
});

export { imgDownloadOverlay };
