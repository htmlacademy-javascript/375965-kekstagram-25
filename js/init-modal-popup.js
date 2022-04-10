const COMMENTS_PER_POST = 5;
const commentsTemplate = document.querySelector('#comments').content.querySelector('.social__comment');
const commentsContainer = document.querySelector('.social__comments');
const bigPictureImg = document.querySelector('.big-picture__img img');
const totalCommentsCount = document.querySelector('.comments-count');
const openedCommentsCount = document.querySelector('.comments-opened');
const likesCount = document.querySelector('.likes-count');
const socialCaption = document.querySelector('.social__caption');
const picturesContainer = document.querySelector('.pictures');
const fullPhoto = document.querySelector('.big-picture');
const pictureCloseButton = document.querySelector('.big-picture__cancel');
const commentsLoader = document.querySelector('.comments-loader');

const renderComments = (post, firstComment, lastComments) => {
  const similarCommentsFragment = document.createDocumentFragment();
  post
    .comments
    .slice(firstComment, lastComments)
    .forEach(({ avatar, message, name}) => {
      const commentsItem = commentsTemplate.cloneNode(true);
      const commentImg = commentsItem.querySelector('.social__picture');
      commentImg.src = avatar;
      commentImg.alt = name;
      commentsItem.querySelector('.social__text').textContent = message;
      similarCommentsFragment.appendChild(commentsItem);
    });
  commentsContainer.appendChild(similarCommentsFragment);
};

const onClickPictures = (evt, posts) => {
  const aPicture = evt.target.closest('a.picture');
  if (aPicture === null) {
    return;
  }

  const postId = aPicture.dataset.postId;
  const currentPost = posts[postId];
  bigPictureImg.dataset.postId = postId;

  commentsLoader.classList.remove('visually-hidden');

  fullPhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureImg.src = currentPost.url;
  totalCommentsCount.textContent = currentPost.comments.length;
  openedCommentsCount.textContent = Math.min(COMMENTS_PER_POST, currentPost.comments.length);

  if (openedCommentsCount.textContent === totalCommentsCount.textContent) {
    commentsLoader.classList.add('visually-hidden');
  }

  likesCount.textContent = currentPost.likes;
  socialCaption.textContent = currentPost.description;
  commentsContainer.innerHTML = '';

  renderComments(currentPost, 0, Math.min(COMMENTS_PER_POST, totalCommentsCount.textContent));

  picturesContainer.removeEventListener('click', onClickPictures);
  document.removeEventListener('keydown', onClickPictures);
};

const initModalPopup = (posts) => {
  picturesContainer.addEventListener('click', (evt) => onClickPictures(evt, posts));

  pictureCloseButton.addEventListener('click', () => {
    fullPhoto.classList.add('hidden');
    document.body.classList.remove('modal-open');
    picturesContainer.addEventListener('click', (evt) => onClickPictures(evt, posts));
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      fullPhoto.classList.add('hidden');
      document.body.classList.remove('modal-open');
      picturesContainer.addEventListener('click', (event) => onClickPictures(event, posts));
    }
  });

  commentsLoader.addEventListener('click', () => {
    const currentLastComment = +openedCommentsCount.textContent;

    openedCommentsCount.textContent =  Math.min(
      +openedCommentsCount.textContent + COMMENTS_PER_POST,
      +totalCommentsCount.textContent);

    if (openedCommentsCount.textContent === totalCommentsCount.textContent) {
      commentsLoader.classList.add('visually-hidden');
    }
    const postId = bigPictureImg.dataset.postId;
    const post = posts[postId];
    renderComments(post, currentLastComment, openedCommentsCount.textContent);
  });
};

export { initModalPopup, onClickPictures };
