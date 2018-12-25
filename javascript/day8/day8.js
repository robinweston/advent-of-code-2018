const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const readInput = () => {
  const filePath = path.join(__dirname, "input.txt");
  return fs.readFileSync(filePath, "utf8");
};

function nextChar(c) {
  return String.fromCharCode(c.charCodeAt(0) + 1);
}

const parseNode = (numbers, startPoint, currentId) => {
  const numberOfChildren = numbers[startPoint];
  const numberOfMetadata = numbers[startPoint + 1];
  const node = {
    id: currentId,
    children: [],
    metadata: []
  };

  let currentPoint = startPoint + 2;
  let nextId = nextChar(currentId);
  for (let i = 0; i < numberOfChildren; i++) {
    const child = parseNode(numbers, currentPoint, nextId);
    node.children.push(child);
    currentPoint = child.endPoint;
    nextId = nextChar(nextId);
  }

  const metaDataEndPoint = currentPoint + numberOfMetadata;
  node.metadata = numbers.slice(currentPoint, metaDataEndPoint);
  node.endPoint = metaDataEndPoint;

  return node;
};

const sumMetaData = node =>
  _.sum(node.metadata) + _.sum(node.children.map(c => sumMetaData(c)));

const part1 = () => {
  const input = readInput();

  let numbers = input.split(" ").map(n => parseInt(n, 10));
  const rootNode = parseNode(numbers, 0, "A");

  const totalMetaData = sumMetaData(rootNode);

  console.log("Part 1:", totalMetaData);
};

const part2 = () => {
  console.log("Part 2:", "XXX");
};

part1();
part2();
