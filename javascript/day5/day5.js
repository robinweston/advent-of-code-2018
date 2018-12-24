const fs = require("fs");
const path = require("path");

const readInput = () => {
  const filePath = path.join(__dirname, "input.txt");
  return fs.readFileSync(filePath, "utf8");
};

const reducePolymer = polymer => {
  for (let i = 1; i < polymer.length; i++) {
    const currentChar = polymer.charAt(i);
    const previousChar = polymer.charAt(i - 1);
    if (
      previousChar !== currentChar &&
      (previousChar.toUpperCase() === currentChar ||
        previousChar === currentChar.toUpperCase())
    ) {
      return polymer.slice(0, i - 1) + polymer.slice(i + 1);
    }
  }

  return polymer;
};

let currentPolymer = readInput();
while (true) {
  const nextPolymer = reducePolymer(currentPolymer);
  if (nextPolymer.length === currentPolymer.length) {
    break;
  }
  currentPolymer = nextPolymer;
}

console.log("Part 1: ", currentPolymer.length);
