
export const partOne = (rows, raw) => {
  const NUMERIC_REGEXP = /\d+/g;
  const numbers = raw.match(NUMERIC_REGEXP);

  return numbers
    .map(number => {
      for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        if (rows[rowIndex].includes(number)) {
          const index = rows[rowIndex].indexOf(number);
          const isPart = rows
            .slice(Math.max(rowIndex - 1, 0), Math.min(rowIndex + 1, rows.length - 1) + 1)
            .map(row => row.slice(Math.max(index - 1, 0), Math.min(index + number.length, row.length - 1) + 1).split(''))
            .flat()
            .some(char => char !== '.' && !/\d/.test(char));
          rows[rowIndex] = rows[rowIndex].replace(number, 'X'.repeat(number.length));
          return isPart ? Number(number) : 0;
        }
      }
      return 0;
    })
    .reduce((acc, curr) => { return curr + acc; }, 0);
};

const getStarPos = (rows, startX, endX, startY, endY) => {
  for (let y = startY; y <= endY; y++) {
    for (let x = startX; x <= endX; x++) {
      if (rows[y][x] === '*') {
        return `${x},${y}`;
      }
    }
  }
};

export const partTwo = (rows, raw) => {
  const NUMERIC_REGEXP = /\d+/g;
  const numbers = raw.match(NUMERIC_REGEXP);

  const gears = numbers
    .reduce((acc, number) => {
      for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        if (rows[rowIndex].includes(number)) {
          const wordStartIndex = rows[rowIndex].indexOf(number);
          const starPos = getStarPos(rows,
            Math.max(wordStartIndex - 1, 0),
            Math.min(wordStartIndex + number.length, rows[rowIndex].length - 1),
            Math.max(rowIndex - 1, 0),
            Math.min(rowIndex + 1, rows.length - 1));

          rows[rowIndex] = rows[rowIndex].replace(number, 'X'.repeat(number.length));

          if (starPos == null) return acc;

          acc[starPos] = acc[starPos] || [];
          acc[starPos].push(Number(number));
          return acc;
        }
      }
      return acc;
    }, Object.create(null));


  return Object.entries(gears)
    .map(([, values]) => {
      return values.length !== 2 ? 0 : values[0] * values[1];
    })
    .reduce((acc, curr) => { return curr + acc; }, 0);
};
