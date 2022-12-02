export const partTwo = (rows) => {
  rows = rows.map(row => row.split('').map(Number));

  const lowPoints = [];
  const basins = [];

  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      if (isLowerThanTop(y, x, rows) && isLowerThanLeft(y, x, rows) && isLowerThanRight(y, x, rows) && isLowerThanBottom(y, x, rows)) {
        lowPoints.push(rows[y][x]);

        basins.push([...new Set(getBasin(x, y, rows))]);
      }
    }
  }

  const basinLengths = basins.map(basin => basin.length).sort((a, b) => b - a);

  return (basinLengths[0] * basinLengths[1] * basinLengths[2]);
};

const isLowerThanTop = (y, x, rows) => {
  // If top row, don't check
  if (y === 0) {
    return true;
  }
  return rows[y][x] < rows[y - 1][x];
};

const isLowerThanLeft = (y, x, rows) => {
  // If first column, don't check
  if (x === 0) {
    return true;
  }
  return rows[y][x] < rows[y][x - 1];
};

const isLowerThanRight = (y, x, rows) => {
  // If last column, don't check
  if (x === rows[y].length - 1) {
    return true;
  }
  return rows[y][x] < rows[y][x + 1];
};

const isLowerThanBottom = (y, x, rows) => {
  // If last row, don't check
  if (y === rows.length - 1) {
    return true;
  }
  return rows[y][x] < rows[y + 1][x];
};

const getBasin = (x, y, rows, direction) => {
  const basin = [
        `${x},${y}`,
        direction !== 'bottom' ? getBasinWithDirection(x, y - 1, rows, 'top', rows[y][x]) : null,
        direction !== 'left' ? getBasinWithDirection(x + 1, y, rows, 'right', rows[y][x]) : null,
        direction !== 'top' ? getBasinWithDirection(x, y + 1, rows, 'bottom', rows[y][x]) : null,
        direction !== 'right' ? getBasinWithDirection(x - 1, y, rows, 'left', rows[y][x]) : null,
  ];

  return basin.flat().filter(point => point !== undefined && point !== null);
};

const getBasinWithDirection = (x, y, rows, direction, previousPoint) => {
  if (direction === 'top') {
    if (y < 0 || rows[y][x] === 9) return;

    if (rows[y][x] >= previousPoint) { return getBasin(x, y, rows, direction); }
  } else if (direction === 'right') {
    if (x >= rows[y].length || rows[y][x] === 9) return;

    if (rows[y][x] >= previousPoint) { return getBasin(x, y, rows, direction); }
  } else if (direction === 'bottom') {
    if (y >= rows.length || rows[y][x] === 9) return;

    if (rows[y][x] >= previousPoint) { return getBasin(x, y, rows, direction); }
  } else if (direction === 'left') {
    if (x < 0 || rows[y][x] === 9) return;

    if (rows[y][x] >= previousPoint) { return getBasin(x, y, rows, direction); }
  }
};
