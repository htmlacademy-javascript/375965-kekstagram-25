import { userPosts } from './picture-render.js';

// const picturesContainer = document.querySelector('.pictures');
const thumbnails = document.querySelectorAll('.picture');
const fullPhoto = document.querySelector('.big-picture');
const pictureCloseButton = document.querySelector('.big-picture__cancel');
const commentsTemplate = document.querySelector('#comments').content.querySelector('.social__comment');

const commentsContainer = document.querySelector('.social__comments');
const bigPictureImg = document.querySelector('.big-picture__img img');
const commentsCount = document.querySelector('.comments-count');
const likesCount = document.querySelector('.likes-count');
const socialCaption = document.querySelector('.social__caption');
const commentCountArea = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const similarCommentsFragment = document.createDocumentFragment();

const addThumbnailClickHandler = function (thumbnail, data) {
  thumbnail.addEventListener('click', () => {
    fullPhoto.classList.remove('hidden');
    document.body.classList.add('modal-open');
    commentCountArea.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    bigPictureImg.src = data.url;
    commentsCount.textContent = data.comments.length;
    likesCount.textContent = data.likes;
    socialCaption.textContent = data.description;
    commentsContainer.innerHTML = '';
    data.comments.forEach(({ avatar, message, name}) => {
      const commentsItem = commentsTemplate.cloneNode(true);
      const commentImg = commentsItem.querySelector('.social__picture');
      commentImg.src = avatar;
      commentImg.alt = name;
      commentsItem.querySelector('.social__text').textContent = message;
      similarCommentsFragment.appendChild(commentsItem);
    });
    commentsContainer.appendChild(similarCommentsFragment);
  });
};

const initPictures = () => {
  // picturesContainer.addEventListener('click', (event) => {
  //   fullPhoto.classList.remove('hidden');
  //   document.body.classList.add('modal-open');
  //   commentCountArea.classList.add('hidden');
  //   commentsLoader.classList.add('hidden');
  //   bigPictureImg.src = event.target.url;
  //   commentsCount.textContent = event.target.comments;
  //   likesCount.textContent = event.target.likes;
  //   socialCaption.textContent = event.target.description;
  //   commentsContainer.innerHTML = '';
  //   event.target.comments.forEach(({ avatar, message, name}) => {
  //     const commentsItem = commentsTemplate.cloneNode(true);
  //     const commentImg = commentsItem.querySelector('.social__picture');
  //     commentImg.src = avatar;
  //     commentImg.alt = name;
  //     commentsItem.querySelector('.social__text').textContent = message;
  //     similarCommentsFragment.appendChild(commentsItem);
  //   });
  //   commentsContainer.appendChild(similarCommentsFragment);
  // });

  pictureCloseButton.addEventListener('click', () => {
    fullPhoto.classList.add('hidden');
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      fullPhoto.classList.add('hidden');
    }
  });

  for (let i = 0; i < thumbnails.length; i++) {
    addThumbnailClickHandler(thumbnails[i], userPosts[i]);
  }
};

export {initPictures};
