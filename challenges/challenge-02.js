// Rows indicate my choice, columns indicate enemy's choice
const guideTable = [
  [3, 0, 6], // RvR RvP RvS
  [6, 3, 0], // PvR PvP PvS
  [0, 6, 3], // SvR SvP SvS
];

const indexes = {
  A: 0,
  B: 1,
  C: 2,
  X: 0,
  Y: 1,
  Z: 2,
};

export const partOne = (rows) => {
  return rows.map(row => {
    const [enemyChoiceIndex, myChoiceIndex] = row.split(' ').map(x => indexes[x]);
    return guideTable[myChoiceIndex][enemyChoiceIndex] + (myChoiceIndex + 1);
  }).reduce((a, b) => a + b, 0);
};

export const partTwo = (rows) => {
  const actionChoiceTable = [
    [2, 0, 1], // Loose
    [0, 1, 2], // Draw
    [1, 2, 0], // Win
  ];

  return rows.map(row => {
    const [enemyChoiceIndex, actionIndex] = row.split(' ').map(x => indexes[x]);
    const myChoiceIndex = actionChoiceTable[actionIndex][enemyChoiceIndex];
    return guideTable[myChoiceIndex][enemyChoiceIndex] + (myChoiceIndex + 1);
  }).reduce((a, b) => a + b, 0);
};
