import { runChallenge } from './util.js';
import fs from 'fs';

const deserializeParameters = (parameters) => {
  const validParameters = ['--newDay', '--day', '--year'];
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

const createChallenge = (paramDay, paramYear) => {
  console.log('Creating new day');

  const date = new Date();
  const day = (paramDay === -1 ? date.getDate() : paramDay).toString().padStart(2, '0');
  const year = paramYear || date.getFullYear();

  const challengePath = `./challenges/${year}/challenge-${day}.js`;
  const inputPath = `./inputs/${year}/${day}.txt`;

  // Create challenge
  if (fs.existsSync(challengePath)) {
    console.log(`[ERROR] Challenge ${day} already exists for year ${year}`);
    process.exit(1);
  }

  const template = fs.readFileSync('./challenges/template.js', 'utf8');
  fs.writeFileSync(challengePath, template);

  // Create input file
  if (!fs.existsSync(inputPath)) { fs.writeFileSync(inputPath, ''); }

  // Update index.js
  const yearIndexPath = `./challenges/${year}/index.js`;
  const yearIndex = fs.readFileSync(yearIndexPath, 'utf8');
  const yearIndexFileLines = yearIndex.split('\n');

  const result = [];

  let importAdded = false;
  let exportAdded = false;
  for (const line of yearIndexFileLines) {
    // Add import
    if ((line === '' || yearIndexFileLines[0] === '') && !importAdded) {
      result.push(`import * as challenge${day} from './challenge-${day}.js';`);
      importAdded = true;
    }

    // Add export
    if (line === '};' && !exportAdded) {
      result.push(`  challenge${day},`);
      exportAdded = true;
    }

    result.push(line);
  }

  fs.writeFileSync(yearIndexPath, result.join('\n'));

  console.log(`Challenge ${day} created for year ${year}`);
};

const main = () => {
  const myArgs = process.argv.slice(2);
  const parameters = deserializeParameters(myArgs);

  if (parameters.newDay) {
    createChallenge(parameters.newDay, parameters.newYear);
    return;
  }

  console.log('Starting Advent of Code\n');
  const startTime = new Date();

  runChallenge(
    parameters.day || new Date().getDate(),
    parameters.year || new Date().getFullYear());

  console.log(`\nCTF completed in ${(new Date() - startTime) / 1000} seconds`);
};

main();
