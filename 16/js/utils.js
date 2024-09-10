// Функция-генератор id
export function getGeneratedId() {
  let lastId = 0;

  return function () {
    lastId += 1;
    return lastId;
  };
}


function countItems(arr, item) {
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === item) {
      count += 1;
    }
  }
  return count;
}


export function isDuplicates(arr) {
  return !(arr.every((item) => countItems(arr, item) === 1));
}


export function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}


export function getUniqueRandomNumbers(min, max, numbersCount = 1) {
  const values = [];

  return function () {
    for (let i = 0; i < numbersCount; i++) {
      let newValue = getRandomInteger(min, max);
      if (values.length >= (max - min + 1)) {
        // Обработать ошибку в вызывающем коде
        return null;
      }
      while (values.includes(newValue)) {
        newValue = getRandomInteger(min, max);
      }
      values.push(newValue);
    }

    return values;
  };
}


export function getUniqueRandomListElements(list, elementsCount = 1) {
  const listElements = [];
  const randomNumbers = getUniqueRandomNumbers(0, list.length - 1, elementsCount)();
  randomNumbers.forEach((item) => listElements.push(list[item]));

  return listElements;
}


export function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}


export function throttle (callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}
