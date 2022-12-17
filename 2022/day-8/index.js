const { readFileSync, promises: fsPromises } = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');
  const arr = contents.split(/\r?\n/);
  return arr;
}

const treeRows = syncReadFile('./input.txt');

// console.log('trees', treeRows);

function visibleFromLeftToRight(rowOfTrees, maxTreeHightForRow, forward) {
  let tallestTreeSoFar = 0;
  for (let i = 0; i < rowOfTrees.length; i++) {
    if (forward) {
      y = i;
    } else {
      y = ((rowOfTrees.length - 1) - i)
    }
    const currentTree = rowOfTrees[i];
    if (i === 0) { // first Tree is always visible
      tallestTreeSoFar = currentTree
      addTree();
      continue;
    }
    if (currentTree === maxTreeHightForRow.toString()) {
      addTree();
      break;
    }
    if (currentTree > tallestTreeSoFar && currentTree < maxTreeHightForRow) {
      tallestTreeSoFar = currentTree;
      addTree();
    }
  }
}

function visibleTreesByColumns(rowOfTrees, maxTreeHightForRow, forward) {
  let tallestTreeSoFar = 0;
  for (let i = 0; i < rowOfTrees.length; i++) {
    if (forward) {
      x = i;
    } else {
      x = ((rowOfTrees.length - 1) - i)
    }
    const currentTree = rowOfTrees[i];
    if (i === 0) { // first Tree is always visible
      tallestTreeSoFar = currentTree
      addTree();
      continue;
    }
    if (currentTree === maxTreeHightForRow.toString()) {
      addTree();
      break;
    }
    if (currentTree > tallestTreeSoFar && currentTree < maxTreeHightForRow) {
      tallestTreeSoFar = currentTree;
      addTree();
    }
  }
}

function addTree() {
  const found = treesThatCanBeeSeen.find((tree) => tree.x === x && tree.y === y);
  if (!found) {
    treesThatCanBeeSeen.push({ x: x, y: y });
  }
}

let x = 0;
let y = 0;
let treesThatCanBeeSeen = [];
let topToBottomTrees = [];
let treeGrid = [];

for (let i = 0; i < treeRows.length; i++) {
  const row = treeRows[i];
  x = i;
  const maxTreeHightForRow = Math.max(...row);
  const rowLeftToRight = row.split('');
  visibleFromLeftToRight(rowLeftToRight, maxTreeHightForRow, true);

  const rowRightToLeft = row.split('').reverse();
  visibleFromLeftToRight(rowRightToLeft, maxTreeHightForRow, false);
  topToBottomTrees[i] = '';
}

for (let i = 0; i < treeRows.length; i++) {
  const row = treeRows[i];
  const cells = row.split('');
  for (let c = 0; c < cells.length; c++) {
    const cell = cells[c];
    topToBottomTrees[c] += cell;
  }
}

for (let i = 0; i < topToBottomTrees.length; i++) {
  const column = topToBottomTrees[i];
  y = i;
  const maxTreeHightForRow = Math.max(...column);
  const topTopBottom = column.split('');
  visibleTreesByColumns(topTopBottom, maxTreeHightForRow, true);

  const bottomToTop = column.split('').reverse();
  visibleTreesByColumns(bottomToTop, maxTreeHightForRow, false);
}

x = 0
y = 0
const gridHeight = treeRows.length;
const gridWidth = treeRows[0].split('').length;
for (let i = 0; i < treeRows.length; i++) {

  const row = treeRows[i];
  y = i;
  const rowLeftToRight = row.split('');
  for (let index = 0; index < rowLeftToRight.length; index++) {
    x = index;
    const tree = rowLeftToRight[index];
    treeGrid.push({ x: x, y: y, treeHeight: Number(tree), up: 0, down: 0, left: 0, right: 0 })
  }
}


let bestScenicScore = 0;
treeGrid.forEach(tree => {
  tree.up = getUpScore(tree);
  tree.down = getDownScore(tree);
  tree.left = getLeftScore(tree);
  tree.right = getRightScore(tree);
  const scenicScore = (tree.up * tree.down * tree.left * tree.right);
  if (bestScenicScore < scenicScore) {
    bestScenicScore = scenicScore;
  }
});

function getUpScore(tree) {
  let upScore = 0;
  for (let index = tree.y - 1; index >= 0; index--) {
    const northTree = treeGrid.find((someTree) => someTree.x === tree.x && someTree.y === index);
    if (northTree.treeHeight < tree.treeHeight) {
      upScore += 1;
    } else {
      if (northTree.treeHeight >= tree.treeHeight) {
        upScore += 1;
        break;
      }
    }
  }
  return upScore;
}

function getDownScore(tree) {
  let downScore = 0;
  for (let index = tree.y + 1; index < gridHeight; index++) {
    const southTree = treeGrid.find((someTree) => someTree.x === tree.x && someTree.y === index);
    if (southTree.treeHeight < tree.treeHeight) {
      downScore += 1;
    } else {
      if (southTree.treeHeight >= tree.treeHeight) {
        downScore += 1;
        break;
      }
    }
  }
  return downScore;
}

function getLeftScore(tree) {
  let leftScore = 0;
  for (let index = tree.x - 1; index >= 0; index--) {
    const westTree = treeGrid.find((someTree) => someTree.x === index && someTree.y === tree.y);
    if (westTree.treeHeight < tree.treeHeight) {
      leftScore += 1;
    } else {
      if (westTree.treeHeight >= tree.treeHeight) {
        leftScore += 1;
        break;
      }
    }
  }
  return leftScore;
}

function getRightScore(tree) {
  let rightScore = 0;
  for (let index = tree.x + 1; index < gridWidth; index++) {
    const eastTree = treeGrid.find((someTree) => someTree.x === index && someTree.y === tree.y);
    if (eastTree.treeHeight < tree.treeHeight) {
      rightScore += 1;
    } else {
      if (eastTree.treeHeight >= tree.treeHeight) {
        rightScore += 1;
        break;
      }
    }
  }
  return rightScore;
}

// console.log('Trees that can bee seen: ', treesThatCanBeeSeen);
console.log('Total Visible trees: ', treesThatCanBeeSeen.length);
console.log('The Best Scenic Score is: ',bestScenicScore);


