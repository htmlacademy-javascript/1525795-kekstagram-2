// Функция возвращает случайное число в заданном диапазоне
export function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

// Функция возвращает уникальное случайное число в заданном диапазоне
export function getUniqueRandomInteger(min, max) {
  const values = [];

  return function () {
    let newValue = getRandomInteger(min, max);
    if (values.length >= (max - min + 1)) {
      // Обработать ошибку в вызывающем коде
      return null;
    }
    while (values.includes(newValue)) {
      newValue = getRandomInteger(min, max);
    }
    values.push(newValue);

    return newValue;
  };
}

// Функция возвращает случайный элемент из списка
export function getRandomListElement(list) {
  return list[getRandomInteger(0, list.length - 1)];
}
