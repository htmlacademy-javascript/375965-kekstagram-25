// Функция, возвращающая рандомное число в определенном диапазоне

function getRandomNumber (min, max) {

  if (min >= 0 && min < max) {
    return Math.floor(Math.random() * ((max + 1) - min) + min);
  }

  throw 'Error';
}

getRandomNumber(1, 20);

// Функция для проверки максимальной длины строки

function checkUserComment (userComment) {

  const MAX_LENGTH = 10;

  if (userComment.length <= MAX_LENGTH && userComment !== '') {
    return true;
  }

  return false;
}

checkUserComment('Комментарий пользователя');
