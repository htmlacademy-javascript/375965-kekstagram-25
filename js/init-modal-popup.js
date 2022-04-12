import { ESCAPE } from './constants.js';

const COMMENTS_PER_POST = 5;
const commentsTemplateElement = document.querySelector('#comments').content.querySelector('.social__comment');
const commentsContainerElement = document.querySelector('.social__comments');
const bigPictureImgElement = document.querySelector('.big-picture__img img');
const totalCommentsCountElement = document.querySelector('.comments-count');
const openedCommentsCountElement = document.querySelector('.comments-opened');
const likesCountElement = document.querySelector('.likes-count');
const socialCaptionElement = document.querySelector('.social__caption');
const picturesContainerElement = document.querySelector('.pictures');
const fullPhotoElement = document.querySelector('.big-picture');
const pictureCloseButtonElement = document.querySelector('.big-picture__cancel');
const commentsLoaderElement = document.querySelector('.comments-loader');

const renderComments = (post, firstComment, lastComments) => {
  const similarCommentsFragment = document.createDocumentFragment();
  post
    .comments
    .slice(firstComment, lastComments)
    .forEach(({ avatar, message, name}) => {
      const commentsItem = commentsTemplateElement.cloneNode(true);
      const commentImgElement = commentsItem.querySelector('.social__picture');
      commentImgElement.src = avatar;
      commentImgElement.alt = name;
      commentsItem.querySelector('.social__text').textContent = message;
      similarCommentsFragment.appendChild(commentsItem);
    });
  commentsContainerElement.appendChild(similarCommentsFragment);
};

const onClickPictures = (evt, posts) => {
  const aPicture = evt.target.closest('a.picture');
  if (aPicture === null) {
    return;
  }

  const postId = aPicture.dataset.postId;
  const currentPost = posts[postId];
  bigPictureImgElement.dataset.postId = postId;

  commentsLoaderElement.classList.remove('visually-hidden');

  fullPhotoElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureImgElement.src = currentPost.url;
  totalCommentsCountElement.textContent = currentPost.comments.length;
  openedCommentsCountElement.textContent = Math.min(COMMENTS_PER_POST, currentPost.comments.length);

  if (openedCommentsCountElement.textContent === totalCommentsCountElement.textContent) {
    commentsLoaderElement.classList.add('visually-hidden');
  }

  likesCountElement.textContent = currentPost.likes;
  socialCaptionElement.textContent = currentPost.description;
  commentsContainerElement.innerHTML = '';

  renderComments(currentPost, 0, Math.min(COMMENTS_PER_POST, totalCommentsCountElement.textContent));

  picturesContainerElement.removeEventListener('click', onClickPictures);
  document.removeEventListener('keydown', onClickPictures);
};

const initModalPopup = (posts) => {
  picturesContainerElement.addEventListener('click', (evt) => onClickPictures(evt, posts));

  pictureCloseButtonElement.addEventListener('click', () => {
    fullPhotoElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    picturesContainerElement.addEventListener('click', (evt) => onClickPictures(evt, posts));
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === ESCAPE) {
      fullPhotoElement.classList.add('hidden');
      document.body.classList.remove('modal-open');
      picturesContainerElement.addEventListener('click', (event) => onClickPictures(event, posts));
    }
  });

  commentsLoaderElement.addEventListener('click', () => {
    const currentLastComment = +openedCommentsCountElement.textContent;

    openedCommentsCountElement.textContent =  Math.min(
      +openedCommentsCountElement.textContent + COMMENTS_PER_POST,
      +totalCommentsCountElement.textContent);

    if (openedCommentsCountElement.textContent === totalCommentsCountElement.textContent) {
      commentsLoaderElement.classList.add('visually-hidden');
    }
    const postId = bigPictureImgElement.dataset.postId;
    const post = posts[postId];
    renderComments(post, currentLastComment, openedCommentsCountElement.textContent);
  });
};

export { initModalPopup, onClickPictures };
