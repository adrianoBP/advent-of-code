function calculateHistory(set) {
  const diffsHistory = [[...set]];

  while (!diffsHistory.at(-1).every(x => x === 0)) {
    const history = diffsHistory.at(-1);
    const diffs = history.reduce((acc, curr, index) => {
      if (index === 0) return acc;
      acc.push(curr - history[index - 1]);
      return acc;
    }, []);

    diffsHistory.push(diffs);
  }

  return diffsHistory;
}

export const partOne = (rows) => {
  return rows.map(x => x.split(' ').map(Number))
    .reduce((acc, curr) => {
      const diffsHistory = calculateHistory(curr);
      diffsHistory.at(-1).push(0); // Add at the end

      for (let i = diffsHistory.length - 2; i >= 0; i--) {
        diffsHistory[i].push(diffsHistory[i].at(-1) + diffsHistory[i + 1].at(-1));
      }

      return acc + diffsHistory[0].at(-1);
    }, 0);
};

export const partTwo = (rows) => {
  return rows.map(x => x.split(' ').map(Number))
    .reduce((acc, curr) => {
      const diffsHistory = calculateHistory(curr);
      diffsHistory.at(-1).unshift(0); // Add at the beginning

      for (let i = diffsHistory.length - 2; i >= 0; i--) {
        diffsHistory[i].unshift(diffsHistory[i][0] - diffsHistory[i + 1][0]);
      }

      return acc + diffsHistory[0][0];
    }, 0);
};
