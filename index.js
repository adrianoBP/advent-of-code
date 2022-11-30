import { runChallenge } from './util.js';

console.log('Starting Advent of Code 2022\n');
const startTime = new Date();

const challenge = 1;
runChallenge(challenge);

console.log(`\nCTF completed in ${(new Date() - startTime) / 1000} seconds`);
