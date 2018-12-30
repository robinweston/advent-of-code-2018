const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const readInput = () => {
  const filePath = path.join(__dirname, "input.txt");
  return fs.readFileSync(filePath, "utf8");
};

const parseInput = input => {
  const initialState = input[0].replace("initial state: ", "");

  const rules = new Map();
  for (let i = 2; i < input.length; i++) {
    const line = input[i];
    const pattern = line.substring(0, 5);
    const result = line.substring(9, 10);
    rules.set(pattern, result);
  }

  return {
    initialState,
    rules
  };
};

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, "g"), replacement);
};

const input = readInput();
const parsedInput = parseInput(input.split(/\r\n|\n/));

const generateNextGeneration = state => {
  let nextPlants = state.plants;
  let nextPlantZeroIndex = state.plantZeroIndex;

  const leftMostPlant = nextPlants.indexOf("#");
  if (leftMostPlant < 5) {
    const potsToAdd = 5 - leftMostPlant;
    nextPlants = _.repeat(".", potsToAdd) + nextPlants;
    nextPlantZeroIndex += potsToAdd;
  }
  const rightMostPlant = nextPlants.lastIndexOf("#");
  if (rightMostPlant > nextPlants.length - 5) {
    const potsToAdd = nextPlants.length - rightMostPlant + 5;
    nextPlants = nextPlants + _.repeat(".", potsToAdd);
  }

  const nextGeneration = _.fill(new Array(nextPlants.length), ".");

  for (let i = 0; i < nextPlants.length - 5; i++) {
    const nextFive = nextPlants.substring(i, i + 5);
    const matchedRule = parsedInput.rules.get(nextFive);
    nextGeneration[i + 2] =
      matchedRule === "#" ? "#" : ".";
  }
  nextPlants = nextGeneration.join("");
  return {
    plants: nextPlants,
    plantZeroIndex: nextPlantZeroIndex
  };
};

const calculateScore = state => {
  let score = 0;
  const plantsArray = Array.from(state.plants);
  for (let i = 0; i < plantsArray.length; i++) {
    if (plantsArray[i] === "#") {
      score += i - state.plantZeroIndex;
    }
  }
  return score;
};

const growPlants = generations => {
  let state = {
    plants: parsedInput.initialState,
    plantZeroIndex: 0
  };
  for (let generation = 1; generation <= generations; generation++) {
    if (generation % 10000 === 0) {
      console.log(`At generation ${generation}`);
    }
    state = generateNextGeneration(state);
    const score = calculateScore(state);
    console.log(`Generation ${generation}. Score ${score}`)
  }

  return calculateScore(state);
};

const part1 = () => {
  const score = growPlants(20);
  console.log(`Part 1: ${score}`);
};

const part2 = () => {
  const score200 = growPlants(200);
  const score201 = growPlants(201);
  const diff = score201 - score200;
  const answer = ((50000000000 - 200) * diff) + score200;
  console.log(`Part 2: ${answer}`);
};

part1();
part2();
