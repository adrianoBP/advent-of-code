import { runChallenge } from './util.js';

console.log('Starting Advent of Code 2022\n');
const startTime = new Date();

const myArgs = process.argv.slice(2);
const indexOfDay = myArgs.indexOf('--day');

let dayFromParams = null;

if (indexOfDay >= 0) {
  if (myArgs[indexOfDay + 1] == null || isNaN(parseInt(myArgs[indexOfDay + 1]))) {
    console.log('[ERROR] Please specify a day to run');
    process.exit(1);
  }

  dayFromParams = parseInt(myArgs[indexOfDay + 1]);
}

runChallenge(dayFromParams || new Date().getDate());

console.log(`\nCTF completed in ${(new Date() - startTime) / 1000} seconds`);
