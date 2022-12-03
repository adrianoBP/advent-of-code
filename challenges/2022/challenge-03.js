const getPriority = (char) => {
  if (char.match(/[A-Z]/g)) return char.charCodeAt(0) - 38;
  else return char.charCodeAt(0) - 96;
};

export const partOne = (rows) => {
  return rows
    .map(content => {
      const contentA = [...content.slice(0, content.length / 2)];
      const contentB = [...content.slice(content.length / 2)];
      return getPriority(contentA.filter(x => contentB.includes(x))[0]);
    })
    .reduce((a, b) => a + b, 0);
};

export const partTwo = (rows) => {
  let sum = 0;
  for (let i = 0; i < rows.length; i += 3) {
    const common = [...rows[i]]
      .filter(x => [...rows[i + 1]].includes(x))
      .filter(x => [...rows[i + 2]].includes(x))[0];
    sum += getPriority(common);
  }
  return sum;
};
