import { userPosts } from './picture-render.js';

const thumbnails = document.querySelectorAll('.picture');
const fullPhoto = document.querySelector('.big-picture');
const pictureCloseButton = document.querySelector('.big-picture__cancel');

const bigPictureImg = document.querySelector('.big-picture__img img');
const commentsCount = document.querySelector('.comments-count');
const likesCount = document.querySelector('.likes-count');
const socialCaption = document.querySelector('.social__caption');
const commentCountArea = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

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
  });
};

for (let i = 0; i < thumbnails.length; i++) {
  addThumbnailClickHandler(thumbnails[i], userPosts[i]);
}

pictureCloseButton.addEventListener('click', () => {
  fullPhoto.classList.add('hidden');
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    fullPhoto.classList.add('hidden');
  }
});

export {addThumbnailClickHandler};
