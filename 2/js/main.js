'use strict';

const MAX_COMMENT_LENGTH = 140;
const TEST_COMMENT = 'Комментарий пользователя';

const getRandomNumber = (min, max) => {

  if (min < 0 || min > max) {
    throw 'getRandomNumber error: check min and max values';
  }

  return Math.floor(Math.random() * ((max + 1) - min) + min);

};

getRandomNumber(1, 20);

const isStringHasCorrectLength = (value, maxLength) => value.length <= maxLength;

isStringHasCorrectLength(TEST_COMMENT, MAX_COMMENT_LENGTH);
