
const { readFileSync, promises: fsPromises } = require('fs');
const _ = require("lodash");

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');
  const arr = contents.split(/\r?\n/);
  return arr;
}

const moves = syncReadFile('./input.txt');


function getMoveObjects(movesArray) {
  let moves = [];
  movesArray.forEach((move) => {
    const value = move.split(' ');
    const moveObject = {
      direction: value[0],
      distance: Number(value[1])
    }
    moves.push(moveObject);
  });
  return moves;
}

const allMoves = getMoveObjects(moves);
let tailVisits = [];
let headPosition = {
  x: 0,
  y: 0
};
let tailPosition = {
  x: 0,
  y: 0
};
tailVisits.push({ x: tailPosition.x, y: tailPosition.y });

function move(direction, currentPosition) {
  switch (direction) {
    case 'U':
      currentPosition.y += 1;
      break;
    case 'D':
      currentPosition.y -= 1;
      break;
    case 'L':
      currentPosition.x -= 1;
      break;
    case 'R':
      currentPosition.x += 1;
      break;
  }
  return currentPosition;
}

function moveDiagonally(head, tail) {

  const xDiff = head.x - tail.x;
  const yDiff = head.y - tail.y;

  if (xDiff > 0 && yDiff > 0) {
    tail = move('U', tail);
    tail = move('R', tail);
  }
  if (xDiff > 0 && yDiff < 0) {
    tail = move('D', tail);
    tail = move('R', tail);
  }
  if (xDiff < 0 && yDiff > 0) {
    tail = move('U', tail);
    tail = move('L', tail);
  }
  if (xDiff < 0 && yDiff < 0) {
    tail = move('D', tail);
    tail = move('L', tail);
  }
  return tail;
}

function diff(x1, x2) {
  return Math.abs(x2 - x1)
}


allMoves.forEach(step => {
  for (let i = 0; i < step.distance; i++) {
    headPosition = move(step.direction, headPosition);
    const changeInX = diff(headPosition.x, tailPosition.x);
    const changeInY = diff(headPosition.y, tailPosition.y);

    if (changeInX === 0 && changeInY === 2 ||
      changeInX === 2 && changeInY === 0) {
      tailPosition = move(step.direction, tailPosition);
      tailVisits.push({ x: tailPosition.x, y: tailPosition.y });
    }

    if (changeInX === 1 && changeInY === 2 ||
      changeInX === 2 && changeInY === 1) {
      tailPosition = moveDiagonally(headPosition, tailPosition);
      tailVisits.push({ x: tailPosition.x, y: tailPosition.y });
    }
  }
});

const distinctVisits = _.uniqWith(tailVisits, _.isEqual);

console.log(distinctVisits);
console.log('Number of positions tail visited: ', distinctVisits.length);





