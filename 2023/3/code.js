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

const partsWithGears = [];

const isDigit = (value) => {
  return numbers.includes(value);
}
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const symbols = ['*', '+', '/', '@', '$', '-', '#', '%', '&', '='];
const hasSymbol = (value) => {
  return symbols.includes(value);
}

const checkGear = (v, rowIndex, columIndex) => {
  if (v === '*') {
    if (!gears.some((x) => x.rowIndex === rowIndex && x.columIndex === columIndex))
      gears.push({ rowIndex: rowIndex, columIndex: columIndex })
  }
}

const testGear = (rowIndex, columIndex) => {
  const left = engine[rowIndex][(columIndex - 1)];
  checkGear(left, rowIndex, (columIndex - 1));

  const topLeft = engine[(rowIndex - 1)][(columIndex - 1)];
  checkGear(topLeft, (rowIndex - 1), (columIndex - 1));

  const top = engine[(rowIndex - 1)][columIndex];
  checkGear(top, (rowIndex - 1), columIndex);

  const topRight = engine[(rowIndex - 1)][(columIndex + 1)];
  checkGear(topRight, (rowIndex - 1), (columIndex + 1));

  const right = engine[rowIndex][(columIndex + 1)];
  checkGear(right, rowIndex, (columIndex + 1));

  const bottomLeft = engine[(rowIndex + 1)][(columIndex - 1)];
  checkGear(bottomLeft, (rowIndex + 1), (columIndex - 1));

  const bottom = engine[(rowIndex + 1)][columIndex];
  checkGear(bottom, (rowIndex + 1), columIndex);

  const bottomRight = engine[(rowIndex + 1)][(columIndex + 1)];
  checkGear(bottomRight, (rowIndex + 1), (columIndex + 1));

  return;
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
let gears = [];
engine.forEach((parts, rowIndex) => {
  let currentNumber = '';
  let isValid = [];
  gears = [];
  for (let columnIndex = 0; columnIndex < parts.length; columnIndex++) {
    const element = parts[columnIndex];
    if (isDigit(element)) {
      const testResult = test(rowIndex, columnIndex);
      testGear(rowIndex, columnIndex);
      isValid.push(testResult);
      currentNumber = `${currentNumber}${element}`;
    }
    else if (currentNumber !== '') {
      // console.log(isValid);
      // console.log(currentNumber);


      if (gears.length > 0) {
        partsWithGears.push({ number: Number(currentNumber), gear: gears[0] });
      }
      if (isValid.some((x) => x === true)) {
        answer = Number(currentNumber) + answer;
      }
      currentNumber = '';
      isValid = [];
      gears = [];
    }
  };
});

const gearsWithTwoParts = [];
partsWithGears.forEach(part => {
  const foundGear = gearsWithTwoParts.find((x) => x.gear.rowIndex === part.gear.rowIndex && x.gear.columIndex === part.gear.columIndex);
  if (!foundGear) {
    gearsWithTwoParts.push({ gear: part.gear, first: part.number, second: 0 })
  } else {
    console.log(foundGear);
    foundGear.second = part.number;
  }
});

let answer2 = 0;
gearsWithTwoParts.forEach(gear => {
  answer2 += Number(gear.first) * Number(gear.second);
});
console.log('part2: ', answer2);

// console.log(JSON.stringify(gearsWithTwoParts, null, 2));

// console.log(JSON.stringify(partsWithGears, null, 2));
console.log(answer);