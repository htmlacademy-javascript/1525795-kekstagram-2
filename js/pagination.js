let pages;


export function splitCommentsByPage(arr, pageSize = 5) {
  pages = [];
  const arrCopy = arr.slice();

  // Нарезаем массив на страницы
  while (arrCopy.length) {
    pages.push(arrCopy.splice(0, pageSize));
  }
}


export function getPageCount() {
  return pages.length;
}


export function getPageItems(pageNum) {
  return pages[pageNum];
}


export function getPageLength(pageNum) {
  return pages[pageNum] === undefined ? 0 : pages[pageNum].length;
}
