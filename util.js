import fs from 'fs';
import * as challenges from './challenges/index.js';

const getRows = (path) => {
  // check if file exists
  if (!fs.existsSync(path)) {
    console.log(`[ERROR] File ${path} does not exist!`);
    return [];
  }

  return fs.readFileSync(path, 'utf8')
    .toLocaleString()
    .split('\n');
};

const runChallenge = (challengeNumber) => {
  console.log(`--- Challenge #${challengeNumber} ---\n`);

  // Add 0 to the challenge number if it's less than 10
  const challengeFormatted = `${challengeNumber}`.padStart(2, '0');
  const rows = getRows(`${process.cwd()}/inputs/12-${challengeFormatted}.txt`);

  const hashPartOne = challenges[`challenge${challengeNumber}`]?.partOne?.(rows);
  const hashPartTow = challenges[`challenge${challengeNumber}`]?.partTwo?.(rows);


  console.log(`Part One: ${hashPartOne || 'Not implemented'}`);
  console.log(`Part Two: ${hashPartTow || 'Not implemented'}`);
};

export {
  runChallenge,
};
