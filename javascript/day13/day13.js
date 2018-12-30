const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const readInput = () => {
  const filePath = path.join(__dirname, "input.txt");
  return fs.readFileSync(filePath, "utf8");
};

function createArray(length) {
  var arr = new Array(length || 0),
    i = length;

  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    while (i--) arr[length - 1 - i] = createArray.apply(this, args);
  }

  return arr;
}

const vertical = Symbol("vertical");
const horizontal = Symbol("horizontal");
const forwardTurn = Symbol("forwardTurn");
const backTurn = Symbol("backTurn");
const crossroads = Symbol("crossroads");

const up = Symbol("up");
const down = Symbol("down");
const left = Symbol("left");
const right = Symbol("right");
const straight = Symbol("straight");
const directions = [left, up, right, down];

const charToPath = char => {
  switch (char) {
    case "-":
    case "<":
    case ">":
      return horizontal;
    case "|":
    case "^":
    case "v":
      return vertical;
    case "/":
    return forwardTurn;
    case "\\":
      return backTurn;
    case "+":
      return crossroads;
  }

  return null;
};

const charToCart = char => {
  switch (char) {
    case "<":
      return { direction: left };
    case ">":
      return { direction: right };
    case "^":
      return { direction: up };
    case "v":
      return { direction: down };
  }

  return null;
};

const getNextDirection = (direction, diff) => {
  let directionIndex = directions.indexOf(direction);
  directionIndex += diff;
  if (directionIndex === -1) {
    directionIndex = directions.length - 1;
  } else if (directionIndex === directions.length) {
    directionIndex = 0;
  }
  return directions[directionIndex];
};

const makeCrossroadsTurn = cart => {
  if (cart.nextTurn === left) {
    cart.nextTurn = straight;
    cart.direction = getNextDirection(cart.direction, -1);
  } else if (cart.nextTurn === straight) {
    cart.nextTurn = right;
  } else {
    cart.nextTurn = left;
    cart.direction = getNextDirection(cart.direction, +1);
  }
};

const makeForwardTurn = cart => {
  if (cart.direction === left) {
    cart.direction = down;
  } else if (cart.direction === up) {
    cart.direction = right;
  } else if (cart.direction === down) {
    cart.direction = left;
  } else {
    cart.direction = up;
  }
};

const makeBackTurn = cart => {
  if (cart.direction === left) {
    cart.direction = up;
  } else if (cart.direction === up) {
    cart.direction = left;
  } else if (cart.direction === down) {
    cart.direction = right;
  } else {
    cart.direction = down;
  }
};

const moveCart = (cart, paths) => {
  const currentPath = paths[cart.position.y][cart.position.x];
  if (currentPath === forwardTurn) {
    makeForwardTurn(cart, paths);
  } else if (currentPath === backTurn) {
    makeBackTurn(cart, paths);
  } else if (currentPath === crossroads) {
    makeCrossroadsTurn(cart);
  }

  switch (cart.direction) {
    case left:
      cart.position.x -= 1;
      break;
    case right:
      cart.position.x += 1;
      break;
    case up:
      cart.position.y -= 1;
      break;
    case down:
      cart.position.y += 1;
      break;
  }
};

const parseInput = input => {
  const height = input.length;
  const width = input[0].length;
  const paths = createArray(height, width);
  const carts = [];

  for (let y = 0; y < height; y++) {
    const line = input[y];
    for (let x = 0; x < width; x++) {
      const char = line[x];
      paths[y][x] = charToPath(char);
      const cart = charToCart(char);
      if (cart) {
        cart.position = { x, y };
        cart.id = carts.length;
        cart.nextTurn = left;
        carts.push(cart);
      }
    }
  }

  return {
    paths,
    carts
  };
};

const hasCartCrashed = (cart, allCarts) =>
  allCarts.find(
    c =>
      c.id !== cart.id &&
      c.position.x === cart.position.x &&
      c.position.y === cart.position.y
  );

const tick = (carts, paths) => {
  const sortedCarts = _.sortBy(carts, c => c.position.y, c => c.position.x);

  for (let i = 0; i < sortedCarts.length; i++) {
    const cart = sortedCarts[i];
    moveCart(cart, paths);
    if (hasCartCrashed(cart, sortedCarts)) {
      cart.crashed = true;
      return true;
    }
  }

  return false;
};

const input = readInput();
const parsedInput = parseInput(input.split(/\r\n|\n/));

const part1 = () => {
  let isCrash = false;
  while (!isCrash) {
    isCrash = tick(parsedInput.carts, parsedInput.paths);
  }
  const crashedCart = parsedInput.carts.find(c => c.crashed);
  console.log(`Part 1: ${JSON.stringify(crashedCart.position)}`);
};

const part2 = () => {
  console.log(`Part 2: XXX`);
};

part1();
part2();
