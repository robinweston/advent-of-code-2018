const fs = require("fs");
const path = require("path");
const _ = require("lodash");

function getDigit(number, n) {
  return Math.floor((number / Math.pow(10, n - 1)) % 10);
}

const scoreRecipes = n => {
  let elf1Position = 0;
  let elf2Position = 1;
  const scores = [3, 7];

  while (scores.length < n + 10) {
    const elf1Score = scores[elf1Position];
    const elf2Score = scores[elf2Position];
    const newScore = elf1Score + elf2Score;

    if (newScore < 10) {
      scores.push(newScore);
    } else {
      scores.push(getDigit(newScore, 2));
      scores.push(getDigit(newScore, 1));
    }

    elf1Position = (elf1Position + 1 + elf1Score) % scores.length;
    elf2Position = (elf2Position + 1 + elf2Score) % scores.length;
  }

  const scoreString = scores.join("");
  const score = scoreString.substring(n, n + 10);

  console.log(`Score 10 recipes after first ${n}: ${score}`);
};

const scoreRecipes2 = n => {
  let elf1Position = 0;
  let elf2Position = 1;
  const scores = [3, 7];

  let i = 0;
  while (i < 50000000) {
    const elf1Score = scores[elf1Position];
    const elf2Score = scores[elf2Position];
    const newScore = elf1Score + elf2Score;

    if (newScore < 10) {
      scores.push(newScore);
    } else {
      scores.push(getDigit(newScore, 2));
      scores.push(getDigit(newScore, 1));
    }

    elf1Position = (elf1Position + 1 + elf1Score) % scores.length;
    elf2Position = (elf2Position + 1 + elf2Score) % scores.length;

    i++;

    if (i % 100000 === 0) {
      console.log(`Checking scores at ${i}`);
      const score = scores.join("");
      const scorePosition = score.indexOf(n);
      if (scorePosition > 0) {
        console.log(
          `Recipies to left of score sequence ${n}: ${scorePosition}`
        );
        return;
      }
    }
  }
};

const part1 = () => {
  console.log("Part 1:");
  scoreRecipes(9);
  scoreRecipes(5);
  scoreRecipes(18);
  scoreRecipes(2018);
  scoreRecipes(513401);
};

const part2 = () => {
  console.log("Part 2:");
  scoreRecipes2("51589");
  scoreRecipes2("01245");
  scoreRecipes2("92510");
  scoreRecipes2("59414");
  scoreRecipes2("513401");
};

part1();
part2();
