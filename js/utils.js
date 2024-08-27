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
  return !(arr.every((item) => { return countItems(arr, item) === 1 }));
}
