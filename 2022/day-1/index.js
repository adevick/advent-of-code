const { readFileSync, promises: fsPromises } = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');
  const arr = contents.split(/\r?\n/);
  return arr;
}

const foodCalories = syncReadFile('./elvesCalories.txt');
let elevNumber = 0;
let totalCalories = 0;
let elves = [];
foodCalories.forEach(x => {
  if (x !== '') {
    totalCalories += Number(x);
  } else {
    elevNumber += 1;
    elves.push({
      elevNumber: elevNumber,
      totalCalories: Number(totalCalories)
    })
    totalCalories = 0;
  }
});

function findMaxCalories(elves) {
  return Math.max(...(elves.map((x) => x.totalCalories)));
}

const topElev1 = elves.find((x) => x.totalCalories === findMaxCalories(elves));
elves.splice(topElev1.elevNumber - 1, 1);
const topElev2 = elves.find((x) => x.totalCalories === findMaxCalories(elves));
elves.splice(topElev2.elevNumber - 1, 1);
const topElev3 = elves.find((x) => x.totalCalories === findMaxCalories(elves));

const totalCaloriesOfTop3 = topElev1.totalCalories + topElev2.totalCalories + topElev3.totalCalories;
console.log('MostCalories: ', topElev1);
console.log('Total of the top 3 elves: ', totalCaloriesOfTop3);

