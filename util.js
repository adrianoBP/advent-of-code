import fs from 'fs';
import * as challenges from './challenges/index.js';

const getFile = (path) => {
  if (!fs.existsSync(path)) {
    console.log(`[ERROR] Input for challenge not found at ${path}`);
    process.exit(1);
  }

  return [fs.readFileSync(path, 'utf8')
    .toLocaleString()
    .split('\n'),
  fs.readFileSync(path, 'utf8')
    .toLocaleString()];
};

const runChallenge = (challengeNumber, year) => {
  const challengeFormatted = `${challengeNumber}`.padStart(2, '0');
  const [rows, raw] = getFile(`${process.cwd()}/inputs/${year}/${challengeFormatted}.txt`);

  const hashPartOne = challenges[`challenges${year}`][`challenge${challengeFormatted}`]?.partOne?.(rows, raw);
  const hashPartTwo = challenges[`challenges${year}`][`challenge${challengeFormatted}`]?.partTwo?.(rows, raw);

  console.log(`--- Challenge #${challengeFormatted} ---\n`);
  console.log(`Part One: ${hashPartOne || 'Not implemented'}`);
  console.log(`Part Two: ${hashPartTwo || 'Not implemented'}`);
};

export {
  runChallenge,
};
