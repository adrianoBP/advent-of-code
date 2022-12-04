export const partOne = (rows) => {
  return rows
    .map(pair => {
      const [firstStart, firstEnd, secondStart, secondEnd] =
        pair.replace(',', '-').split('-').map(x => parseInt(x));

      if ((firstStart <= secondStart && firstEnd >= secondEnd) ||
        (secondStart <= firstStart && secondEnd >= firstEnd)) return 1;

      return 0;
    }).reduce((a, b) => a + b, 0);
};

export const partTwo = (rows) => {
  return rows
    .map(pair => {
      const [firstStart, firstEnd, secondStart, secondEnd] =
        pair.replace(',', '-').split('-').map(x => parseInt(x));

      const firstSection = Array.from({ length: firstEnd - firstStart + 1 }, (_, k) => firstStart + k);
      const secondSection = Array.from({ length: secondEnd - secondStart + 1 }, (_, k) => secondStart + k);

      if ((firstSection.filter(x => secondSection.includes(x)).length > 0) ||
      (secondSection.filter(x => firstSection.includes(x)).length > 0)) return 1;

      return 0;
    }).reduce((a, b) => a + b, 0);
};
