const fs = require('fs');
const _ = require('lodash');
const sampleContents = fs.readFileSync('samplePuzzleInput.txt', 'utf-8');
const allContents = fs.readFileSync('puzzleInput.txt', 'utf-8');
const cards = [];
allContents.split(/\r?\n/).forEach((line) => {
  cards.push(line.split(':')[1]);
});
let total = 0;
cards.forEach(element => {
  const winningNumbers = element.split('|')[0].split(' ').filter((x) => x !== '');
  const myNumbers = element.split('|')[1].split(' ').filter((x) => x !== '');
  console.log(winningNumbers)
  console.log(myNumbers);
  let winCount = 0;
  myNumbers.forEach(n => {
    const winner = winningNumbers.includes(n);
    if (winner) {
      console.log(n);
      winCount = winCount + 1;
    }
  });
  if (winCount === 1) {
    total += 1;
  } else if (winCount > 0) {
    total += Math.pow(2, winCount - 1);
  }
  console.log(total);
});
