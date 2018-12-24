const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const readInput = () => {
  const filePath = path.join(__dirname, "input.txt");
  return fs.readFileSync(filePath, "utf8");
};

const lineToCoord = (line, i) => {
  const matches = /(\d+), (\d+)/.exec(line);
  return { id: i, x: parseInt(matches[1], 10), y: parseInt(matches[2], 10) };
};

const getBounds = points => ({
  minX: _.minBy(points, p => p.x).x,
  maxX: _.maxBy(points, p => p.x).x,
  minY: _.minBy(points, p => p.y).y,
  maxY: _.maxBy(points, p => p.y).y
});

const manhattanDistance = (point1, point2) =>
  Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);

const findClosestCoordToPoint = (point, coords) => {
  const distances = coords.map(c =>
    Object.assign({ distance: manhattanDistance(point, c) }, c)
  );
  const orderedDistances = _.orderBy(distances, d => d.distance, "asc");
  if (orderedDistances[0].distance < orderedDistances[1].distance) {
    return orderedDistances[0];
  }
  return null;
};

const incrementCount = (obj, key) => {
  obj[key] = obj[key] + 1 || 1;
};

const pointIsOnBorder = (point, bounds) =>
  point.y === bounds.minY ||
  point.y === bounds.maxY ||
  point.x === bounds.minX ||
  point.x === bounds.maxX;

const part1 = () => {
  const input = readInput();
  const coords = input.split(/\r\n|\n/).map(lineToCoord);
  const bounds = getBounds(coords);

  const closesPointCounter = {};
  const infiniteCoords = {};

  for (let x = bounds.minX; x <= bounds.maxX; x++) {
    for (let y = bounds.minY; y <= bounds.maxY; y++) {
      const point = { x, y };
      const closestCoord = findClosestCoordToPoint(point, coords);
      if (closestCoord) {
        incrementCount(closesPointCounter, closestCoord.id);
        if (pointIsOnBorder(point, bounds)) {
          infiniteCoords[closestCoord.id] = true;
        }
      }
    }
  }

  const answer = _.chain(closesPointCounter)
    .keys()
    .filter(k => !infiniteCoords[k])
    .map(k => ({ id: k, closestPoints: closesPointCounter[k] }))
    .orderBy(x => x.closestPoints, "desc")
    .head()
    .value();

  console.log("Part 1:", answer.closestPoints);
};

const calculateTotalDistanceToPoint = (point, coords) =>
  _.sumBy(coords, c => manhattanDistance(point, c));

const part2 = () => {
  const input = readInput();
  const coords = input.split(/\r\n|\n/).map(lineToCoord);

  let regionsUnder10000 = 0;
  for (let x = 0; x <= 10000; x++) {
    for (let y = 0; y <= 10000; y++) {
      const point = { x, y };
      const totalDistance = calculateTotalDistanceToPoint(point, coords);
      if(totalDistance < 10000) {
        regionsUnder10000++;
      }
    }
  }

  console.log("Part 2:", regionsUnder10000);
};

part1();
part2();
