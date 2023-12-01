const sum = (numbers) => {
  return numbers.reduce((acc, curr) => { return acc + Number(curr); }, 0);
};

export const partOne = (rows) => {
  const numbers = rows.map(row => {
    const numberChars = row.trim()
      .split('')
      .filter(char => Number(char));
    return numberChars[0] + numberChars.slice(-1)[0];
  });

  return sum(numbers);
};

const numberTextToValue = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

export const partTwo = (rows) => {
  const numbers = rows.map(row => {
    const numberChars = row.trim()
      .split('')
      .map((char, index) => {
        if (Number(char)) return char;
        else {
          for (const [key, value] of Object.entries(numberTextToValue)) {
            const possibleMatch = row.slice(index, index + key.length);
            if (possibleMatch === key) return value.toString();
          }
        }
        return null;
      })
      .filter(x => x != null);
    return numberChars[0] + numberChars.slice(-1)[0];
  });

  return sum(numbers);
};
