export const partOne = (rows) => {
  const { left, right } = rows.reduce((acc, curr) => {
    const cols = curr.split(' ');
    acc.left.push(Number(cols.at(0)));
    acc.right.push(Number(cols.at(-1)));
    return acc;
  }, { left: [], right: [] });

  left.sort();
  right.sort();

  return left.reduce((acc, curr, index) => {
    if (right[index] === curr) return acc;
    return acc + Math.abs(curr - right[index]);
  }, 0);
};

export const partTwo = (rows) => {
  const { left, right } = rows.reduce((acc, curr) => {
    const cols = curr.split(' ');
    acc.left.push(Number(cols.at(0)));
    acc.right.push(Number(cols.at(-1)));
    return acc;
  }, { left: [], right: [] });

  const occurrencesR = {};
  for (const valueR of right) {
    if (!(valueR in occurrencesR)) occurrencesR[valueR] = 1;
    else occurrencesR[valueR] += 1;
  }

  return left.reduce((acc, curr) => {
    if (!(curr in occurrencesR)) return acc;
    return acc + curr * occurrencesR[curr];
  }, 0);
};
