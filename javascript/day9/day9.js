const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const CircularList = require("./CircularList");

const calculateHighScore = (highestMarble, numberOfPlayers) => {
  const playerScores = _.fill(new Array(numberOfPlayers), 0);
  const circle = new CircularList();
  circle.add({ value: 0 });
  for (let m = 1; m <= highestMarble; m++) {
    if (m % 100000 === 0) {
      console.log(`Marble ${m}/${highestMarble}`);
    }
    if (m % 23 === 0) {
      const currentPlayer = m % numberOfPlayers;
      circle.backBy(7);
      playerScores[currentPlayer] += circle.currentItem.value + m;
      circle.remove();
    } else {
      circle.forwardBy(2);
      circle.add({ value: m });
    }
    //circle.print();
  }

  const highestScore = _.max(playerScores);
  console.log(
    `${numberOfPlayers} players; last marble is worth ${highestMarble} points: high score is ${highestScore}`
  );
};

const part1 = () => {
  console.log("Part 1:");
  calculateHighScore(25, 5);
  calculateHighScore(1618, 10);
  calculateHighScore(7999, 13);
  calculateHighScore(1104, 17);
  calculateHighScore(6111, 21);
  calculateHighScore(5807, 30);
  calculateHighScore(71940, 465);
};

const part2 = () => {
  console.log("Part 2:");
  calculateHighScore(71940 * 100, 465);
};

part1();
part2();
