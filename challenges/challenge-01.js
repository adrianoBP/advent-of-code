let elves;

const getElvesCalories = (rawFile) => {
  if (elves == null) {
    elves = rawFile
      .split('\n\n') // elves separated by empty line
      .map((elve) => {
        return elve
          .split('\n')
          .map(calories => parseInt(calories))
          .reduce((a, b) => a + b, 0);
      })
      .sort((a, b) => { return a - b; })
      .reverse();
  }

  return elves;
};

export const partOne = (_, raw) => {
  return getElvesCalories(raw)[0];
};

export const partTwo = (_, raw) => {
  return getElvesCalories(raw)
    .slice(0, 3)
    .reduce((a, b) => a + b, 0);
};
