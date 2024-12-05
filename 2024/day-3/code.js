const fs = require('fs');
const allContents = fs.readFileSync('puzzleInput.txt', 'utf-8');
const regex = /mul\((?:[1-9][0-9]{0,2}|0),(?:[1-9][0-9]{0,2}|0)\)/g;

const matches = allContents.match(regex);

const multiply = (instruction) => {
    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    let match;
  
    while ((match = regex.exec(instruction)) !== null) {
      const num1 = parseInt(match[1], 10);
      const num2 = parseInt(match[2], 10);
  
      if (num1 >= 1 && num1 <= 999 && num2 >= 1 && num2 <= 999) {
        return num1 * num2;
      }
    }
}

const results = matches.map(multiply);
const resultPart1 = results.reduce((accumulator, current) => accumulator + current, 0);
console.log(resultPart1);