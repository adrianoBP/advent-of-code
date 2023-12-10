const nextDirection = {
  '-': { RIGHT: 'RIGHT', LEFT: 'LEFT' },
  '7': { UP: 'LEFT', RIGHT: 'DOWN' },
  '|': { UP: 'UP', DOWN: 'DOWN' },
  'J': { DOWN: 'LEFT', RIGHT: 'UP' },
  'L': { DOWN: 'RIGHT', LEFT: 'UP' },
  'F': { UP: 'RIGHT', LEFT: 'DOWN' },
};

function followPath(rows, x, y, direction) {
  let currentPiece = rows[y][x];
  if (currentPiece === '.') return [];

  const path = [];
  while (currentPiece !== 'S') {
    path.push({ x, y });

    if (currentPiece === '-') {
      x += direction === 'RIGHT' ? 1 : -1;
    } else if (currentPiece === '7') {
      if (direction === 'UP') x--; else y++;
    } else if (currentPiece === '|') {
      y += direction === 'DOWN' ? 1 : -1;
    } else if (currentPiece === 'J') {
      if (direction === 'DOWN') x--; else y--;
    } else if (currentPiece === 'L') {
      if (direction === 'LEFT') y--; else x++;
    } else if (currentPiece === 'F') {
      if (direction === 'UP') x++; else y++;
    }

    direction = nextDirection[currentPiece][direction]; // Update move with next move
    currentPiece = rows[y][x];
  }

  return [...path, { x, y }];
}

function findLoop(rows) {
  const [ySPosition, xSPosition] = rows.reduce((acc, y, yIndex) => {
    if (y.includes('S')) return [yIndex, y.indexOf('S')];
    return acc;
  }, []);

  const possibleNextMoves = [
    { direction: 'UP', x: xSPosition, y: ySPosition - 1 },
    { direction: 'RIGHT', x: xSPosition + 1, y: ySPosition },
    { direction: 'DOWN', x: xSPosition, y: ySPosition + 1 },
    { direction: 'LEFT', x: xSPosition - 1, y: ySPosition },
  ];

  let path;
  for (const { x, y, direction } of possibleNextMoves) {
    // IF already found or outside boundaries
    if (path?.length > 0 || (x < 0 || x >= rows[0].length || y < 0 || y >= rows.length)) continue;
    path = followPath(rows, x, y, direction);
  }

  return path;
}

export const partOne = (rows) => {
  const path = findLoop(rows);
  return (path.length) / 2;
};

function calculateArea(path) { // Shoelace formula
  const area = path.reduce((acc, current, index) => {
    const nextIndex = (index + 1) % path.length; // Make sure to include the first element (wrap around)
    const next = { x: path[nextIndex].x, y: path[nextIndex].y };
    return acc + (current.x * next.y) - (next.x * current.y);
  }, 0) / 2;
  return Math.abs(area); // Account for orientation
}

function calculateInnerVertices(area, pathLength) { // Pick's theorem
  return area - (pathLength / 2) + 1;
}

export const partTwo = (rows) => {
  const path = findLoop(rows);
  const area = calculateArea(path);
  return calculateInnerVertices(area, path.length);
};
