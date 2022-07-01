// Функция ниже возвращает случайное число в заданном диапазоне:
const getRandomNumber = (startNumber, lastNumber) =>
{if (lastNumber > startNumber)
{return Math.floor(Math.random() * ((lastNumber + 1) - startNumber)) + startNumber;}
return 'Диапазон введён некорректно';
};

// Функция ниже возвращает булевое значение, проверяя длину текста:
const checkLength = (text, maxLength) =>
  text.length <= maxLength;
checkLength('какой-то текст', 20);

export {getRandomNumber};
