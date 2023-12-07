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

const seedsPart2 = [];


const getLocation = (seed) => {
  nextValue = seed;
  farmProcess.forEach(map => {
    nextValue = getValue(nextValue, map);
  });
  return nextValue;
}


const getSeedLocation = (element, length) => {
  let lowestLocation = 999999999999;
  return new Promise((resolve, reject) => {
    console.log('Starting seed: ', element, 'with length: ', length);
    for (let index = 0; index < length; index++) {
      const location = getLocation(`${element + index}`);
      if (Number(location) < Number(lowestLocation)) {
        console.log('next lowest: ', location);
        lowestLocation = Number(location);
      }
    }
    seedsPart2.push(lowestLocation);
    console.log('Found Lowest: ', lowestLocation, 'Seed', element);
    resolve();
  });

}

const seedSets = [];
for (let i = 0; i < seeds.length; i += 2) {
  const element = Number(seeds[i]);
  const length = Number(seeds[i + 1]);
  seedSets.push({ element: element, length: length });
  // const seedLoc = getSeedLocation(element, length);
}

const things = [];

const process = async () => {
  seedSets.forEach(element => {
    const a = getSeedLocation(element.element, element.length);
    console.log('promise added');
    things.push(a);
  });

  return await Promise.all(...things);
}

process();

// const seedLocations = [];
// seeds.forEach(seed => {
//   let nextValue = seed;
//   farmProcess.forEach(map => {
//     nextValue = getValue(nextValue, map);
//   });
//   seedLocations.push(nextValue);
// });

// console.log(Math.min(...seedLocations));
// console.log(farmProcess)
// console.log('seeds', seeds);

// const seedLocations2 = [];
// seedsPart2.forEach(seed => {
//   let nextValue = `${seed}`;
//   farmProcess.forEach(map => {
//     nextValue = getValue(nextValue, map);
//   });
//   seedLocations2.push(nextValue);
// });

console.log('lowestLocations: ', seedsPart2);
console.log('lowest: ', Math.min(...seedsPart2));
// console.log(Math.min(...seedLocations2));


//107262262
//44334822
//895525633
//88490186
//15290097
//121383181
//492876977
//238619228
//90823162