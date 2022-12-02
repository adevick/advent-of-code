const { readFileSync, promises: fsPromises } = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  // console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']

  return arr;
}

console.log('hello world');
console.log('Reading input.txt');
const input = syncReadFile('./input.txt');
let elveNumber = 0;
let totalCalories = 0;
let elves = [];
input.forEach(x => {
  if (x !== '') {
    totalCalories += Number(x);
  } else {
    elveNumber += 1;
    elves.push({
      elveNumber: elveNumber,
      totalCalories: Number(totalCalories)
    })
    totalCalories = 0;
  }
});

const maxCalories = Math.max(...(elves.map((x) => x.totalCalories)));

console.log(elves.find((x) => x.totalCalories === maxCalories));


