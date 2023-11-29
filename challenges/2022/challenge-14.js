export const partOne = (rows, raw) => {
  const cave = [...Array(1000)].map(() => [...Array(1000)].map(() => '.'));

  for (const wall of rows) {
    const points = wall.split(' -> ');
    console.log(points);
    buildWall(points, cave);
  }

  return 'A';
};

const buildWall = (points, cave) => {
  let previous = null;
  for (const [col, row] of points.map(point => point.split(',').map(Number))) {
    console.log(col, row);
    if (previous == null) {
      cave[col][row] = '#';
    } else {
      const intermediate = getIntermeditePoints(previous, { x: col, y: row });
      console.log(intermediate);
      intermediate.forEach((x, y) => {
        cave[y][x] = '#';
      });
    }

    previous = {
      x: col,
      y: row,
    };
  }
};

const getIntermeditePoints = (start, end) => {
  const points = [];
  // Moving right
  if (end.x > start.x) {
    for (let i = start.x + 1; i <= end.x; i++) {
      points.push({
        x: i,
        y: start.y,
      });
    }
  }
  // Moving down
  else if (end.y > start.y) {
    for (let i = start.y + 1; i <= end.y; i++) {
      points.push({
        x: start.x,
        y: i,
      });
    }
  }
  // Moving left
  else if (end.x < start.x) {
    for (let i = start.x - 1; i >= end.x; i--) {
      points.push({
        x: i,
        y: start.y,
      });
    }
  }
  // Moving up
  else if (end.y < start.y) {
    for (let i = start.y - 1; i >= end.y; i--) {
      points.push({
        x: start.x,
        y: i,
      });
    }
  }

  return points;
};

export const partTwo = (rows, raw) => {
  return 'B';
};
