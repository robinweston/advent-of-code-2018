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

const fullyReducePolymer = (polymer) => {
    let currentPolymer = polymer;
    while (true) {
        const nextPolymer = reducePolymer(currentPolymer);
        if (nextPolymer.length === currentPolymer.length) {
          break;
        }
        currentPolymer = nextPolymer;
      }
    return currentPolymer;
};

const part1 = () => {
  let startingPolymer = readInput();
  let finalPolymer = fullyReducePolymer(startingPolymer);
  console.log("Part 1: ", finalPolymer.length);
};

String.prototype.replaceAll = function(strReplace, strWith) {
    // See http://stackoverflow.com/a/3561711/556609
    var esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    var reg = new RegExp(esc, 'ig');
    return this.replace(reg, strWith);
};

const part2 = () => {
    let polymer = readInput();
    const polymerLengths = new Map();

    for(let i=0; i < 26; i++) {
        const char = String.fromCharCode(97 + i);
        console.log("Removing " + char);
        const polymerWithoutChars = polymer.replaceAll(char, "");
        const reducedPolymer = fullyReducePolymer(polymerWithoutChars);
        polymerLengths.set(char, reducedPolymer.length);
    }
    
    const sortedPolymerLengths = [...polymerLengths.entries()].sort((a, b) => a[1] - b[1]);
  
    console.log("Part 2: ", sortedPolymerLengths[0][1]);
  };

//part1();
part2();
