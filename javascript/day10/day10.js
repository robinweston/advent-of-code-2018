const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const readInput = () => {
  const filePath = path.join(__dirname, "input.txt");
  return fs.readFileSync(filePath, "utf8");
};

const lineToPoint = (line, i) => {
  const matches = /<(.*),(.*)>.*<(.*),(.*)>/.exec(line);
  return {
    position: {
      x: parseInt(matches[1].trim(), 10),
      y: parseInt(matches[2].trim(), 10)
    },
    velocity: {
      x: parseInt(matches[3].trim(), 10),
      y: parseInt(matches[4].trim(), 10)
    }
  };
};

const calculateGridSize = points => {
  const minX = _.min(points.map(p => p.position.x));
  const minY = _.min(points.map(p => p.position.y));
  const maxX = _.max(points.map(p => p.position.x));
  const maxY = _.max(points.map(p => p.position.y));

  const width = maxX - minX + 1;
  const height = maxY - minY + 1;
  return { width, height, minX, minY };
};

const printPoints = points => {
  const gridSize = calculateGridSize(points);
  console.log(gridSize);

  const grid = new Array(gridSize.height)
    .fill(" ")
    .map(() => new Array(gridSize.width).fill(" "));

  points.forEach(p => {
    const gridX = p.position.x - gridSize.minX;
    const gridY = p.position.y - gridSize.minY;
    grid[gridY][gridX] = "#";
  });

  grid.forEach(row => {
    console.log(row.join(""));
  });
};

const input = readInput();
const points = input.split(/\r\n|\n/).map(lineToPoint);

const part1 = () => {
  console.log("Part 1:");
  for (let second = 0; second < 100000; second++) {
    const gridWidth = calculateGridSize(points).width;
    if(second % 10000 == 0) {
      console.log(`Second ${second}. Width is ${gridWidth}`);
    }
    if (gridWidth < 100) {
      console.log(`Second ${second}`);
      printPoints(points);
    }
    points.forEach(p => {
      p.position.x += p.velocity.x;
      p.position.y += p.velocity.y;
    });
    second++;
  }
};

const part2 = () => {
  console.log("Part 2:");
};

part1();
part2();
