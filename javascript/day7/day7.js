const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const readInput = () => {
  const filePath = path.join(__dirname, "input.txt");
  return fs.readFileSync(filePath, "utf8");
};

const lineToDep = line => {
  const matches = /Step (.) must be finished before step (.) can begin./.exec(
    line
  );
  return { pre: matches[1], post: matches[2] };
};

const buildSteps = deps => {
  const pres = deps.map(d => d.pre);
  const posts = deps.map(d => d.post);
  const allSteps = _.uniq([...pres, ...posts]);

  return allSteps.map(s => ({
    id: s,
    deps: deps.filter(d => d.post === s).map(d => d.pre)
  }));
};

const canStepBeRun = (step, ranSteps) =>
  step.deps.length === 0 || _.every(step.deps, d => _.includes(ranSteps, d));

const part1 = () => {
  const input = readInput();
  const deps = input.split(/\r\n|\n/).map(lineToDep);

  let remainingSteps = buildSteps(deps);
  const ranSteps = [];

  while (remainingSteps.length > 0) {
    const stepsThatCanBeRun = remainingSteps.filter(rs =>
      canStepBeRun(rs, ranSteps)
    );
    const step = _.sortBy(stepsThatCanBeRun, s => s.id)[0];
    ranSteps.push(step.id);
    remainingSteps = remainingSteps.filter(rs => rs.id !== step.id);
  }

  console.log("Part 1:", ranSteps.join(""));
};

const constructionTime = (char, baseSeconds) =>
  char.charCodeAt(0) - "A".charCodeAt(0) + 1 + baseSeconds;

const part2 = () => {
  const input = readInput();
  const deps = input.split(/\r\n|\n/).map(lineToDep);

  // const totalElves = 2;
  // const baseSeconds = 0;
  const totalElves = 5;
  const baseSeconds = 60;

  let remainingSteps = buildSteps(deps);
  const completedSteps = [];
  const inProgressSteps = [];

  let elapsedSeconds = 0;
  const elves = [...Array(totalElves)].map(_ => []);

  while (remainingSteps.length > 0) {

    // elves complete work
    for (var i = 0; i < elves.length; i++) {
      if (elves[i].length > 1) {
        elves[i] = _.drop(elves[i]).join("");
        assignNewWork = false;
      } else if (elves[i].length === 1) {
        const completedStepId = elves[i][0];
        elves[i] = [];
        completedSteps.push(completedStepId);
        remainingSteps = remainingSteps.filter(rs => rs.id !== completedStepId);
      }
    }

    // elves pick up new work
    for (var i = 0; i < elves.length; i++) {
      if (elves[i].length === 0) {
        const validStep = _.chain(remainingSteps)
          .filter(rs => canStepBeRun(rs, completedSteps))
          .filter(rs => !_.includes(inProgressSteps, rs.id))
          .sortBy(s => s.id)
          .first()
          .value();

        if (validStep) {
          inProgressSteps.push(validStep.id);
          elves[i] = _.repeat(validStep.id, constructionTime(validStep.id, baseSeconds));
        }
      }
    }

    elapsedSeconds++;
  }

  console.log(completedSteps.join(""));
  console.log("Part 2:", elapsedSeconds - 1);
};

part1();
part2();
