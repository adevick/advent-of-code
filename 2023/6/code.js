const fs = require('fs');
const sampleContents = fs.readFileSync('samplePuzzleInput.txt', 'utf-8');
const allContents = fs.readFileSync('puzzleInput.txt', 'utf-8');

let times = [];
let distances = [];
allContents.split(/\r?\n/).forEach((line) => {
  if (line.includes('Time:')) {
    times = line.split(':')[1].split(' ').filter((x) => x !== '');
  } else {
    distances = line.split(':')[1].split(' ').filter((x) => x !== '');
  }
});

console.log(times);
console.log(distances);

// time = (record - speed)
// distance = speed * time

const calculateTime = (recordToBeat, distance) => {
  let waysToWin = 0;
  for (let i = 1; i <= (recordToBeat - 1); i++) {
    const distanceTraveled = i * (recordToBeat - i);
    // console.log(`${distanceTraveled} > ${distance} && ${recordToBeat} > ${i}`);
    if (distanceTraveled > distance && recordToBeat > i) {
      waysToWin++;
    }
    if (recordToBeat === i) {
      break;
    }
  }
  return waysToWin;
}
const races = [];
for (let index = 0; index < times.length; index++) {
  const recordTime = times[index];
  const distance = distances[index];
  races.push(calculateTime(recordTime, distance));
}

const newTime = times.join('');
const newDistance = distances.join('');
console.log(newTime, newDistance);
const result = calculateTime(newTime, newDistance);
console.log('part2: ', result);
console.log(races);
console.log(races.reduce((agg, current) => agg = agg * current));
//250,133,010,811,025