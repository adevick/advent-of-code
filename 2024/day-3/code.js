const fs = require('fs');
const allContents = fs.readFileSync('puzzleInput.txt', 'utf-8');
const mulRegex = /mul\((?:[1-9][0-9]{0,2}|0),(?:[1-9][0-9]{0,2}|0)\)/g;

const matches = allContents.match(mulRegex);

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

function findMatchesInOrder(str) {
  const mulRegexNonGlobal = /mul\((?:[1-9][0-9]{0,2}|0),(?:[1-9][0-9]{0,2}|0)\)/;
  const doRegex = /do\(\)/;
  const doNotRegex = /don't\(\)/;

  const combinedRegex = new RegExp(`${mulRegexNonGlobal.source}|${doRegex.source}|${doNotRegex.source}`, 'g');
  const matches = [];
  let match;

  while ((match = combinedRegex.exec(str)) !== null) {
    if (mulRegexNonGlobal.test(match[0])) {
      matches.push({ match: match[0], regex: 'mulRegex', index: match.index });
    } else if (doRegex.test(match[0])) {
      matches.push({ match: match[0], regex: 'doRegex', index: match.index });
    } else if (doNotRegex.test(match[0])) {
      matches.push({ match: match[0], regex: 'doNotRegex', index: match.index });
    }
  }
  return matches;
}

const test = '-:-]what()(+/mul(957,396)?mul(550,844)%+why())-? #}from()mul(488,628)%} ~**mul(770,931)$~mul(791,733)<{mul(985,350)<#why()don\'t()what()select()$what())]what()who()mul(327,185))<^^mul(542,68)#?who()<from()`';

const results = matches.map(multiply);
const resultPart1 = results.reduce((accumulator, current) => accumulator + current, 0);
console.log('Part1: ', resultPart1);

const sortedMatches = findMatchesInOrder(allContents).sort((a,b) => a.index - b.index );
let doTheThing = true;
const part2Results = sortedMatches.reduce((acc, current) => {
    if(current.regex === 'mulRegex' && doTheThing) {
      acc = acc + multiply(current.match);
    } else if(current.regex === 'doRegex') {
      doTheThing = true;
    } else if(current.regex === 'doNotRegex') {
      doTheThing = false;
    }
    return acc;
}, 0);

console.log('Part2: ', part2Results);
