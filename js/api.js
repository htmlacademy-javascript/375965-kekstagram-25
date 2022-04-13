import { unblockSubmitButton, blockSubmitButton } from './img-upload-form.js';
import { showErrorConnectMessage } from './posts-download-error.js';

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
      showErrorConnectMessage();
      throw Error(err);
    });
};

const sendData = (onSuccess, onFail, formData) => {
  blockSubmitButton();
  fetch('https://25.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      unblockSubmitButton();
      return response.ok ? onSuccess() : onFail();
    })
    .catch(() => {
      unblockSubmitButton();
      onFail();
    });
};

export { getData, sendData };
