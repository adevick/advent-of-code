const { readFileSync, promises: fsPromises } = require('fs');
const _ = require("lodash");


function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');
  const arr = contents.split(/\r?\n/);
  return arr;
}

const data = syncReadFile('./input.txt');

const all = data[0].split('');

let count = 1;
let index = 0;
for (let i = 0; i < all.length; i++) {
  const values = [];
  if (count >= 4) {
    values.push(all[index])
    values.push(all[index + 1])
    values.push(all[index + 2])
    values.push(all[index + 3])
    values.push(all[index + 4])
    values.push(all[index + 5])
    values.push(all[index + 6])
    values.push(all[index + 7])
    values.push(all[index + 8])
    values.push(all[index + 9])
    values.push(all[index + 10])
    values.push(all[index + 11])
    values.push(all[index + 12])
    values.push(all[index + 13])
    console.log(values);
    const distinctValues = _.uniq(values);
    distinctValues
    console.log(distinctValues);
    if (distinctValues.length === 14) {
      break;
    }

  }
  count += 1;
  index += 1;

}


console.log(count + 13);

