const fs = require('fs');
const sampleContents = fs.readFileSync('samplePuzzleInput.txt', 'utf-8');
const allContents = fs.readFileSync('puzzleInput.txt', 'utf-8');

let leftRightInstructions = '';
const theMap = [];
const puzzleInput = allContents.split(/\r?\n/);

for (let i = 0; i < puzzleInput.length; i++) {
  const line = puzzleInput[i];
  if (i === 0) {
    leftRightInstructions = line;
  }
  if (i > 1) {
    const key = line.substring(0, 3);
    const left = line.substring(7, 10);
    const right = line.substring(12, 15);
    theMap.push({
      key: key,
      left: left,
      right: right
    });
  }
}
let startingNode = theMap[0].key;
const destinationNode = 'ZZZ';
let steps = 0;
let nextNode = startingNode;
let currentInstructionIndex = 0;
const maxInstructionsIndex = leftRightInstructions.length;

while (nextNode !== destinationNode) {
  if (nextNode === 'MTK') {
    console.log('Should Win');
  }
  steps += 1;
  const direction = leftRightInstructions[currentInstructionIndex];
  if (currentInstructionIndex === maxInstructionsIndex) {
    currentInstructionIndex = -1;
  }
  if (nextNode === 'MTK' && direction === 'R') {
    console.log('Should Win');
  }
  if (direction === 'L') {
    nextNode = theMap.find((x) => x.key === nextNode).left;
  }
  if (direction === 'R') {
    nextNode = theMap.find((x) => x.key === nextNode).right;
  }
  currentInstructionIndex += 1;
}

console.log(steps);
// 12643 part 1