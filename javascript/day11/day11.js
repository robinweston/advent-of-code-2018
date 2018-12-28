const fs = require("fs");
const path = require("path");
const _ = require("lodash");

function getDigit(number, n) {
  return Math.floor((number / Math.pow(10, n - 1)) % 10);
}

const cachedSinglePowerLevels = new Map();
const calculateSinglePowerLevel = (x, y, serialNumber) => {
  const cacheKey = `${x},${y}`;
  if (cachedSinglePowerLevels.has(cacheKey)) {
    return cachedSinglePowerLevels.get(cacheKey);
  }
  const rackId = x + 10;
  let powerLevel = rackId * y;
  powerLevel += serialNumber;
  powerLevel *= rackId;
  powerLevel = getDigit(powerLevel, 3);
  powerLevel -= 5;

  cachedSinglePowerLevels.set(cacheKey, powerLevel);

  return powerLevel;
};


const calculate3x3PowerLevel = (topX, topY, serialNumber) => {
  let sum = 0;
  for (let x = topX; x < topX + 3; x++) {
    for (let y = topY; y < topY + 3; y++) {
      sum += calculateSinglePowerLevel(x, y, serialNumber);
    }
  }
  return sum;
};

const cached3x3PowerLevels = new Map();
const findHighestPowerLevel = serialNumber => {
  cachedSinglePowerLevels.clear();
  cached3x3PowerLevels.clear();

  for (let x = 0; x <= 300 - 3; x++) {
    for (let y = 0; y <= 300 - 3; y++) {
      const powerLevelFor3x3 = calculate3x3PowerLevel(x, y, serialNumber);
      cached3x3PowerLevels.set(`${x},${y}`, powerLevelFor3x3);
    }
  }

  const highest =  _.maxBy(Array.from(cached3x3PowerLevels.entries()), e => e[1]);
  console.log(`Highest power level for serial ${serialNumber}: ${highest}`)
};

const part1 = () => {
  console.log("Part 1:");
  findHighestPowerLevel(18);
  findHighestPowerLevel(42);
  findHighestPowerLevel(5791);
};

const part2 = () => {
  console.log("Part 2:");
};

part1();
part2();
