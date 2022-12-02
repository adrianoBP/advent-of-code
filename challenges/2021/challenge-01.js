export const partTwo = (rows) => {
  const groupedDepths = groupDepths(rows);

  let counter = 0;
  let previousDepth = groupedDepths[0];

  for (let i = 1; i < groupedDepths.length; i++) {
    const currentDepth = groupedDepths[i];
    if (currentDepth > previousDepth) counter++;
    previousDepth = currentDepth;
  }

  return counter;
};

const groupDepths = (rows) => {
  const groupedDepths = [
    parseInt(rows[0]),
    parseInt(rows[0]) + parseInt(rows[1]),
  ];
  for (let i = 2; i < rows.length; i++) {
    const currentValue = parseInt(rows[i]);
    groupedDepths[i - 2] += currentValue;
    groupedDepths[i - 1] += currentValue;
    if (i < rows.length - 2) { groupedDepths.push(currentValue); }
  }
  return groupedDepths;
};
