const { readFileSync, promises: fsPromises } = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');
  const arr = contents.split(/\r?\n/);
  return arr;
}

const data = syncReadFile('./input.txt');



console.log(data);


function getSingleStack(substringStart, substringEnd, data) {
  const stack = [];
  for (let i = 0; i < 9; i++) {
    if (data[i].substring(substringStart, substringEnd) !== ' ') {
      stack.push(data[i].substring(substringStart, substringEnd));
    }
  }
  return stack;
}

function getAllStacks() {
  let startingIndex = 1;
  let endingIndex = 2;
  let allStacks = [];
  for (let i = 0; i < 9; i++) {
    const stack = getSingleStack(startingIndex, endingIndex, data);
    allStacks.push(stack);
    startingIndex += 4;
    endingIndex += 4;
  }
  return allStacks;
}

function getCraneMoves() {
  const craneMoves = []
  for (let i = 10; i < data.length; i++) {
    const craneMove = data[i];
    const moveArray = craneMove.split(' ');
    craneMoves.push(moveArray);
  }
  return craneMoves;
}

const stacks = getAllStacks();
console.log(stacks);
const craneMoves = getCraneMoves();

craneMoves.forEach(move => {
  const cratesToMove = Number(move[1]);
  const fromStack = (Number(move[3]) - 1);
  const toStack = (Number(move[5]) - 1);

  for (let crate = 0; crate < cratesToMove; crate++) {
    const crateToMove = stacks[fromStack].shift();
    stacks[toStack].unshift(crateToMove);
  }
});

for (let i = 0; i < stacks.length; i++) {
  const element = stacks[i];
  const topCrate = element[0];
  console.log(topCrate);
}
