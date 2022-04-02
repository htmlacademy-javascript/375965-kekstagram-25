const documentBody = document.querySelector('#body');

const showSuccessMessage = () => {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessageFragment = document.createDocumentFragment();
  const successMessageElement = successMessageTemplate.cloneNode(true);

  successMessageFragment.append(successMessageElement);

  documentBody.append(successMessageFragment);
};

const showErrorMessage = () => {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessageFragment = document.createDocumentFragment();
  const errorMessageElement = errorMessageTemplate.cloneNode(true);

  errorMessageFragment.append(errorMessageElement);

  documentBody.append(errorMessageElement);
};

// const errorButton = document.querySelector('.error__button');

// errorButton.addEventListener('click', () => {
//   errorMessageTemplate.classList.add('hidden');
// });

// не пойму как правильно добавить обработчик для showSuccessMessage и showErrorMessage
// может в img-upload-form с условием когда documentBody.includes(errorMessageTemplate) добавлять обработчик?

export { showSuccessMessage, showErrorMessage };
