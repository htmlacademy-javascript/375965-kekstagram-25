'use strict';

const MAX_COMMENT_LENGTH = 140;
const TEST_COMMENT = 'Комментарий пользователя';

const USER_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
  'Вальц',
  'Роман',
  'Владимир',
];

const USER_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Всем привет',
  'Это я',
  'Море и песок',
  'Комментарий',
  'Еще один комментарий',
];

const getRandomNumber = (min, max) => {

  if (min < 0 || min > max) {
    throw 'getRandomNumber error: check min and max values';
  }

  return Math.floor(Math.random() * ((max + 1) - min) + min);

};

const isStringHasCorrectLength = (value, maxLength) => value.length <= maxLength;

isStringHasCorrectLength(TEST_COMMENT, MAX_COMMENT_LENGTH);


const createPostDescription = () => {
  const randomDescriptionIndex = getRandomNumber(0, DESCRIPTIONS.length - 1);
  const randomCommentIndex = getRandomNumber(0, USER_COMMENTS.length - 1);

  return {
    id: `${++this.length}`,
    url: `photos/${this.length}.jpg`,
    description: DESCRIPTIONS[randomDescriptionIndex],
    likes: getRandomNumber(15, 200),
    comments: [
      {
        id: `${getRandomNumber(1, 1000)}`,
        avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
        message: USER_COMMENTS[randomCommentIndex],
        name: USER_NAMES[getRandomNumber(0, USER_NAMES.length - 1)]
      },
    ],
  };
};

const postDescriptionList = Array.from({length: 25}, createPostDescription);

postDescriptionList();
