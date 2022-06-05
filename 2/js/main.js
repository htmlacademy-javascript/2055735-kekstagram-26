const getRandomNumber = (startNumber, lastNumber) =>
{if (lastNumber > startNumber)
{return Math.floor(Math.random() * ((lastNumber + 1) - startNumber)) + startNumber;}
return 'Диапазон введён некорректно';
};
getRandomNumber(0, 10);


const checkLength = (text, maxLength) =>
  text.length <= maxLength;
checkLength('какой-то текст', 20);
