const getRandomNumber = (startNumber, lastNumber) => {
    if (lastNumber > startNumber) {
        return Math.floor(Math.random() * ((lastNumber + 1) - startNumber)) + startNumber;
    }
    return console.log('Диапазон введён некорректно');
}

getRandomNumber(0, 10);



const isNeedfulLength = (currentLength, maxLength) => {
    if (currentLength <= maxLength) {
        return true;
}
    return false;
}

isNeedfulLength(10, 20);