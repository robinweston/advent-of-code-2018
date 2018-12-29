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

const calculateGridPowerLevel = (topX, topY, serialNumber, gridSize) => {
  let sum = 0;
  for (let x = topX; x < topX + gridSize; x++) {
    for (let y = topY; y < topY + gridSize; y++) {
      sum += calculateSinglePowerLevel(x, y, serialNumber);
    }
  }
  return sum;
};

const findHighestGridPowerLevel = (serialNumber, gridSize) => {
  let max = null;
  for (let x = 0; x <= 300 - gridSize; x++) {
    for (let y = 0; y <= 300 - gridSize; y++) {
      const gridTotalPower = calculateGridPowerLevel(
        x,
        y,
        serialNumber,
        gridSize
      );
      if (!max || gridTotalPower > max.maxValue) {
        max = {
          coord: `${x},${y},${gridSize}`,
          maxValue: gridTotalPower
        };
      }
    }
  }

  console.log(`Finished grid size ${gridSize}. Max is ${JSON.stringify(max)}`);
  return max;
};

const findHighestPowerLevelForAnyGrid = serialNumber => {
  let max = null;
  for (let gridSize = 1; gridSize <= 300; gridSize++) {
    const gridPowerLevel = findHighestGridPowerLevel(serialNumber, gridSize);
    if (!max || gridPowerLevel.maxValue > max.maxValue) {
      max = gridPowerLevel;
    }
  }

  console.log(
    `Highest power level for serial ${serialNumber}: ${JSON.stringify(max)}`
  );
};

const part1 = () => {
  console.log("Part 1:");
  findHighestGridPowerLevel(18, 3);

  cachedSinglePowerLevels.clear();
  findHighestGridPowerLevel(42, 3);

  cachedSinglePowerLevels.clear();
  findHighestGridPowerLevel(5791, 3);
};

const part2 = () => {
  console.log("Part 2:");
  cachedSinglePowerLevels.clear();
  findHighestPowerLevelForAnyGrid(5791);
};

part1();
part2();
