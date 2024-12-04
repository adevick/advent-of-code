const fs = require('fs');
const allContents = fs.readFileSync('puzzleInput.txt', 'utf-8');

const minAllowed = 1;
const maxAllowed = 3;
const incrementIsSafe = (a,b) => {
  const delta = Math.abs(a - b);
  if(delta >= minAllowed && delta <= maxAllowed) {
    return true;
  }
  return false;
}

const isIncreasing = (a,b) => (a < b);
const isDecreasing = (a,b) => (a > b);

let safeReports = 0;
allContents.split(/\r?\n/).forEach((report) => {
  const reportValues = report.split(' ');
  let reportIsSafe = true;
  let reportIsIncreasing = undefined;
  for (let index = 0; index < (reportValues.length -1) && reportIsSafe; index++) {
    const a = Number(reportValues[index]);
    const b = Number(reportValues[(index + 1)]);
    if(incrementIsSafe(a,b)) {
      if(reportIsIncreasing === undefined) {
        reportIsIncreasing = isIncreasing(a,b);
      }
      if(reportIsIncreasing && !isIncreasing(a,b)) {
        reportIsSafe = false;
      } 
      if(!reportIsIncreasing && !isDecreasing(a,b)) {
        reportIsSafe = false;
      }
    } else {
      reportIsSafe = false;
    }
  }
  if(reportIsSafe) {
    safeReports = safeReports + 1;
  }
});

console.log('Answer to part 1: ', safeReports);
