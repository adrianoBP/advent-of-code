function count(map, x, y, direction, visited = {}) {
  const current = map[y]?.[x];
  if (current == null) return 0;

  const hash = `${x},${y}`;

  const alreadyVisited = hash in visited;

  if (alreadyVisited && direction in visited[hash]) return 0;
  else {
    visited[hash] = visited[hash] || {};
    visited[hash][direction] = visited[hash][direction] || {};
  }

  const countUp = () => { return count(map, x, y - 1, 'UP', visited); };
  const countDown = () => { return count(map, x, y + 1, 'DOWN', visited); };
  const countLeft = () => { return count(map, x - 1, y, 'LEFT', visited); };
  const countRight = () => { return count(map, x + 1, y, 'RIGHT', visited); };

  const directionToNextMove = {
    UP: { '/': countRight, '\\': countLeft, '.': countUp },
    DOWN: { '/': countLeft, '\\': countRight, '.': countDown },
    LEFT: { '/': countDown, '\\': countUp, '.': countLeft },
    RIGHT: { '/': countUp, '\\': countDown, '.': countRight },
  };

  const tryAdd = alreadyVisited ? 0 : 1;
  switch (current) {
    case '.':
    case '\\':
    case '/':
      return tryAdd + directionToNextMove[direction][current]();
    case '|':
    {
      const upResult = direction === 'DOWN' ? 0 : countUp();
      const downResult = direction === 'UP' ? 0 : countDown();
      return tryAdd + upResult + downResult;
    }
    case '-':
    {
      const leftResult = direction === 'RIGHT' ? 0 : countLeft();
      const rightResult = direction === 'LEFT' ? 0 : countRight();
      return tryAdd + leftResult + rightResult;
    }
  }
}

export const partOne = (rows) => {
  return count(rows, 0, 0, 'RIGHT');
};

export const partTwo = (rows) => {
  const lengths = [];
  for (let x = 0; x < rows[0].length; x++) {
    lengths.push(count(rows, x, 0, 'DOWN'));
    lengths.push(count(rows, x, rows.length - 1, 'UP'));
  }

  for (let y = 0; y < rows.length; y++) {
    lengths.push(count(rows, 0, y, 'RIGHT'));
    lengths.push(count(rows, rows[0].length - 1, y, 'LEFT'));
  }

  return Math.max(...lengths);
};
