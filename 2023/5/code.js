const fs = require('fs');
const sampleContents = fs.readFileSync('samplePuzzleInput.txt', 'utf-8');
const allContents = fs.readFileSync('puzzleInput.txt', 'utf-8');
const data = [];

let seeds = [];
let seedToSoil = [];
let soilToFertilizer = [];
let fertilizerToWater = [];
let waterToLight = [];
let lightToTemp = [];
let tempToHumidity = [];
let humidityToLocation = [];

let mapId = 0;
allContents.split(/\r?\n/).forEach((line) => {
  if (line.includes('seeds:')) {
    seeds = line.split(':')[1].split(' ').filter((x) => x !== '');
  }
  if (line === '') {
    mapId += 1;
    return;
  }
  if (mapId === 1 && !line.includes('map:')) {
    const data = line.split(' ');
    seedToSoil.push({
      destinationRangeStart: Number(data[0]),
      sourceRangeStart: Number(data[1]),
      rangeLength: Number(data[2])
    })
  }
  if (mapId === 2 && !line.includes('map:')) {
    const data = line.split(' ');
    soilToFertilizer.push({
      destinationRangeStart: Number(data[0]),
      sourceRangeStart: Number(data[1]),
      rangeLength: Number(data[2])
    })
  }
  if (mapId === 3 && !line.includes('map:')) {
    const data = line.split(' ');
    fertilizerToWater.push({
      destinationRangeStart: Number(data[0]),
      sourceRangeStart: Number(data[1]),
      rangeLength: Number(data[2])
    })
  }
  if (mapId === 4 && !line.includes('map:')) {
    const data = line.split(' ');
    waterToLight.push({
      destinationRangeStart: Number(data[0]),
      sourceRangeStart: Number(data[1]),
      rangeLength: Number(data[2])
    })
  }
  if (mapId === 5 && !line.includes('map:')) {
    const data = line.split(' ');
    lightToTemp.push({
      destinationRangeStart: Number(data[0]),
      sourceRangeStart: Number(data[1]),
      rangeLength: Number(data[2])
    })
  }
  if (mapId === 6 && !line.includes('map:')) {
    const data = line.split(' ');
    tempToHumidity.push({
      destinationRangeStart: Number(data[0]),
      sourceRangeStart: Number(data[1]),
      rangeLength: Number(data[2])
    })
  }
  if (mapId === 7 && !line.includes('map:')) {
    const data = line.split(' ');
    humidityToLocation.push({
      destinationRangeStart: Number(data[0]),
      sourceRangeStart: Number(data[1]),
      rangeLength: Number(data[2])
    })
  }
});
const farmProcess = [seedToSoil, soilToFertilizer, fertilizerToWater, waterToLight, lightToTemp, tempToHumidity, humidityToLocation];


const getValue = (seed, map) => {
  let next = null;
  map.forEach(x => {
    // console.log(`${x.sourceRangeStart} <= ${Number(seed)} && ${Number(seed)} <= (${x.sourceRangeStart + x.rangeLength})`);
    if (x.sourceRangeStart <= Number(seed) && Number(seed) <= (x.sourceRangeStart + x.rangeLength)) {
      const valueToAdd = Math.abs(x.sourceRangeStart - Number(seed));
      // console.log('Result', x.destinationRangeStart, valueToAdd);
      next = x.destinationRangeStart + valueToAdd;
    }
  });
  return next ?? seed;
}

// [
//   {
//     destinationRangeStart: '50',
//     sourceRangeStart: '98',
//     rangeLength: '2'
//   },
//   {
//     destinationRangeStart: '52',
//     sourceRangeStart: '50',
//     rangeLength: '48'
//   }
// ],

const seedLocations = [];
seeds.forEach(seed => {
  let nextValue = seed;
  farmProcess.forEach(map => {
    nextValue = getValue(nextValue, map);
  });
  seedLocations.push(nextValue);
});

console.log(Math.min(...seedLocations));
// console.log(farmProcess)