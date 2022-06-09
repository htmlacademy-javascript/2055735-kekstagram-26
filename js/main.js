// Функция ниже возвращает случайное число в заданном диапазоне:
const getRandomNumber = (startNumber, lastNumber) =>
{if (lastNumber > startNumber)
{return Math.floor(Math.random() * ((lastNumber + 1) - startNumber)) + startNumber;}
return 'Диапазон введён некорректно';
};
getRandomNumber(0, 10);

// Функция ниже возвращает булевое значение, проверяя длину текста:
const checkLength = (text, maxLength) =>
  text.length <= maxLength;
checkLength('какой-то текст', 20);

// Функция ниже возвращает массив с случайными и неповторяющимися числами в заданном диапазоне:
const getNoRepeatNumbers = (min, max) =>
{
  const noRepeatNumbers = [];
  for (let i = min; i <= max; i++){
    const newNumber = getRandomNumber(min, max);
    if (noRepeatNumbers.indexOf(newNumber) < 0) { noRepeatNumbers.push(newNumber); }
    else { i--; }
  }
  return noRepeatNumbers;
};

//Функция ниже создаёт массив из 25 сгенерированных объектов:
const getDescriptions = () => {
  const descriptions = [];

  const noRepeatNumbersId = getNoRepeatNumbers(1, 25); // Массив с случайными не повторяющимися id
  const noRepeatNumbersUrl = getNoRepeatNumbers(1, 25); // Массив с случайными не повторяющимися url
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
    descriptions[i].id = noRepeatNumbersId[i];
    descriptions[i].url = `photos/${noRepeatNumbersUrl[i]}.jpg`;
    descriptions[i].description = 'Описание к фото';
    descriptions[i].likes = getRandomNumber(15, 200);
    descriptions[i].comments = [{}, {}, {}];
    for (let j = 0; j < descriptions[i].comments.length; j++) {
      descriptions[i].comments[j].id = noRepeatNumbersComment[commentId];
      commentId++;
      descriptions[i].comments[j].avatar = `img/avatar-${getRandomNumber(1, 6)}.svg`;
      descriptions[i].comments[j].message = messages[getRandomNumber(0, 5)];
      descriptions[i].comments[j].name = names[getRandomNumber(0, 19)];
    }
  }
  return descriptions;
};

getDescriptions();
