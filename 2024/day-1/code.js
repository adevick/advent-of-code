const fs = require('fs');
const allContents = fs.readFileSync('puzzleInput.txt', 'utf-8');
const leftList = [];
const rightList = [];

allContents.split(/\r?\n/).forEach((line) => {
  const [left, right] = line.split('   ');
  leftList.push(Number(left));
  rightList.push(Number(right));
});

leftList.sort();
rightList.sort();

const distances = [];
leftList.forEach((number, index) => {
  distances.push(Math.abs(number - rightList[index]));
})
const result = distances.reduce((accumulator, current) => accumulator + current, 0);
console.log('Answer Part 1: ', result);

const leftListMap = leftList.reduce((acc, current) => {
  if(acc[`${current}`] === undefined) {
    acc[`${current}`] = 1;
    return acc;
  } 
  acc[`${current}`] = acc[`${current}`] + 1;
  return acc;
},{});

const rightListMap = rightList.reduce((acc, current) => {
  if(acc[`${current}`] === undefined) {
    acc[`${current}`] = 1;
    return acc;
  } 
  acc[`${current}`] = acc[`${current}`] + 1;
  return acc;
},{});

const leftSet = new Set(leftList);
const rightSet = new Set(rightList);
const values = [];
[...leftSet].reduce((acc, current) => {
  const timesInRightList = rightListMap[`${current}`];
  if(timesInRightList) {
    values.push((current * timesInRightList) * leftListMap[`${current}`]);
  }
})

const resultPart2 = values.reduce((accumulator, current) => accumulator + current, 0);
console.log('Answer Part 2: ', resultPart2);


