import { posts } from './data.js';
const commentsTemplate = document.querySelector('#comments').content.querySelector('.social__comment');

const commentsContainer = document.querySelector('.social__comments');
const bigPictureImg = document.querySelector('.big-picture__img img');
const commentsCount = document.querySelector('.comments-count');
const likesCount = document.querySelector('.likes-count');
const socialCaption = document.querySelector('.social__caption');
// const commentCountArea = document.querySelector('.social__comment-count');
// const commentsLoader = document.querySelector('.comments-loader');
const picturesContainer = document.querySelector('.pictures');
const fullPhoto = document.querySelector('.big-picture');
const pictureCloseButton = document.querySelector('.big-picture__cancel');

const similarCommentsFragment = document.createDocumentFragment();
const initModalPopup = () => {
  picturesContainer.addEventListener('click', onClickPictures);

  pictureCloseButton.addEventListener('click', () => {
    fullPhoto.classList.add('hidden');
    document.body.classList.remove('modal-open');
    picturesContainer.addEventListener('click', onClickPictures);
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      fullPhoto.classList.add('hidden');
      document.body.classList.remove('modal-open');
      picturesContainer.addEventListener('click', onClickPictures);
    }
  });
};

function onClickPictures (evt) {
  if (evt.target.tagName.toLowerCase() !== 'img' && evt.target.tagName.toLowerCase() !== 'span') {
    return;
  }

  const postId = evt.target.closest('a.picture').dataset.postId - 1;
  const currentPost = posts[postId];
  fullPhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureImg.src = currentPost.url;
  commentsCount.textContent = currentPost.comments.length;
  likesCount.textContent = currentPost.likes;
  socialCaption.textContent = currentPost.description;
  commentsContainer.innerHTML = '';

  posts[postId].comments.forEach(({ avatar, message, name}) => {
    const commentsItem = commentsTemplate.cloneNode(true);
    const commentImg = commentsItem.querySelector('.social__picture');
    commentImg.src = avatar;
    commentImg.alt = name;
    commentsItem.querySelector('.social__text').textContent = message;
    similarCommentsFragment.appendChild(commentsItem);
  });

  commentsContainer.appendChild(similarCommentsFragment);
  picturesContainer.removeEventListener('click', onClickPictures);
}

export { initModalPopup, onClickPictures };
