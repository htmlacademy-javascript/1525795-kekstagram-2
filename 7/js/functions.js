function checkStrLength(str, maxLength) {
  return str.length <= maxLength;
}

function isPalindrom(str) {
  str = str.toLowerCase().replaceAll(' ', '');

  let targetStr = '';

  for (let i = str.length - 1; i >= 0; i--) {
    targetStr += str[i];
  }

  return str === targetStr;
}


function getDigits(symbols) {
  const str = symbols.toString();
  let resultStr = '';

  for (let i = 0; i <= str.length - 1; i++) {
    resultStr += isNaN(parseInt(str[i], 10)) ? '' : parseInt(str[i], 10);
  }

  return resultStr === '' ? NaN : +resultStr;
}

function checkMeetLength(workStart, workEnd, meetStart, meetLength) {
  const [startHour, startMinutes] = workStart.split(':');
  const [endHour, endMinutes] = workEnd.split(':');
  const [meetHour, meetMinutes] = meetStart.split(':');

  const result =
    // Начало встречи ранее начала рабочего дня?
    (+meetHour * 60 + +meetMinutes) < (+startHour * 60 + +startMinutes) ||
    // Начало встречи позднее конца рабочего дня?
    (+meetHour * 60 + +meetMinutes) > (+endHour * 60 + +endMinutes) ||
    // Начало встречи в пределах рабочего дня, но не позднее конца?
    (+meetHour * 60 + +meetMinutes) + +meetLength <= (+endHour * 60 + +endMinutes);

  return result;
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

// eslint-disable-next-line no-console
console.log(checkMeetLength('08:00', '17:30', '14:00', 90)); // true
// eslint-disable-next-line no-console
console.log(checkMeetLength('8:0', '10:0', '8:0', 120)); // true
// eslint-disable-next-line no-console
console.log(checkMeetLength('08:00', '14:30', '14:00', 90)); // false
// eslint-disable-next-line no-console
console.log(checkMeetLength('14:00', '17:30', '08:0', 90)); // false
// eslint-disable-next-line no-console
console.log(checkMeetLength('8:00', '17:30', '08:00', 900)); // false
