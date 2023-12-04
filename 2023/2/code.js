const fs = require('fs');
const allContents = fs.readFileSync('puzzleInput.txt', 'utf-8');
const games = [];
allContents.split(/\r?\n/).forEach((line) => {
  const valuesOfGame = line.split(':')[1];
  games.push([...valuesOfGame.split(';')])
});

const actualCubesInBag = {
  red: 12,
  blue: 14,
  green: 13
}

const getMaxes = (game) => {
  const maxes = {
    red: 0,
    blue: 0,
    green: 0
  }

  game.forEach(value => {
    const values = value.split(',');
    values.forEach(pair => {
      const data = pair.trim().split(' ');
      const numberOfCubes = Number(data[0]);
      const color = data[1];
      if (maxes[color] < numberOfCubes) {
        maxes[color] = numberOfCubes;
      }
    });
  });
  return maxes;
}

const isGamePossible = (game) => {
  const maxes = getMaxes(game);
  return maxes.red <= actualCubesInBag.red &&
    maxes.blue <= actualCubesInBag.blue &&
    maxes.green <= actualCubesInBag.green;
}

const getPowerOfGame = (game) => {
  const maxes = getMaxes(game);
  return maxes.blue * maxes.green * maxes.red;
}

let answer = 0;
let answer2 = 0;
games.forEach((game, i) => {
  const isPossible = isGamePossible(game)
  if (isPossible) {
    answer += i + 1;
  }
  answer2 += getPowerOfGame(game)
});

console.log(answer);
console.log(answer2);

