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

const pristine = new Pristine(postUploadForm);

const openOverlay = (callback) => {

  callback.addEventListener('change', () => {
    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    picturesContainer.removeEventListener('click', onClickPictures);
    // const input = event.target;
    // const file = input.files[0];
    // для загрузки файла
  });

  uploadCancel.addEventListener('click', () => {
    uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    picturesContainer.addEventListener('click', onClickPictures);
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      uploadOverlay.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
    picturesContainer.addEventListener('click', onClickPictures);
  });

};

function validateHashtags (value) {
  const arr = value.toString().split(' ');
  // re.test(arr[0]);
  // if (arr.length > 1) {
  //   arr.forEach((element) => {
  //     const result = re.test(arr[element]);
  //     return result;
  //   });
  // }

  for (let i = 0; i <= arr.length; i++) {
    if (re.test(arr[i]) === true) {
      return true;
    }
  }
}

function validateComment (value) {
  return value.length >= 0 && value.length <= 140;
}

pristine.addValidator(hashTagsField, validateHashtags, 'Ошибка');
pristine.addValidator(commentField, validateComment, 'Ошибка');


postUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();

  const isValid = pristine.validate();
  if (isValid) {
    return true;
  } else {
    // console.log('not valid');
  }
});

openOverlay(uploadFileItem);

