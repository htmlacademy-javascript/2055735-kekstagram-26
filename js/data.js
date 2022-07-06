const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = ['Андрей', 'Юля', 'Денис', 'Маша', 'Женя', 'Петя', 'Олеся', 'Настя', 'Оксана', 'Дима', 'Гриша',
  'Оля', 'Лера', 'Катя', 'Тима', 'Вася', 'Серёжа', 'Антон', 'Костя', 'Лёша'
];
const PHOTOS_AMOUNT = 25;
const COMMENTS_AMOUNT = 15;
const SHOWN_COMMENTS_AMOUNT = 5;
const PREVIEW_SCALE_MIN = '25%';
const PREVIEW_SCALE_MAX = '100%';
const PREVIEW_SCALE_STEP = 25;
const HASHTAGS_PATTERN = /^#[A-Za-zA-Яа-яЁё0-9]{1,999}$/;
const MAX_HASHTAGS_AMOUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const HASH = '#';
const AvatarDimension = {
  WIDTH: 35,
  HEIGHT: 35
};
const Key = {
  ESCAPE: 'Escape'
};
const Error = {
  manyHashtags: 'Введено больше 5 хештегов',
  badSymbols: 'Хэштег должен содержать в себе буквы или цифры',
  missingHash: 'Хэштег должен начинаться с #',
  emptyHashtag: 'Не дописан хэштег',
  noSpace: 'Хештеги должны быть разделены пробелом',
  longHashtag: 'Хэштег не может быть длиннее 20 символов',
  repeatHashtag: 'Хэштеги не должны повторяться',
  noImage: 'Не загружено изображение'
};

export {
  MESSAGES,
  NAMES,
  PHOTOS_AMOUNT,
  COMMENTS_AMOUNT,
  SHOWN_COMMENTS_AMOUNT,
  Key,
  HASHTAGS_PATTERN,
  MAX_HASHTAGS_AMOUNT,
  MAX_HASHTAG_LENGTH,
  HASH,
  Error,
  AvatarDimension,
  PREVIEW_SCALE_STEP,
  PREVIEW_SCALE_MIN,
  PREVIEW_SCALE_MAX
};
