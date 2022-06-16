import {getRandomNumber} from './util.js';
import {getNoRepeatNumbers} from './util.js';

//Функция ниже создаёт массив из 25 сгенерированных объектов:
const getDescriptions = () => {
  const descriptions = [];

  const noRepeatNumbersComment = getNoRepeatNumbers(1, 75); // Массив с случайными неповторяющимися id комментариев

  let commentId = 0; // Вспомогательная переменная-счётчик, которая помогает нам ниже
  const messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  const names = ['Андрей', 'Юля', 'Денис', 'Маша', 'Женя', 'Петя', 'Олеся', 'Настя', 'Оксана', 'Дима', 'Гриша', 'Оля', 'Лера', 'Катя', 'Тима', 'Вася', 'Серёжа', 'Антон', 'Костя', 'Лёша'];
  for (let i = 0; i < 25; i++) {
    descriptions[i] = {};
    descriptions[i].id = i + 1;
    descriptions[i].url = `photos/${i + 1}.jpg`;
    descriptions[i].description = 'Описание к фото';
    descriptions[i].likes = getRandomNumber(15, 200);
    descriptions[i].comments = [{}, {}, {}];
    for (let j = 0; j < descriptions[i].comments.length; j++) {
      descriptions[i].comments[j].id = noRepeatNumbersComment[commentId];
      commentId++;
      descriptions[i].comments[j].avatar = `img/avatar-${getRandomNumber(1, 6)}.svg`;
      descriptions[i].comments[j].message = messages[getRandomNumber(0, messages.length - 1)];
      descriptions[i].comments[j].name = names[getRandomNumber(0, names.length - 1)];
    }
  }
  return descriptions;
};

export {getDescriptions};
