const fs = require('fs');
const wordSearch = fs.readFileSync('puzzleInput.txt', 'utf-8');
const wordToFind = 'XMAS';
const lines = wordSearch.split(/\r?\n/);
const maxWidthIndex = lines[0].length - 1;
const maxHeightIndex = lines.length - 1;
const test = lines[maxHeightIndex][maxWidthIndex];

const testInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`

const testLines = testInput.split(/\r?\n/);
const tracked = [];

const searchForWord = (lines,x,y) => {
  if(lines[x][y] === 'X') {
    let count = 0; 
    const forward = `${lines[x][y]}${lines[x][y+1]}${lines[x][y+2]}${lines[x][y+3]}` ?? '';
    const backward = `${lines[x][y]}${lines[x][y-1]}${lines[x][y-2]}${lines[x][y-3]}` ?? '';
    let down = '';
    let up = '';
    let upLeft = '';
    let upRight = '';
    let downLeft = '';
    let downRight = '';
    if(lines[x+3]) {
      down = `${lines[x][y]}${lines[x+1][y]}${lines[x+2][y]}${lines[x+3][y]}` ?? '';
      downLeft = `${lines[x][y]}${lines[x+1][y-1]}${lines[x+2][y-2]}${lines[x+3][y-3]}` ?? '';
      downRight = `${lines[x][y]}${lines[x+1][y+1]}${lines[x+2][y+2]}${lines[x+3][y+3]}` ?? '';
    }
    if(lines[x-3]) {
      up = `${lines[x][y]}${lines[x-1][y]}${lines[x-2][y]}${lines[x-3][y]}` ?? '';
      upLeft = `${lines[x][y]}${lines[x-1][y-1]}${lines[x-2][y-2]}${lines[x-3][y-3]}` ?? '';
      upRight = `${lines[x][y]}${lines[x-1][y+1]}${lines[x-2][y+2]}${lines[x-3][y+3]}` ?? '';
    }
    [forward, backward, down, up, upLeft, upRight, downLeft, downRight].forEach((option) => {
      if(option.includes('XMAS')) {
        count = count + 1;
      }
    })
    return count;
  }
}

const searchForXMas = (lines,x,y) => {
  if(lines[x][y] === 'A') {
    let count = 0;
    let upLeft = '';
    let upRight = '';
    let downLeft = '';
    let downRight = '';
    if(lines[x+1] && lines[x-1]) {
      crossA = `${lines[x-1][y-1]}${lines[x][y]}${lines[x+1][y+1]}` ?? '';
      crossB = `${lines[x+1][y-1]}${lines[x][y]}${lines[x-1][y+1]}` ?? '';
    }
    if((crossA.includes('MAS') || crossA.includes('SAM')) && (crossB.includes('MAS') || crossB.includes('SAM'))) {
      count = count + 1;
    }
    return count;
  }
}

let total = 0;
for (let x = 0; x < lines.length; x++) {
  for (let y = 0; y < lines[x].length; y++) {
    const result = searchForWord(lines,x,y);
    if(result) {
      total = total + result;
    }
  }
}
let partTwoTotal = 0;
for (let x = 0; x < lines.length; x++) {
  for (let y = 0; y < lines[x].length; y++) {
    if(x === 0 || x === maxHeightIndex || y === 0 || y === maxWidthIndex) {
      continue;
    }
    // console.log(x,y);
    const result = searchForXMas(lines,x,y);
    if(result) {
      partTwoTotal = partTwoTotal + result;
    }
  }
}

console.log('Part 1: ', total);
console.log('Part 2: ', partTwoTotal);