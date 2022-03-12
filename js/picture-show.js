import { userPosts } from './picture-render.js';

const picturesContainer = document.querySelector('.pictures');
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

const initPictures = () => {
  picturesContainer.addEventListener('click', (event) => {
    const postId = event.target.closest('a.picture').dataset.postId - 1;
    const currentPost = userPosts[postId];
    fullPhoto.classList.remove('hidden');
    document.body.classList.add('modal-open');
    commentCountArea.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    bigPictureImg.src = currentPost.url;
    commentsCount.textContent = currentPost.comments;
    likesCount.textContent = currentPost.likes;
    socialCaption.textContent = currentPost.description;
    commentsContainer.innerHTML = '';

    userPosts[postId].comments.forEach(({ avatar, message, name}) => {
      const commentsItem = commentsTemplate.cloneNode(true);
      const commentImg = commentsItem.querySelector('.social__picture');
      commentImg.src = avatar;
      commentImg.alt = name;
      commentsItem.querySelector('.social__text').textContent = message;
      similarCommentsFragment.appendChild(commentsItem);
    });
    commentsContainer.appendChild(similarCommentsFragment);
  });

  pictureCloseButton.addEventListener('click', () => {
    fullPhoto.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      fullPhoto.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  });
};

export { initPictures };
