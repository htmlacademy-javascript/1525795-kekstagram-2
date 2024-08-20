import { photosList } from './get-photos';

const DISPLAY_COMMENTS_COUNT = 5;
const modalView = document.querySelector('.big-picture');
const closeButton = modalView.querySelector('.big-picture__cancel');

document.querySelector('.pictures').addEventListener('click', photoModalViewHandler);

function photoModalViewHandler(evt) {
  // Проверяем, что click был на картинке
  if (evt.target.nodeName === 'IMG') {
    modalView.classList.remove('hidden');
    // Добавляем события на закрытие модального окна
    modalView.addEventListener('keydown', checkEvtKey);
    closeButton.addEventListener('click', closeModalViewHandler);

    // Получаем родительский элемент картинки, это будет <a></a>
    const parentNode = evt.target.parentNode;
    // ... и из него получаем id фотографии
    const photoId = parentNode.getAttribute('data-id');
    // ... чтобы найти ее в photosList
    const photoItem = photosList[photoId - 1];
    const bigPictureImg = document.querySelector('.big-picture__img img');
    // ... и из photosList подтянуть все прочие параметры
    bigPictureImg.setAttribute('src', photoItem.url);
    document.querySelector('.likes-count').textContent = photoItem.likes;
    document.querySelector('.social__comment-total-count').textContent = photoItem.comments.length;
    document.querySelector('.social__caption').textContent = photoItem.description;

    // Очистить содержимое блока комментариев
    const comments = document.querySelector('ul.social__comments');
    comments.innerHTML = '';

    // Определить, сколько комментариев показать
    const commentCount = photoItem.comments.length <= DISPLAY_COMMENTS_COUNT ? photoItem.comments.length : DISPLAY_COMMENTS_COUNT;

    // Заполнить список комментариев
    for (let i = 0; i < commentCount; i++) {
      const photoComment = photoItem.comments[i];
      const commentItem = document.createElement('li');
      commentItem.innerHTML =
        `<li class="social__comment">
          <img
            class="social__picture"
            src="${photoComment.avatar}"
            alt="${photoComment.name}"
            width="35" height="35">
          <p class="social__text">${photoComment.message}</p>
        </li>`;
      comments.appendChild(commentItem);
    }

    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
    document.querySelector('body').classList.add('modal-open');

    // Перевести фокус ввода на модальное окно
    modalView.focus();
  }
}

function checkEvtKey(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeModalViewHandler();
  }
}

function closeModalViewHandler() {
  modalView.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  modalView.removeEventListener('keydown', checkEvtKey);
  closeButton.removeEventListener('click', closeModalViewHandler);
}
