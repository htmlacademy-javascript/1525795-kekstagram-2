function checkStrLength (str, maxLength) {
  return str.length <= maxLength;
}

function isPalindrom (str) {
  str = str.toLowerCase().replaceAll(' ', '');

  let targetStr = '';

  for (let i = str.length - 1; i >= 0; i--) {
    targetStr += str[i];
  }

  return str === targetStr;
}


function getDigits (symbols) {
  const str = symbols.toString();
  let resultStr = '';

  for (let i = 0; i <= str.length - 1; i ++) {
    resultStr += isNaN(parseInt(str[i], 10)) ? '' : parseInt(str[i], 10);
  }

  return resultStr === '' ? NaN : +resultStr;
}


checkStrLength('проверяемая строка', 20); // true
checkStrLength('проверяемая строка', 18); // true
checkStrLength('проверяемая строка', 10); // false

isPalindrom('топот'); // true
isPalindrom('ДовОд'); // true
isPalindrom('Кекс'); // false
isPalindrom('Лёша на полке клопа нашёл '); // true

getDigits('2023 год'); // 2023
getDigits('ECMAScript 2022'); // 2022
getDigits('1 кефир, 0.5 батона'); // 105
getDigits('агент 007'); // 7
getDigits('а я томат'); // NaN
getDigits(2023); // 2023
getDigits(-1); // 1
getDigits(1.5); // 15
