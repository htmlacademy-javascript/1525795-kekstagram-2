import { getArrayPages } from './pagination.js';
import { getPageCount } from './pagination.js';
import { getPageItems } from './pagination.js';
import { getPageLength } from './pagination.js';
import { getLoadedPhotos } from './photos-state.js';

const COMMENTS_BY_PAGE = 5;
const modalView = document.querySelector('.big-picture');
const closeButton = modalView.querySelector('.big-picture__cancel');
const modalViewImg = document.querySelector('.big-picture__img img');
const commentsDiv = document.querySelector('ul.social__comments');
let comments;
let currentPageNum;
let commentsByPage;
let shownCommentsCount;
const commentTemplateAsText = `
  <li class="social__comment">
    <img class="social__picture" src="" alt="" width="35" height="35">
    <p class="social__text"></p>
  </li>`;


// Обработка событий:
// на клик по миниатюре
document.querySelector('.pictures').addEventListener('click', photoModalViewHandler);
// на подгрузку комментариев
document.querySelector('.social__comments-loader').addEventListener('click', loadCommentsHandler);


function showCommentsPageInfo() {
  document.querySelector('.social__comment-total-count').textContent = comments.length;

  if (comments.length === 0 || currentPageNum === getPageCount(commentsByPage)) {
    // Нет ни одного комментария или последняя страница
    document.querySelector('.social__comments-loader').hidden = true;
  } else {
    document.querySelector('.social__comments-loader').hidden = false;
  }
  shownCommentsCount += getPageLength(commentsByPage, currentPageNum);
  document.querySelector('.social__comment-shown-count').textContent = shownCommentsCount;
}


function fillComments() {
  if (getPageCount(commentsByPage) === 0) {
    return;
  }

  // Шаблон для заполнения комментариями
  const commentNode = document.createElement('template');
  commentNode.setAttribute('id', 'comment');
  commentNode.innerHTML = commentTemplateAsText;
  // Добавляем его в конец страницы
  const commentTemplate = document.body.appendChild(commentNode).content.querySelector('li');

  // Создаем фрагмент, куда будем вставлять заполненные шаблоны комментариев
  const commentsFragment = document.createDocumentFragment();

  // Проход по странице (срезу) комментариев
  for (const { avatar, name, message } of getPageItems(commentsByPage, currentPageNum)) {
    // Клонируем шаблон
    const commentItem = commentTemplate.cloneNode(true);
    // Заполняем шаблон данными из комментария
    commentItem.querySelector('img').setAttribute('src', avatar);
    commentItem.querySelector('img').setAttribute('alt', name);
    commentItem.querySelector('p').textContent = message;

    // Добавляем во фрагмент заполненный шаблон комментария
    commentsFragment.appendChild(commentItem);
  }
  // Добавляем фрагмент в подготовленное место на странице
  commentsDiv.appendChild(commentsFragment);
}


function loadCommentsHandler() {
  currentPageNum += 1;
  fillComments();
  showCommentsPageInfo();
}


function clearComments() {
  // Обнуляем комментарии
  currentPageNum = 0; // Используем человекочитаемые номера страниц
  commentsByPage = {};
  shownCommentsCount = 0;
}


function photoModalViewHandler(evt) {
  // Проверяем, что click был на картинке
  if (evt.target.nodeName === 'IMG') {
    modalView.classList.remove('hidden');

    // Добавляем события на закрытие модального окна
    document.addEventListener('keydown', closeViewPhotoByEsc);
    closeButton.addEventListener('click', closeModalViewHandler);

    // Получаем photo из preview и заполняем свойства полноразмерного изображения
    clearComments();
    const photoItem = getLoadedPhotos()[evt.target.parentNode.dataset.id];
    comments = photoItem.comments;
    commentsByPage = getArrayPages(comments, COMMENTS_BY_PAGE);

    modalViewImg.setAttribute('src', photoItem.url);
    document.querySelector('.likes-count').textContent = photoItem.likes;
    document.querySelector('.social__caption').textContent = photoItem.description;

    commentsDiv.innerHTML = '';

    loadCommentsHandler();

    document.querySelector('body').classList.add('modal-open');
  }
}


function closeViewPhotoByEsc(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeModalViewHandler();
  }
}


function closeModalViewHandler() {
  modalView.classList.add('hidden');
  document.body.classList.remove('modal-open');
  modalView.removeEventListener('keydown', closeViewPhotoByEsc);
  closeButton.removeEventListener('click', closeModalViewHandler);
}
