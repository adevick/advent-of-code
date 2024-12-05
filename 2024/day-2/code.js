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

const getReportSafety = (reportValues) => {
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
  return reportIsSafe;
}

const applyDampener = (reportValues) => {
  const reportLength = reportValues.length;
  const dampenedReports = [];
  let reportSafe = false;
  for (let index = 0; index < reportLength; index++) {
    const element = reportLength;
    const removedValue = reportValues.splice(index, 1)[0];
    const isReportSafe = getReportSafety(reportValues);
    if(isReportSafe) {
      reportSafe = true;
      break;
    }
    reportValues.splice(index, 0, removedValue);
  }
  return reportSafe;
};

let safeReports = 0;
allContents.split(/\r?\n/).forEach((report) => {
  const reportValues = report.split(' ');
  const reportIsSafe = getReportSafety(reportValues);
  if(reportIsSafe) {
    safeReports = safeReports + 1;
    return;
  } else {
    const isReportSafeWithDampener = applyDampener(reportValues);
    if(isReportSafeWithDampener) {
      safeReports = safeReports + 1;
    }
  }
});

console.log('Answer to part 2: ', safeReports);
