const { readFileSync, promises: fsPromises } = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');
  const arr = contents.split(/\r?\n/);
  return arr;
}

const rucksacks = syncReadFile('./input.txt');

function splitAndFindSharedItem(ruckSack) {
  const itemsInCompartment1 = ruckSack.slice(0, (ruckSack.length / 2));
  const itemsInCompartment2 = ruckSack.slice(ruckSack.length / 2);

  for (let i = 0; i < itemsInCompartment1.length; i++) {
    const sharedItem = itemsInCompartment2.search(itemsInCompartment1[i]);
    if (sharedItem !== -1) {
      return itemsInCompartment2.substring(sharedItem, (sharedItem + 1))
    }
  }

};

const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
]

function getPriorityGuide() {
  let priorityGuide = [];
  let countLower = 1;
  let countHigher = 27;
  alphabet.forEach(letter => {
    priorityGuide.push({ priority: countLower, letter: letter });
    priorityGuide.push({ priority: countHigher, letter: letter.toUpperCase() });
    countLower += 1;
    countHigher += 1;
  });
  return priorityGuide;
}

function getPriorityScore(item, priorityGuide) {
  const priority = priorityGuide.find((x) => x.letter === item);
  console.log(priority);
  return priority.priority;
}

function getGroupSharedItem(elevGroup) {
  console.log(elevGroup.length);
  const elev1 = elevGroup[0];
  const elev2 = elevGroup[1];
  const elev3 = elevGroup[2];

  console.log('elevGroup');
  console.log(elev1);
  console.log(elev2);
  console.log(elev3);

  for (let i = 0; i < elev1.length; i++) {
    const sharedItem = elev2.search(elev1[i]);
    if (sharedItem !== -1) {
      const itemTheyAllShare = elev3.search(elev2.substring(sharedItem, (sharedItem + 1)));
      if (itemTheyAllShare !== -1) {
        return elev3.substring(itemTheyAllShare, (itemTheyAllShare + 1));
      }
    }
  }
}

let totalScore = 0;
const part2 = true;
let elevGroup = [];
let groupCount = 0;
const priorityGuide = getPriorityGuide();
rucksacks.forEach((rucksack, index) => {
  let sharedItemFound = '';
  if (part2) {
    groupCount++;
    elevGroup.push(rucksacks[index]);
    if (groupCount === 3) {
      sharedItemFound = getGroupSharedItem(elevGroup);
      const priority = getPriorityScore(sharedItemFound, priorityGuide);
      totalScore += priority;
      groupCount = 0;
      elevGroup = [];
    }
  } else {
    sharedItemFound = splitAndFindSharedItem(rucksack);
    const priority = getPriorityScore(sharedItemFound, priorityGuide);
    totalScore += priority;
  }
});

console.log('Total Score:', totalScore);