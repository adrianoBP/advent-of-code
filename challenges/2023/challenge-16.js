const directionMappings = {
  UP: { x: 0, y: -1 },
  RIGHT: { x: 1, y: 0 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
};

const nextDirectionChange = {
  '\\': { UP: 'LEFT', DOWN: 'RIGHT', LEFT: 'UP', RIGHT: 'DOWN' },
  '/': { UP: 'RIGHT', DOWN: 'LEFT', LEFT: 'DOWN', RIGHT: 'UP' },
};

function count(map, x, y, direction, path = [], memo = {}, visited = []) {
  if (x < 0 || x === map[0].length || y < 0 || y === map.length) {
    return 0;
  }

  function memoize(result) {
    memo[baseIdent] = memo[baseIdent] || {};
    memo[baseIdent][direction] = result;
    return memo[baseIdent][direction];
  }

  const baseIdent = `${x},${y}`;

  if (baseIdent in memo && direction in memo[baseIdent]) return Number(memo[baseIdent][direction]);


  const ident = `${baseIdent},${direction}`;
  const alreadyVisited = visited.includes(baseIdent); // Defines if we have been in the current position, but does not look at from which direction we came in!
  if (!alreadyVisited) visited.push(baseIdent);

  if (path.includes(ident)) {
    return memoize([...new Set(visited)].length - 1);
  }
  path.push(ident);
  // draw(map, path, { x, y });
  const current = map[y][x];
  // visited.push({ x, y });
  const tryAddOne = alreadyVisited ? 0 : 1;

  if (current === '.') {
    const result = tryAddOne + count(map,
      x + directionMappings[direction].x,
      y + directionMappings[direction].y,
      direction, path, memo, visited);
    return memoize(result);
  }

  if (current === '\\' || current === '/') {
    const nextDirection = nextDirectionChange[current][direction];
    const result = tryAddOne + count(map,
      x + directionMappings[nextDirection].x,
      y + directionMappings[nextDirection].y,
      nextDirection, path, memo, visited);
    return memoize(result);
  } else if (current === '|' && !alreadyVisited) {
    const upPath = direction === 'DOWN' ? 0 : count(map, x, y - 1, 'UP', path, memo, visited);
    const downPath = direction === 'UP' ? 0 : count(map, x, y + 1, 'DOWN', path, memo, visited);
    return memoize(tryAddOne + upPath + downPath);
  } else if (current === '-' && !alreadyVisited) {
    const rightPath = direction === 'LEFT' ? 0 : count(map, x + 1, y, 'RIGHT', path, memo, visited);
    const leftPath = direction === 'RIGHT' ? 0 : count(map, x - 1, y, 'LEFT', path, memo, visited);
    return memoize(tryAddOne + rightPath + leftPath);
  }

  return 0;
}

export const partOne = (rows) => {
  const r = count(rows, 0, 0, 'RIGHT');
  return r;
};

export const partTwo = (rows) => {
  const lengths = [];
  for (let x = 0; x < rows[0].length; x++) {
    lengths.push(count(rows, x, 0, 'DOWN', []));
    lengths.push(count(rows, x, rows.length - 1, 'UP', []));
  }

  for (let y = 0; y < rows.length; y++) {
    lengths.push(count(rows, 0, y, 'RIGHT', []));
    lengths.push(count(rows, rows[0].length - 1, y, 'LEFT', []));
  }

  return Math.max(...lengths);
};
