import { runChallenge } from './util.js';

const deserializeParameters = (parameters) => {
  const validParameters = ['--day', '--year'];
  const result = {};

  for (let i = 0; i < parameters.length; i++) {
    const parameter = parameters[i];

    if (validParameters.includes(parameter)) {
      const value = parameters[i + 1];

      if (value == null || isNaN(parseInt(value))) {
        console.log(`[ERROR] Please specify a value for ${parameter}`);
        process.exit(1);
      }

      result[parameter.slice(2)] = parseInt(value);
    }
  }

  return result;
};

const main = () => {
  console.log('Starting Advent of Code\n');
  const startTime = new Date();

  const myArgs = process.argv.slice(2);
  const parameters = deserializeParameters(myArgs);

  runChallenge(
    parameters.day || new Date().getDate(),
    parameters.year || new Date().getFullYear());

  console.log(`\nCTF completed in ${(new Date() - startTime) / 1000} seconds`);
};

main();
