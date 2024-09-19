import { splitCommentsByPage } from './pagination.js';
import { getPageCount } from './pagination.js';
import { getPageItems } from './pagination.js';
import { getPageLength } from './pagination.js';
import { getLoadedPhotos } from './photos-state.js';


const COMMENTS_BY_PAGE = 5;

const sectionPhotoView = document.querySelector('.big-picture');
const buttonClose = sectionPhotoView.querySelector('.big-picture__cancel');
const imgPhotoView = document.querySelector('.big-picture__img img');
const ulComments = document.querySelector('ul.social__comments');
const buttonCommentsLoader = document.querySelector('.social__comments-loader');
const sectionPictures = document.querySelector('.pictures');


const spanTotalCount = document.querySelector('.social__comment-total-count');
const spanShownCount = document.querySelector('.social__comment-shown-count');
let comments;
let currentPageNum;
let shownCommentsCount;
const commentTemplateAsText = `
  <li class="social__comment">
    <img class="social__picture" src="" alt="" width="35" height="35">
    <p class="social__text"></p>
  </li>`;


// Обработка событий:
// на подгрузку комментариев
buttonCommentsLoader.addEventListener('click', commentsLoadClickHandler);


function commentsLoadClickHandler() {
  loadComments();
}


function renderCommentsPage() {
  // Создаем фрагмент, куда будем вставлять заполненные шаблоны комментариев
  const commentsFragment = document.createDocumentFragment();

  // Проход по странице (срезу) комментариев
  for (const { avatar, name, message } of getPageItems(currentPageNum)) {
    const commentItem = document.createElement('li');
    commentItem.innerHTML = commentTemplateAsText;
    // Заполняем шаблон данными из комментария
    commentItem.querySelector('img').setAttribute('src', avatar);
    commentItem.querySelector('img').setAttribute('alt', name);
    commentItem.querySelector('p').textContent = message;

    // Добавляем во фрагмент заполненный шаблон комментария
    commentsFragment.appendChild(commentItem);
  }

  // Добавляем фрагмент в подготовленное место на странице
  ulComments.appendChild(commentsFragment);
}


function showCommentsPageInfo() {
  spanTotalCount.textContent = comments.length;

  buttonCommentsLoader.hidden = false;
  if (comments.length === 0 || currentPageNum === getPageCount() - 1) {
    // Нет ни одного комментария или последняя страница
    buttonCommentsLoader.hidden = true;
  }
  shownCommentsCount += getPageLength(currentPageNum);
  spanShownCount.textContent = shownCommentsCount;
}


function initComments() {
  // Обнуляем комментарии
  currentPageNum = 0;
  shownCommentsCount = 0;
  ulComments.innerHTML = '';

  // Разбиваем комментарии на страницы по COMMENTS_BY_PAGE штук, чтобы потом постранично их подгружать
  splitCommentsByPage(comments, COMMENTS_BY_PAGE);
}


function loadComments() {
  if (comments.length) {
    renderCommentsPage();
    showCommentsPageInfo();
    currentPageNum += 1;
  }
}


function viewPhotoEscHandler(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeViewPhoto();
  }
}


function viewPhotoClickHandler() {
  closeViewPhoto();
}


function closeViewPhoto() {
  sectionPhotoView.classList.add('hidden');
  document.body.classList.remove('modal-open');
  sectionPhotoView.removeEventListener('keydown', viewPhotoEscHandler);
  buttonClose.removeEventListener('click', viewPhotoClickHandler);

  // Восстанавливаем listener с главной страницы
  sectionPictures.addEventListener('click', thumbnailClickHandler);
}


export function thumbnailClickHandler(evt) {
  // Проверяем, что click был на миниатюре
  if (evt.target.nodeName === 'IMG' && evt.target.classList.contains('picture__img')) {
    // Отключаем слушатели с главной страницы
    sectionPictures.removeEventListener('click', thumbnailClickHandler);

    sectionPhotoView.classList.remove('hidden');

    // Добавляем события на закрытие модального окна
    document.addEventListener('keydown', viewPhotoEscHandler);
    buttonClose.addEventListener('click', viewPhotoClickHandler);

    // Получаем photo из preview и заполняем свойства полноразмерного изображения
    const photoItem = getLoadedPhotos()[evt.target.parentNode.dataset.id];
    // Оттуда же получаем все комментарии
    comments = photoItem.comments;
    initComments();

    // Показываем фото вместе с параметрами
    imgPhotoView.setAttribute('src', photoItem.url);
    document.querySelector('.likes-count').textContent = photoItem.likes;
    document.querySelector('.social__caption').textContent = photoItem.description;

    loadComments();

    document.querySelector('body').classList.add('modal-open');
  }
}
