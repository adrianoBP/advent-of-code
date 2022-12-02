export const partOne = (rows) => {
  const gammaValues = [];

  for (let i = 0; i < rows[0].length; i++) {
    gammaValues.push(
      rows.map(row => row.charAt(i)).filter(bit => bit === '0').length > rows.length / 2 ? 0 : 1,
    );
  }

  const epsilonValues = gammaValues.map(bit => bit === 0 ? 1 : 0);

  // Power consumption
  const gamma = binaryToDecimal(gammaValues.reverse());
  const epsilon = binaryToDecimal(epsilonValues.reverse());
  return (gamma * epsilon);
};

export const partTwo = (rows) => {
  const gammaValues = [];

  for (let i = 0; i < rows[0].length; i++) {
    gammaValues.push(
      rows.map(row => row.charAt(i)).filter(bit => bit === '0').length > rows.length / 2 ? 0 : 1,
    );
  }

  // Life support rating
  const oxygen = binaryToDecimal(getMostCommonByChar([...rows], false).split('').reverse());
  const co2 = binaryToDecimal(getMostCommonByChar([...rows], true).split('').reverse());
  return (oxygen * co2);
};

const binaryToDecimal = (binaryValues) => {
  let result = 0;
  for (let i = 0; i < binaryValues.length; i++) {
    result += 2 ** i * binaryValues[i];
  }
  return result;
};

const getMostCommonByChar = (rows, useLeast) => {
  if (rows.length === 0) return '';
  if (rows.length === 1) return rows[0];

  const numberOfZeroBits = rows.map(row => row.charAt(0))
    .filter(bit => bit === '0').length;

  const currentBit = (numberOfZeroBits <= rows.length / 2) ? (useLeast ? 0 : 1) : (useLeast ? 1 : 0);

  return currentBit + getMostCommonByChar(rows.filter(rows => rows.charAt(0) === currentBit).map(rows => rows.substr(1)), useLeast);
};
