const { readFileSync, promises: fsPromises } = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');
  const arr = contents.split(/\r?\n/);
  return arr;
}

const treeRows = syncReadFile('./input.txt');

console.log('trees', treeRows);

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

console.log('Trees that can bee seen: ', treesThatCanBeeSeen);
console.log('Total Visible trees: ', treesThatCanBeeSeen.length);

