export const partOne = (rows) => {
  let highest = 0;
  let buffer = 0;

  for (const row of rows) {
    if (row === '' || row == null) {
      if (buffer > highest) {
        highest = buffer;
      }
      buffer = 0;
      continue;
    }

    const intValue = parseInt(row);
    buffer += intValue;
  }

  return highest;
};

export const partTwo = (rows) => {
  const highCalories = [];
  let buffer = 0;

  for (const row of rows) {
    if (row === '' || row == null) {
      if (highCalories.length < 3) highCalories.push(buffer);
      else {
        const lowestIndex = getLowestIndex(highCalories);
        if (buffer > highCalories[lowestIndex]) highCalories[lowestIndex] = buffer;
      }
      buffer = 0;
      continue;
    }

    const intValue = parseInt(row);
    buffer += intValue;
  }

  return highCalories.reduce((a, b) => a + b, 0);
};

const getLowestIndex = (array) => {
  let lowestIndex = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] < array[lowestIndex]) {
      lowestIndex = i;
    }
  }
  return lowestIndex;
};
