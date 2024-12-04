export const partOne = (rows) => {
  const map = rows.map(c => c.split(''));

  let count = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const char = map[y][x];

      if (char === 'X') count += lookAround(x, y, map);
    }
  }

  return count;
};

const lookAround = (x, y, map) => {
  let total = 0;

  if (x + 3 < map[y].length && map[y][x + 1] === 'M' && map[y][x + 2] === 'A' && map[y][x + 3] === 'S') total++;
  if (x - 3 >= 0 && map[y][x - 1] === 'M' && map[y][x - 2] === 'A' && map[y][x - 3] === 'S') total++;
  if (y + 3 < map.length && map[y + 1][x] === 'M' && map[y + 2][x] === 'A' && map[y + 3][x] === 'S') total++;
  if (y - 3 >= 0 && map[y - 1][x] === 'M' && map[y - 2][x] === 'A' && map[y - 3][x] === 'S') total++;

  if (x + 3 < map[y].length && y + 3 < map.length && map[y + 1][x + 1] === 'M' && map[y + 2][x + 2] === 'A' && map[y + 3][x + 3] === 'S') total++;
  if (x - 3 >= 0 && y - 3 >= 0 && map[y - 1][x - 1] === 'M' && map[y - 2][x - 2] === 'A' && map[y - 3][x - 3] === 'S') total++;

  if (x + 3 < map[y].length && y - 3 >= 0 && map[y - 1][x + 1] === 'M' && map[y - 2][x + 2] === 'A' && map[y - 3][x + 3] === 'S') total++;
  if (x - 3 >= 0 && y + 3 < map.length && map[y + 1][x - 1] === 'M' && map[y + 2][x - 2] === 'A' && map[y + 3][x - 3] === 'S') total++;

  return total;
};

export const partTwo = (rows) => {
  const map = rows.map(c => c.split(''));

  let count = 0;

  for (let y = 1; y < map.length - 1; y++) { // Skip first and last rows (center cannot be on an edge)
    for (let x = 1; x < map[y].length - 1; x++) { // Skip first and last columns (center cannot be on an edge)
      if (map[y][x] === 'A') { // Check for centers
        if (map[y - 1][x - 1] === map[y + 1][x + 1] || map[y - 1][x + 1] === map[y + 1][x - 1]) continue; // Opposites cannot be equal (MAM SAS)
        if (anyCornerEqual('A', x, y, map) || anyCornerEqual('X', x, y, map)) continue;

        count++;
      }
    }
  }

  return count;
};

const anyCornerEqual = (char, x, y, map) => {
  return map[y - 1][x - 1] === char || map[y + 1][x + 1] === char || map[y - 1][x + 1] === char || map[y + 1][x - 1] === char;
};
