const guide = [
  [3, 0, 6],
  [6, 3, 0],
  [0, 6, 3],
];

const indexes = {
  A: 0,
  B: 1,
  C: 2,
  X: 0,
  Y: 1,
  Z: 2,
};

const optionPoints = {
  X: 1,
  Y: 2,
  Z: 3,
};


export const partOne = (rows) => {
  return rows.map(row => {
    const data = row.split(' ');
    return guide[indexes[data[1]]][indexes[data[0]]] + optionPoints[data[1]];
  }).reduce((a, b) => a + b, 0);
};

export const partTwo = (rows) => {
  const choiceTable = [
    [2, 0, 1], // Loose
    [0, 1, 2], // Draw
    [1, 2, 0], // Win
  ];
  const indexPoints = ['X', 'Y', 'Z'];

  return rows.map(row => {
    const data = row.split(' ');
    const myChoiceIndex = choiceTable[indexes[data[1]]][indexes[data[0]]];
    return guide[myChoiceIndex][indexes[data[0]]] + optionPoints[indexPoints[myChoiceIndex]];
  }).reduce((a, b) => a + b, 0);
};
