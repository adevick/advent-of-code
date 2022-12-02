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

function whatShouldIDo(value) {
  if (value === 'X') {
    return 'lose';
  }
  if (value === 'Y') {
    return 'draw';
  }
  if (value === 'Z') {
    return 'win';
  }
};

function getMyNewStrategy(elevPlayed, iShould) {
  if (iShould === 'lose') {
    return lose(elevPlayed);
  }
  if (iShould === 'draw') {
    return elevPlayed;
  }
  if (iShould === 'win') {
    return win(elevPlayed);
  }
}

function win(elevPlayed) {
  if (elevPlayed === scoreOfShapes.Rock) {
    return scoreOfShapes.Paper;
  }
  if (elevPlayed === scoreOfShapes.Paper) {
    return scoreOfShapes.Scissors;
  }
  if (elevPlayed === scoreOfShapes.Scissors) {
    return scoreOfShapes.Rock;
  }
}

function lose(elevPlayed) {
  if (elevPlayed === scoreOfShapes.Rock) {
    return scoreOfShapes.Scissors;
  }
  if (elevPlayed === scoreOfShapes.Paper) {
    return scoreOfShapes.Rock;
  }
  if (elevPlayed === scoreOfShapes.Scissors) {
    return scoreOfShapes.Paper;
  }
}

console.log(strategyGuide);

let totalScore = 0;

strategyGuide.forEach(game => {
  const elevPlayed = game.substring(0, 1);
  const iPlayed = game.substring(2, 3);
  const newStrategy = true;
  const elvesValue = whoPlayedWhat(elevPlayed);
  let iPlayedValue = whoPlayedWhat(iPlayed);
  if (newStrategy) {
    const iShould = whatShouldIDo(iPlayed);
    iPlayedValue = getMyNewStrategy(elvesValue, iShould)
  }
  
  const winningScore = didIWin(elvesValue, iPlayedValue);
  totalScore += (winningScore + iPlayedValue);

});

console.log('totalScore:', totalScore);