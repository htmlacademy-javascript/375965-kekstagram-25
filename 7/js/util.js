const getRandomNumber = (min, max) => {

  if (min < 0 || min > max) {
    throw 'getRandomNumber error: check min and max values';
  }

  return Math.floor(Math.random() * ((max + 1) - min) + min);

};

const getRandomElement = (array) => {
  const index = getRandomNumber(0, array.length - 1);
  return array[index];
};

const isStringHasCorrectLength = (value, maxLength) => value.length <= maxLength;

export { getRandomNumber, getRandomElement, isStringHasCorrectLength };
