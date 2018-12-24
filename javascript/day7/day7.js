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

const part2 = () => {
  console.log("Part 2:", "XXX");
};

part1();
part2();
