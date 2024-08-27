import { photosList } from './show-photos.js';

const SHOW_COMMENTS_COUNT = 5;
const modalView = document.querySelector('.big-picture');
const closeButton = modalView.querySelector('.big-picture__cancel');
const modalViewImg = document.querySelector('.big-picture__img img');
const commentsDiv = document.querySelector('ul.social__comments');
let startCommentNum;
let comments;


// Обработка событий:
// на клик по миниатюре
document.querySelector('.pictures').addEventListener('click', photoModalViewHandler);
// на подгрузку комментариев
document.querySelector('.social__comments-loader').addEventListener('click', loadCommentsHandler);


function getCommentsSlice() {
  const fromNum = startCommentNum;
  let toNum = fromNum + SHOW_COMMENTS_COUNT;

  if (toNum > comments.length) {
    toNum = comments.length;
  }
  document.querySelector('.social__comment-shown-count').textContent = toNum;

  startCommentNum += SHOW_COMMENTS_COUNT;

  return comments.slice(fromNum, toNum);
}


function fillComments(commentsSlice) {
  const commentNode = document.createElement('template');
  commentNode.setAttribute('id', 'comment');
  commentNode.innerHTML = `
      <li class="social__comment">
        <img class="social__picture" src="" alt="" width="35" height="35">
        <p class="social__text"></p>
      </li>`;
  const commentTemplate = document.body.appendChild(commentNode).content.querySelector('li');

  const commentsFragment = document.createDocumentFragment();

  for (const {avatar, name, message} of commentsSlice) {
    const commentItem = commentTemplate.cloneNode(true);
    commentItem.querySelector('img').setAttribute('src', avatar);
    commentItem.querySelector('img').setAttribute('alt', name);
    commentItem.querySelector('p').textContent = message;
    commentsFragment.appendChild(commentItem);
  }
  commentsDiv.appendChild(commentsFragment);
}


function loadCommentsHandler() {
  if (startCommentNum < comments.length) {
    fillComments(getCommentsSlice());
  }
}


function getPhotoItem(photoNode) {
  const photoItem = photosList[photoNode.dataset.id - 1];
  comments = photoItem.comments;

  return photoItem;
}


function photoModalViewHandler(evt) {
  // Проверяем, что click был на картинке
  if (evt.target.nodeName === 'IMG') {
    modalView.classList.remove('hidden');

    // Добавляем события на закрытие модального окна
    document.addEventListener('keydown', checkEscKey);
    closeButton.addEventListener('click', closeModalViewHandler);

    // Получаем photo из preview и заполняем свойства полноразмерного изображения
    const {url, likes, description} = getPhotoItem(evt.target.parentNode);

    modalViewImg.setAttribute('src', url);
    document.querySelector('.likes-count').textContent = likes;
    document.querySelector('.social__comment-total-count').textContent = comments.length;
    document.querySelector('.social__caption').textContent = description;

    commentsDiv.innerHTML = '';

    startCommentNum = 0;
    fillComments(getCommentsSlice());

    document.querySelector('body').classList.add('modal-open');
  }
}


function checkEscKey(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeModalViewHandler();
  }
}


function closeModalViewHandler() {
  modalView.classList.add('hidden');
  document.body.classList.remove('modal-open');
  modalView.removeEventListener('keydown', checkEscKey);
  closeButton.removeEventListener('click', closeModalViewHandler);
}
