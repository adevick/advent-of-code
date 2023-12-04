const fs = require('fs');

const words = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine'
]

const hasWord = (word) => {
  for (let index = 0; index < words.length; index++) {
    const element = words[index];
    if (word.includes(element)) {
      return index + 1;
    }
  }
  return null;
}

const findFirstNumber = (line) => {
  let letters = '';
  for (let index = 0; index < line.length; index++) {
    const element = line[index];
    if (parseInt(element)) {
      return parseInt(element);
    }
    letters += element;
    const found = hasWord(letters);
    if (found) { return found; }
  }
}

const findLasatNumber = (line) => {
  let letters = '';
  for (let index = line.length - 1; index >= 0; index--) {
    const element = line[index];
    if (parseInt(element)) {
      return parseInt(element);
    }
    letters = element.concat(letters);
    const found = hasWord(letters);
    if (found) { return found; }
  }
}

const allContents = fs.readFileSync('puzzleInput.txt', 'utf-8');
const numbers = [];
allContents.split(/\r?\n/).forEach((line) => {
  const firstNumber = findFirstNumber(line);
  const lastNumber = findLasatNumber(line);
  const value = `${firstNumber}${lastNumber}`;
  numbers.push(Number(value));
});
const total = numbers.reduce((cum, x) => cum + x, 0)
console.log(total);

