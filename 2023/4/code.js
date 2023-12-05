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
  // console.log(element);
  const winningNumbers = element.split('|')[0].split(' ').filter((x) => x !== '');
  const myNumbers = element.split('|')[1].split(' ').filter((x) => x !== '');
  // console.log(winningNumbers)
  // console.log(myNumbers);
  let winCount = 0;
  myNumbers.forEach(n => {
    const winner = winningNumbers.includes(n);
    if (winner) {
      // console.log(n);
      winCount = winCount + 1;
    }
  });

  if (winCount === 1) {
    total += 1;
  } else if (winCount > 0) {
    total += Math.pow(2, winCount - 1);
  }
  // console.log(total);
});
const ogCards = [...cards];

const winnersPerCard = [];
for (let index = 0; index < cards.length; index++) {
  const element = cards[index];
  const winningNumbers = element.split('|')[0].split(' ').filter((x) => x !== '');
  const myNumbers = element.split('|')[1].split(' ').filter((x) => x !== '');
  // console.log(winningNumbers)
  // console.log(myNumbers);
  let winCount = 0;
  myNumbers.forEach(n => {
    const winner = winningNumbers.includes(n);
    if (winner) {
      // console.log(n);
      winCount = winCount + 1;
    }
  });

  winnersPerCard.push({ winCount: winCount, value: '-' });
}

// 1,2,4,8,14,1
'4'
'22'
'2222'
'11111111'
'00000000000000'
'0'
console.log(winnersPerCard);

winnersPerCard.forEach((card, index) => {
  const wins = card.winCount;
  const length = card.value.length;
  for (let ind = 1; ind <= length; ind++) {
    if (wins > 0) {
      for (let i = 1; i <= wins; i++) {
        winnersPerCard[index + i].value = winnersPerCard[index + i].value.concat('-');
        // console.log(`wins: ${wins}`, winnersPerCard[index + i], `index: ${index + i}`);
      }
    }
  }
});

let answerIs = 0;
winnersPerCard.forEach(x => {
  answerIs += x.value.length;
});

console.log(winnersPerCard[0]);
console.log(winnersPerCard[1]);
console.log(winnersPerCard[2]);
console.log(winnersPerCard[3]);


console.log(answerIs);


