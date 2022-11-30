# advent-of-code-2022

CTF challenges from [advent-of-code (2022)](https://adventofcode.com/2022)

> Advent of Code is an Advent calendar of small programming puzzles for a variety of skill sets and skill levels that can be solved in any programming language you like. People use them as interview prep, company training, university coursework, practice problems, a speed contest, or to challenge each other.  
> -- [About page](https://adventofcode.com/2022/about)

## Usage

Set the challenge number in `index.js`

```js
const challenge = 1; // Challenge number here
```

### Install

```shell
npm install
```

### Run

```shell
npm start
```

## Adding challenge

1. Add input into the `inputs` folder in the following format: `12-DD.txt` (where `DD` is replaced by the current day - two digits).
2. Add challenge file into the `challenges` folder in the following format: `challenge-12-DD.js` (where `DD` is replaced by the current day - two digits).
3. Implement `partOne` and `partTwo` functions - they should both accept a 'rows' input indicating the rows of the input file for that challenge.
The functions should return the challenge hash.
4. Make sure you are exporting the functions from step 3.
5. Import the challenge in the `challenges/index.js` and export them using the following code:

```js
import * as challengeN from './challenge-12-DD.js';

export {
  challengeN,
};
```

Where `N` indicates the challenge number (1 to 25) and `DD` indicates the day (two digits).

### Boilerplate challenge code

```js
export const partOne = (rows) => {
  return 'Hash for challenge one';
};

export const partTwo = (rows) => {
  return 'Hash for challenge two';
};
```
