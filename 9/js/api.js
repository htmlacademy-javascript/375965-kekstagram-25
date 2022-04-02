import { unblockSubmitButton } from './img-upload-form.js';

const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw Error(`${response.status} ${response.statusText}`);
    }).then((posts) => {
      onSuccess(posts);
    })
    .catch((err) => {
      throw Error(err);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://25.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
        unblockSubmitButton();
      } else {
        onFail();
        unblockSubmitButton();
      }})
    .catch(() => {
      onFail();
      unblockSubmitButton();
    });
};

export {getData, sendData};
