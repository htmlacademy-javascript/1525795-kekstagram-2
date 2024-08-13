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
