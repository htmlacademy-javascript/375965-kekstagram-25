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

const clip = (value, min, max) => Math.min(max, Math.max(min, value));

const debounce = (callback, timeoutDelay = 500) => {

  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getRandomNumber, getRandomElement, isStringHasCorrectLength, clip, debounce };
