import { PriorityQueue } from '../../tools/priorityQueue.js';

function count(grid, maxSameDirection, minSameDirection = 0) {
  const pq = new PriorityQueue((a, b) => a[0] < b[0]);
  pq.push(
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0],
  );
  const seen = {
    '0,0,0,1,0': 0,
    '0,0,1,0,0': 0,
  };

  while (pq.size() > 0) {
    const [heatLoss, y, x, dirY, dirX, consecutive] = pq.pop();

    const target = [grid.length - 1, grid[0].length - 1];
    if ([y, x].toString() === target.toString() && consecutive >= minSameDirection) {
      return heatLoss;
    }

    let key = [y, x, dirY, dirX, consecutive].toString();
    if (heatLoss > seen[key]) continue;

    const dirs = [];

    if (consecutive < maxSameDirection) { dirs.push([dirY, dirX]); } // we can go straight

    if (consecutive >= minSameDirection) { // add turns
      dirs.push([-dirX, dirY]);
      dirs.push([dirX, -dirY]);
    }

    for (const [ndr, ndc] of dirs) {
      const nextY = y + ndr;
      const nextX = x + ndc;
      if (nextY >= 0 && nextY < grid.length && nextX >= 0 && nextX < grid[0].length) { // is in bounds
        const nextHeatLoss = heatLoss + grid[nextY][nextX];
        const nextConsecutive = [ndr, ndc].toString() === [dirY, dirX].toString() ? consecutive + 1 : 1;
        key = [nextY, nextX, ndr, ndc, nextConsecutive].toString();
        if (!(key in seen) || nextHeatLoss < seen[key]) {
          seen[key] = nextHeatLoss;
          pq.push([nextHeatLoss, nextY, nextX, ndr, ndc, nextConsecutive]);
        }
      }
    }
  }
}

export const partOne = (rows) => {
  const grid = rows.map(row => row.split('').map(Number));
  return count(grid, 3);
};

export const partTwo = (rows) => {
  const grid = rows.map(row => row.split('').map(Number));
  return count(grid, 10, 4);
};
