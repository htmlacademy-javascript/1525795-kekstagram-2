export function getArrayPages(arr, pageSize = 5) {
  const arrCopy = arr.slice();
  const result = {};
  let pageNum = 0; // Используем человекочитаемые номера страниц

  // Нарезаем страницы массива
  while (arrCopy.length) {
    pageNum += 1;
    result[pageNum] = arrCopy.splice(0, pageSize);
  }
  // И записываем количество страниц
  result['length'] = pageNum;

  return result;
}


export function getPageCount(pages) {
  return pages['length'];
}


export function getPageItems(pages, pageNum) {
  return pages[pageNum];
}

export function getPageLength(pages, pageNum) {
  return pages[pageNum] === undefined ? 0 : pages[pageNum].length;
}
