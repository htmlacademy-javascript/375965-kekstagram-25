import { getRandomNumber } from './util.js';
const filterContainerElement = document.querySelector('.img-filters');
const filterButtonElements = document.querySelectorAll('.img-filters__button');

const RANDOM_POSTS_COUNT = 10;

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

let currentFilter = Filters.DEFAULT;

const getCurrentFilter = () => currentFilter;
const setCurrentFilter = (id) => {
  switch (id) {
    case Filters.RANDOM:
      currentFilter = Filters.RANDOM;
      break;
    case Filters.DISCUSSED:
      currentFilter = Filters.DISCUSSED;
      break;
    default:
      currentFilter = Filters.DEFAULT;
      break;
  }
};

const compareLikesOfPost = (postA, postB) => postB.comments.length - postA.comments.length;

const renderPictures = (posts) => {
  const pictureContainerElement = document.querySelector('.pictures');
  const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
  const similarPostsFragment = document.createDocumentFragment();

  let filteredPosts = [];
  let temp = [];

  switch (getCurrentFilter()) {
    case Filters.RANDOM:
      temp = posts.slice();
      for (let i = 0; i < RANDOM_POSTS_COUNT && temp.length > 0; i++) {
        const randomPostIndex = getRandomNumber(0, RANDOM_POSTS_COUNT);
        filteredPosts.push(temp[randomPostIndex]);
        temp.splice(randomPostIndex, 1);
      }
      break;
    case Filters.DISCUSSED:
      filteredPosts = posts.slice().sort(compareLikesOfPost);
      break;
    default:
      filteredPosts = posts;
      break;
  }

  filteredPosts.forEach(({ id, url, likes, comments }) => {
    const postElement = pictureTemplateElement.cloneNode(true);
    postElement.querySelector('.picture__img').src = url;
    postElement.querySelector('.picture__likes').textContent = likes;
    postElement.querySelector('.picture__comments').textContent = comments.length;
    postElement.dataset.postId = id;
    similarPostsFragment.append(postElement);
  });

  document.querySelectorAll('.picture').forEach((photo) => {
    photo.remove();
  });

  pictureContainerElement.append(similarPostsFragment);
  filterContainerElement.classList.remove('img-filters--inactive');
};

const setFilterButton = (cb) => {
  filterButtonElements.forEach((filterButton) => {
    filterButton.addEventListener('click', (evt) => {
      setCurrentFilter(evt.target.id);
      filterButtonElements.forEach((button) => {
        button.classList.remove('img-filters__button--active');
      });
      evt.target.classList.add('img-filters__button--active');
      cb();
    });
  });
};

export { renderPictures, setFilterButton };
