import { postDescriptionList } from './data.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const userPosts = postDescriptionList.slice();

const similarPostsFragment = document.createDocumentFragment();

userPosts.forEach(({ url, likes, comments }) => {
  const postElement = pictureTemplate.cloneNode(true);
  postElement.querySelector('.picture__img').src = url;
  postElement.querySelector('.picture__likes').textContent = likes;
  postElement.querySelector('.picture__comments').textContent = comments.length;
  similarPostsFragment.appendChild(postElement);
});

pictureList.appendChild(similarPostsFragment);
