export const partOne = (rows) => {
  return rows
    .map(pair => {
      const [firstStart, firstEnd, secondStart, secondEnd] = getDelimiters(pair);
      if ((firstStart <= secondStart && firstEnd >= secondEnd) ||
        (secondStart <= firstStart && secondEnd >= firstEnd)) return 1;

      return 0;
    }).reduce((a, b) => a + b, 0);
};

export const partTwo = (rows) => {
  return rows
    .map(pair => {
      const [firstStart, firstEnd, secondStart, secondEnd] = getDelimiters(pair);
      const firstElements = buildSections(firstStart, firstEnd);
      const secondElements = buildSections(secondStart, secondEnd);

      if ((firstElements.filter(x => secondElements.includes(x)).length > 0) ||
      (secondElements.filter(x => firstElements.includes(x)).length > 0)) return 1;

      return 0;
    }).reduce((a, b) => a + b, 0);
};

const getDelimiters = (pair) => {
  const [firstElf, secondElf] = pair.split(',');
  const [firstStart, firstEnd] = firstElf.split('-').map(x => parseInt(x));
  const [secondStart, secondEnd] = secondElf.split('-').map(x => parseInt(x));
  return [firstStart, firstEnd, secondStart, secondEnd];
};

const buildSections = (start, end) => {
  const list = [];
  for (let i = start; i <= end; i++) {
    list.push(i);
  }
  return list;
};
