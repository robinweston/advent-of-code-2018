const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const mod = (x, n) => (x % n + n) % n;

const calculateHighScore = (highestMarble, numberOfPlayers) => {
  const playerScores = _.fill(new Array(numberOfPlayers), 0);
  let currentCircle = [0];
  let currentMarblePosition = 0;
  for (let m = 1; m <= highestMarble; m++) {
    if (m % 23 === 0) {
      const currentPlayer = m % numberOfPlayers;
      currentMarblePosition = mod((currentMarblePosition - 7), currentCircle.length);
      playerScores[currentPlayer] += currentCircle[currentMarblePosition] + m;
      _.pullAt(currentCircle, [currentMarblePosition]);
    } else {
      currentMarblePosition = mod((currentMarblePosition + 2), currentCircle.length);
      currentCircle.splice(currentMarblePosition, 0, m);
    }
  }

  const highestScore = _.max(playerScores);
  console.log(`${numberOfPlayers} players; last marble is worth ${highestMarble} points: high score is ${highestScore}`);
};

const part1 = () => {
  console.log("Part 1:")
  calculateHighScore(25, 5);
  calculateHighScore(1618, 10);
  calculateHighScore(7999, 13);
  calculateHighScore(1104, 17);
  calculateHighScore(6111, 21);
  calculateHighScore(5807, 30);
  calculateHighScore(71940, 465);
};

const part2 = () => {
  console.log("Part 2:", "XXX");
};

part1();
part2();
