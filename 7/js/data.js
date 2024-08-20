import { getRandomInteger, getRandomListElement } from './random';

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
  'Lorem ipsum . Veniam, ex?',
  'Lorem ipsum. Eligendi, eos saepe natus neque sed sit quos alias dolor esse officiis?',
  'Lorem ipsum. Atque, obcaecati.',
  'Lorem ipsum. Odit, labore.',
  'Lorem ipsum. Dignissimos mollitia corrupti nostrum totam tempora earum tenetur doloribus sapiente minus voluptatem?',
  'Lorem ipsum. Mollitia quis id excepturi odit harum, quos quod cupiditate obcaecati omnis optio.',
  'Lorem ipsum. Unde eligendi quam ab. A nihil ea inventore reprehenderit ad ipsa similique.',
  'Lorem ipsum. Sed cupiditate molestiae illo. Autem cumque officia inventore animi excepturi beatae incidunt.',
  'Lorem ipsum. Error possimus earum assumenda doloremque? Unde consequuntur facere libero quidem ad modi.',
  'Lorem ipsum. Reprehenderit facilis nam eos rem maiores ratione rerum possimus vel eveniet? Sequi?',
  'Lorem ipsum. Provident quam nisi id odit iste officiis dolorum nihil, vero veritatis eaque.',
  'Lorem ipsum. Et explicabo recusandae optio, officia iusto veniam aliquam maxime id perspiciatis modi.',
  'Lorem ipsum. Exercitationem, voluptatibus dolorem dicta fugiat magnam natus. Qui voluptatum reprehenderit cum quisquam.',
  'Lorem ipsum. Voluptatibus maxime natus nobis facilis numquam, quisquam repellendus doloribus tempore ad odit.',
  'Lorem ipsum. Ab ipsum dolor magnam maxime perspiciatis nobis adipisci ad error ipsa repellat?',
  'Lorem ipsum. Quod aut in voluptates iure quibusdam placeat saepe nostrum tempore eum odit.',
  'Lorem ipsum. Quaerat harum architecto dolores dolor explicabo quod nihil magni reprehenderit itaque dolore?',
  'Lorem ipsum. Incidunt fuga animi enim, dolorem quos ipsum aliquam cupiditate rerum molestiae quidem?',
  'Lorem ipsum. Esse tempora, repellat id ratione animi explicabo. A accusamus in aliquam dignissimos.',
  'Lorem ipsum. Est similique, voluptates aperiam sed eius atque necessitatibus odit labore animi quibusdam?',
  'Lorem ipsum. Nihil provident vel nulla corrupti veritatis velit in magnam fugiat, expedita illum!',
  'Lorem ipsum. Consequuntur veniam ullam cumque aliquid veritatis fuga similique, totam necessitatibus omnis facilis!',
  'Lorem ipsum. Sapiente nostrum dicta obcaecati totam distinctio harum similique quia soluta, hic non!',
  'Lorem ipsum. Commodi totam, ab aut debitis mollitia qui minima provident deserunt eaque rem?',
  'Lorem ipsum. Voluptates, temporibus error provident saepe est recusandae ab assumenda. Impedit, assumenda maxime?',
  'Lorem ipsum. Dolorum, libero minus accusantium perferendis voluptatem explicabo facilis dolores deleniti? Sed, veli'
];

// Функция возвращает случайное предложение из списка
function getRandomComment() {
  return getRandomListElement(MESSAGES);
}

// Функция возвращает список предложений для комментариев
export function getCommentsList() {
  // По ТЗ в комментарии количество предложений - 1 или 2
  const messageCount = getRandomInteger(1, 2);
  return Array.from({ length: messageCount }, getRandomComment);
}

// Функция возвращает случайное описание фотографии из списка
export function getRandomDescription() {
  return getRandomListElement(DESCRIPTIONS);
}

// Функция возвращает случайный никнейм
export function getRandomNickName() {
  return getRandomListElement(NICKNAMES);
}
