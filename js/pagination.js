const DEFAULT_PAGE_SIZE = 5;
let pages;


export const splitCommentsByPage = (comments, pageSize = DEFAULT_PAGE_SIZE) => {
  pages = [];
  const arrCopy = comments.slice();

  // Нарезаем массив на страницы
  while (arrCopy.length) {
    pages.push(arrCopy.splice(0, pageSize));
  }
};


export const getPageCount = () => pages.length;


export const getPageItems = (pageNum) => pages[pageNum];


export const getPageLength = (pageNum) => pages[pageNum] === undefined ? 0 : pages[pageNum].length;
