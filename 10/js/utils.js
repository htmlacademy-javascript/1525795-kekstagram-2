// Функция-генератор id
export function getGeneratedId() {
  let lastId = 0;

  return function () {
    lastId += 1;
    return lastId;
  };
}
