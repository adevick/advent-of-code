console.log('hello world');

const { readFileSync, promises: fsPromises } = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');
  const arr = contents.split(/\r?\n/);
  return arr;
}

const strategyGuide = syncReadFile('./strategyGuide.txt');

const scoreOfShapes = {
  Rock: 1,
  Paper: 2,
  Scissors: 3
}

const scoreOfOutcome = {
  lost: 0,
  draw: 3,
  win: 6
}

function whoPlayedWhat(value) {
  if (value === 'A' || value === 'X') {
    return scoreOfShapes.Rock;
  }
  if (value === 'B' || value === 'Y') {
    return scoreOfShapes.Paper;
  }
  if (value === 'C' || value === 'Z') {
    return scoreOfShapes.Scissors;
  }
}

function didIWin(elevPlayed, iPlayed) {
  if (elevPlayed === scoreOfShapes.Rock && iPlayed === scoreOfShapes.Scissors ||
    elevPlayed === scoreOfShapes.Scissors && iPlayed === scoreOfShapes.Paper ||
    elevPlayed === scoreOfShapes.Paper && iPlayed === scoreOfShapes.Rock) {
    return scoreOfOutcome.lost;
  }
  if (iPlayed === scoreOfShapes.Rock && elevPlayed === scoreOfShapes.Scissors ||
    iPlayed === scoreOfShapes.Scissors && elevPlayed === scoreOfShapes.Paper ||
    iPlayed === scoreOfShapes.Paper && elevPlayed === scoreOfShapes.Rock) {
    return scoreOfOutcome.win;
  }
  if (elevPlayed === iPlayed) {
    return scoreOfOutcome.draw;
  }
}

console.log(strategyGuide);
let totalScore = 0;
strategyGuide.forEach(game => {
  const elevPlayed = game.substring(0, 1);
  const iPlayed = game.substring(2, 3);

  const elvesValue = whoPlayedWhat(elevPlayed);
  const iPlayedValue = whoPlayedWhat(iPlayed);
  const winningScore = didIWin(elvesValue, iPlayedValue);
  totalScore += (winningScore + iPlayedValue);
});

console.log('totalScore:', totalScore);