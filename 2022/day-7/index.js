const { readFileSync, promises: fsPromises } = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');
  const arr = contents.split(/\r?\n/);
  return arr;
}

const data = syncReadFile('./input.txt');

function changeDirectory(arg) {
  switch (arg) {
    case '..':
      path = getParentPath(path);
      break;
    case '/':
      path = '/'
      break;
    default:
      path = path.concat(arg, '/');
      break;
  }
}

function readCommand(command) {
  if (command.substring(2, 4) === 'cd') {
    changeDirectory(command.substring(5, command.length))
  }
};

function createFile(fileInfo) {
  return {
    name: fileInfo[1],
    size: Number(fileInfo[0])
  }
}

function readOutput(outPut) {
  if (outPut.substring(0, 3) === 'dir') {
    return outPut.substring(4, outPut.length);
  }
  return createFile(outPut.split(' '))
};

class directory {

  constructor(path) {
    this.path = path;
    this.files = [];
  }

  getTotal() {
    let totalSize = 0
    if (this.files.length === 0) {
      return 0;
    }
    this.files.forEach(x => {
      totalSize += x.size;
    });

    return totalSize;
  }
}

let fileSystem = [];
let path = '/';
let homeDir = new directory('/');

fileSystem.push(homeDir)

data.forEach(line => {
  if (line[0] === '$') {
    readCommand(line);
    return;
  }
  const fileOrDir = readOutput(line);
  console.log('pathBeforeReadingOutput', path);
  if (typeof fileOrDir === 'string' || fileOrDir instanceof String) {
    if (fileOrDir === '/') {
      return;
    }
    let newDir = new directory(path.concat(fileOrDir, '/'));
    fileSystem.push(newDir);
  } else {
    addFileToFileSystem(fileOrDir, path);
  }
});

function addFileToFileSystem(file, currentPath) {
  const directory = fileSystem.find((dir) => dir.path === currentPath);
  directory.files.push(file);
  if (currentPath !== '/') {
    const parentPath = getParentPath(currentPath);
    addFileToFileSystem(file, parentPath);
  }
}

function getParentPath(path) {
  const pathsArr = path.split('/');
  pathsArr.pop();
  pathsArr.pop();
  pathsArr.push('');
  const parentPathArr = pathsArr;
  if (parentPathArr.length === 2 || path === '/') {
    return '/'
  }
  return parentPathArr.join('/')
}

let grandTotal = 0;
let allDirs = [];
const part2 = true;
fileSystem.forEach(dir => {
  const dirName = dir.path;
  const dirTotalSize = dir.getTotal()
  if (dirTotalSize <= 100000) {
    grandTotal += dirTotalSize;
  }
  if (part2) {
    allDirs.push({
      path: dirName,
      size: dirTotalSize
    })
  }

});

console.log('Total size of dir\'s at least 100000: ', grandTotal);

const maxSpaceOnHardware = 70000000;
const spaceRequired = 30000000;
const spaceUsed = homeDir.getTotal();
const freeSpace = maxSpaceOnHardware - spaceUsed;
const spaceNeeded = spaceRequired - freeSpace;

console.log('spaceNeeded', spaceNeeded.toLocaleString());
allDirs.sort((a, b) => a.size - b.size);

for (let i = 0; i < allDirs.length; i++) {
  const dir = allDirs[i];
  if (dir.size >= spaceNeeded) {
    console.log('Found it: ', dir.size);
    console.log('Found it: ', dir.size.toLocaleString());
    break;
  }
}


