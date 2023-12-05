const fs = require('fs');
const sampleContents = fs.readFileSync('samplePuzzleInput.txt', 'utf-8');
const allContents = fs.readFileSync('puzzleInput.txt', 'utf-8');
const filler = '...........................................................................................................................................';
const engine = [];
engine.push(filler);
allContents.split(/\r?\n/).forEach((line) => {
  engine.push(`.${line}.`);
});
engine.push(filler);

const isDigit = (value) => {
  return numbers.includes(value);
}
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const symbols = ['*', '+', '/', '@', '$', '-', '#', '%', '&', '='];
const hasSymbol = (value) => {
  return symbols.includes(value);
}

const test = (rowIndex, columIndex) => {
  const left = engine[rowIndex][(columIndex - 1)];
  const topLeft = engine[(rowIndex - 1)][(columIndex - 1)];
  const top = engine[(rowIndex - 1)][columIndex];
  const topRight = engine[(rowIndex - 1)][(columIndex + 1)];
  const right = engine[rowIndex][(columIndex + 1)];
  const bottomLeft = engine[(rowIndex + 1)][(columIndex - 1)];
  const bottom = engine[(rowIndex + 1)][columIndex];
  const bottomRight = engine[(rowIndex + 1)][(columIndex + 1)];
  const values = [left, topLeft, top, topRight, right, bottomLeft,
    bottom, bottomRight].map(hasSymbol);
  return values.some((x) => x === true);
}

let answer = 0;
engine.forEach((parts, rowIndex) => {
  let currentNumber = '';
  let isValid = [];
  for (let columnIndex = 0; columnIndex < parts.length; columnIndex++) {
    const element = parts[columnIndex];
    if (isDigit(element)) {
      const testResult = test(rowIndex, columnIndex);
      isValid.push(testResult);
      currentNumber = `${currentNumber}${element}`;
      console.log('element: ', element);
    }
    else if (currentNumber !== '') {
      console.log(isValid);
      console.log(currentNumber);
      if (isValid.some((x) => x === true)) {
        answer = Number(currentNumber) + answer;
      }
      currentNumber = '';
      isValid = [];
    }
  };
});

console.log(answer);