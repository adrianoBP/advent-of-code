import fs from 'fs';
import * as challenges from './challenges/index.js';

const getFile = (path) => {
  // Check if file exists
  if (!fs.existsSync(path)) {
    console.log(`[ERROR] File ${path} does not exist!`);
    return [];
  }

  return [fs.readFileSync(path, 'utf8')
    .toLocaleString()
    .split('\n'),
  fs.readFileSync(path, 'utf8')
    .toLocaleString()];
};

const runChallenge = (challengeNumber) => {
  console.log(`--- Challenge #${challengeNumber} ---\n`);

  // Add some padding for even spacing
  const challengeFormatted = `${challengeNumber}`.padStart(2, '0');
  const [rows, raw] = getFile(`${process.cwd()}/inputs/${challengeFormatted}.txt`);

  const hashPartOne = challenges[`challenge${challengeNumber}`]?.partOne?.(rows, raw);
  const hashPartTow = challenges[`challenge${challengeNumber}`]?.partTwo?.(rows, raw);

  console.log(`Part One: ${hashPartOne || 'Not implemented'}`);
  console.log(`Part Two: ${hashPartTow || 'Not implemented'}`);
};

export {
  runChallenge,
};
