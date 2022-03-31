// import { getRandomNumber, getRandomElement, isStringHasCorrectLength } from './util.js';

// const MAX_COMMENT_LENGTH = 140;
// const TEST_COMMENT = 'Комментарий пользователя';
// const POSTS_COUNT = 25;

// const USER_NAMES = [
//   'Иван',
//   'Хуан Себастьян',
//   'Мария',
//   'Кристоф',
//   'Виктор',
//   'Юлия',
//   'Люпита',
//   'Вашингтон',
//   'Вальц',
//   'Роман',
//   'Владимир',
// ];

// const USER_COMMENTS = [
//   'Всё отлично!',
//   'В целом всё неплохо. Но не всё.',
//   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
//   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
//   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
//   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
// ];

// const DESCRIPTIONS = [
//   'Всем привет',
//   'Это я',
//   'Море и песок',
//   'Комментарий',
//   'Еще один комментарий',
// ];

// isStringHasCorrectLength(TEST_COMMENT, MAX_COMMENT_LENGTH);

// const createPostComment = (index) => ({
//   id: index,
//   avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
//   message: getRandomElement(USER_COMMENTS),
//   name: getRandomElement(USER_NAMES),
// });

// const createPostComments= (postId) => {
//   const numberOfComments = getRandomNumber(0, 10);
//   const comments = [];

//   for (let commentId = 1; commentId <= numberOfComments; commentId++) {
//     comments.push(createPostComment(postId * 10 + commentId));
//   }

//   return comments;
// };

// const createPost = (index) => ({
//   id: index,
//   url: `photos/${index}.jpg`,
//   description: getRandomElement(DESCRIPTIONS),
//   likes: getRandomNumber(15, 200),
//   comments: createPostComments(index),
// });

// const posts = [];

// for (let i = 1; i <= POSTS_COUNT; i++) {
//   posts.push(createPost(i));
// }

// export { posts };
