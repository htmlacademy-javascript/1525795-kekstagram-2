// Предложения для использования в комментариях
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Очень интересно! Но ничего не понятно...',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Это все здорово! Но нужно переделать!'
];

// Имена пользователей для комментариев
const NICKNAMES = [
  'Орфей Кирдан',
  'Тайсон Veon',
  'Далебор Белег',
  'Шумахер Румил Из Лориэна',
  'Милый Пенлод',
  'Бориполк Исилиэль',
  'Дочь Луны',
  'Сверчок Белег',
  'Мокрушник Накилон',
  'Далебор Ymin',
  'Ферония Слоновая Инглор',
  'Пламя Нимрхосс',
  'Клементин Кирдан',
  'Двойник Арвен',
  'Ферония Слоновая Маэглин',
  'Давидсония Анкалим',
  'Шпага Охтарон',
  'Люнет Сулмелдир Спутник Ветра',
  'Лаириэль Дочь Лета',
  'Мокрушник Галадриэль',
  'Обиход Лоринди Золотое Сердце',
  'Железа Глорфиндель'
];

// Описания фотографий
const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, ex?',
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi, eos saepe natus neque sed sit quos alias dolor esse officiis?',
  'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, obcaecati.',
  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit, labore.',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos mollitia corrupti nostrum totam tempora earum tenetur doloribus sapiente minus voluptatem?',
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia quis id excepturi odit harum, quos quod cupiditate obcaecati omnis optio.',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eligendi quam ab. A nihil ea inventore reprehenderit ad ipsa similique.',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed cupiditate molestiae illo. Autem cumque officia inventore animi excepturi beatae incidunt.',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error possimus earum assumenda doloremque? Unde consequuntur facere libero quidem ad modi.',
  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit facilis nam eos rem maiores ratione rerum possimus vel eveniet? Sequi?',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident quam nisi id odit iste officiis dolorum nihil, vero veritatis eaque.',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et explicabo recusandae optio, officia iusto veniam aliquam maxime id perspiciatis modi.',
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem, voluptatibus dolorem dicta fugiat magnam natus. Qui voluptatum reprehenderit cum quisquam.',
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus maxime natus nobis facilis numquam, quisquam repellendus doloribus tempore ad odit.',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab ipsum dolor magnam maxime perspiciatis nobis adipisci ad error ipsa repellat?',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod aut in voluptates iure quibusdam placeat saepe nostrum tempore eum odit.',
  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat harum architecto dolores dolor explicabo quod nihil magni reprehenderit itaque dolore?',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt fuga animi enim, dolorem quos ipsum aliquam cupiditate rerum molestiae quidem?',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse tempora, repellat id ratione animi explicabo. A accusamus in aliquam dignissimos.',
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est similique, voluptates aperiam sed eius atque necessitatibus odit labore animi quibusdam?',
  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil provident vel nulla corrupti veritatis velit in magnam fugiat, expedita illum!',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur veniam ullam cumque aliquid veritatis fuga similique, totam necessitatibus omnis facilis!',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente nostrum dicta obcaecati totam distinctio harum similique quia soluta, hic non!',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi totam, ab aut debitis mollitia qui minima provident deserunt eaque rem?',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates, temporibus error provident saepe est recusandae ab assumenda. Impedit, assumenda maxime?',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, libero minus accusantium perferendis voluptatem explicabo facilis dolores deleniti? Sed, veli'
];

// Функция-генератор id
function getGeneratedId () {
  let lastId = 0;

  return function () {
    lastId += 1;
    return lastId;
  };
}

// Функция возвращает случайное число в заданном диапазоне
function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

// Функция возвращает уникальное случайное число в заданном диапазоне
function getUniqueRandomInteger (min, max) {
  const values = [];

  return function () {
    let newValue = getRandomInteger(min, max);
    if (values.length >= (max - min + 1)) {
      // Обработать ошибку в вызывающем коде
      return null;
    }
    while (values.includes(newValue)) {
      newValue = getRandomInteger(min, max);
    }
    values.push(newValue);

    return newValue;
  };
}

// Функция возвращает случайный элемент из списка
function getRandomListElement (list) {
  return list[getRandomInteger(0, list.length - 1)];
}

// Комментарии
// Функция возвращает случайное предложение из списка
function getRandomComment () {
  return getRandomListElement(MESSAGES);
}

// Функция возвращает список предложений
function getCommentsList() {
  // По ТЗ в комментарии количество предложений - 1 или 2
  const messageCount = getRandomInteger(1, 2);
  return Array.from({length: messageCount}, getRandomComment);
}

// Функция возвращает случайное описание фотографии из списка
function getRandomDescription () {
  return getRandomListElement(DESCRIPTIONS);
}

// Функция возвращает случайный никнейм
function getRandomNickName () {
  return getRandomListElement(NICKNAMES);
}

// Генерации комментария
const commentId = getGeneratedId();
const createComment = () => ({
  id: commentId(),
  avatar: 'img/avatar-' + String(getRandomInteger(1, 6)) + '.svg',
  message: getCommentsList().join(' '),
  name: getRandomNickName(),
});

// Функция генерации фото
const photoId = getGeneratedId();
const photoNum = getUniqueRandomInteger(1, 25);

const createPhoto = () => ({
  id: photoId(),
  url: 'photos/' + String(photoNum()) + '.jpg',
  description: getRandomDescription(),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, createComment),
});

const photoList = Array.from({length: 25}, createPhoto);

console.log(photoList);
