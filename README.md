# advent-of-code

CTF challenges from [advent-of-code](https://adventofcode.com)

> Advent of Code is an Advent calendar of small programming puzzles for a variety of skill sets and skill levels that can be solved in any programming language you like. People use them as interview prep, company training, university coursework, practice problems, a speed contest, or to challenge each other.  
> -- [About page](https://adventofcode.com/about)

## Usage

### Install

```shell
npm install
```

### Run

Runs today's challenge

```shell
npm start
```

Parameters

```shell
npm start -- [--year <year>] [--day <day>] 
```

## Adding a year

If not present yet, create an `index.js` file under the `challenges/` folder which will contain all the imports and exports for the years:

```shell
import * as challengesYYYY from './YYYY/index.js';

export {
  challengesYYYY,
};
```

> **DD**: indicates the day in two digits format (e.g. 05, 12, etc.)  
**YYYY**: indicates the year in four digits format (e.g. 2022)  

Under the `challenges/` folder, create a folder with the year number.
Inside the folder, create an `index.js` file which will contain all the imports and exports for the challenges:

```js
import * as challengeDD from './challenge-DD.js';

export {
  challengeDD,
};
```

Once created, add imports and exports in the `challenges/index.js` file.

## Adding a challenge

1. Add your inputs in the `inputs/` folder (you may need to create it) under the correct year, where the file name is the day in two digits format (extension must be `.txt`) e.g. `inputs/2022/01.txt`

2. Add challenge file into the `challenges/YYYY/` folder in the following format: `challenge-DD.js`.

3. Implement `partOne` and `partTwo` functions - they should both accept a 'rows' input indicating the rows of the input file for that challenge.
The functions should return the challenge hash. If needed, a second parameter indicating the raw input can be added.

4. Make sure you are exporting the functions from step 3.

5. Import and export the challenge in your year index.js file under `challenges/YYYY/index.js`

### Boilerplate challenge code

```js
export const partOne = (rows) => {
  return 'Hash for challenge one';
};

export const partTwo = (rows, raw) => {
  return 'Hash for challenge two';
};
```
