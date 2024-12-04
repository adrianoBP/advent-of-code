export const partOne = (rows) => {
  return rows.reduce((acc, curr) => {
    return acc + (validateSequence(curr.split(' ').map(Number)) === -1 ? 1 : 0);
  }, 0);
};

export const partTwo = (rows) => {
  const counts = rows.reduce((acc, curr) => {
    const values = curr.split(' ').map(Number);

    const invalidIndex = validateSequence(values);

    // Valid sequence
    if (invalidIndex === -1) return acc + 1;

    // Validate by removing current index
    if (validateSequence([...values], invalidIndex) === -1) {
      return acc + 1;
    }

    // Validate by removing previous index
    if (validateSequence([...values], invalidIndex - 1) === -1) {
      return acc + 1;
    }

    // Invalid sequence
    return acc;
  }, 0);

  return counts;
};

const validateSequence = (values, invalidStart = -1) => {
  if (invalidStart >= 0) values.splice(invalidStart, 1);

  const goesUp = (values.at(-1) + values.at(-2)) - (values[0] + values[1]) > 0;
  for (let i = 1; i < values.length; i++) {
    const diff = values[i] - values[i - 1];
    const goesDown = diff < 0;

    // Max difference is 3, there must be a difference, it cannot change direction (cannot be up and down in the same report)
    if (Math.abs(diff) > 3 || diff === 0 || (goesUp === goesDown)) {
      return i;
    }
  }

  return -1;
};
