const fs = require('fs');
const allContents = fs.readFileSync('puzzleInput.txt', 'utf-8');
allContents.split(/\r?\n/).forEach((line) => {
  console.log(line);
});