import { JSCopy } from '../../tools/copy.js';


export const partOne = (rows) => {
  class Point {
    constructor(x, y, type) {
      this.x = Number(x);
      this.y = Number(y);
      this.type = type;
      this.key = `${this.x},${this.y}`;
    }

    getSurroundings() {
      const surroundings = [];
      for (const [dirx, diry] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const newx = this.x + dirx;
        const newy = this.y + diry;
        const nextPoint = new Point(newx, newy);
        if (newx >= 0 && newx < rows[0].length && newy >= 0 && newy < rows.length && garden[nextPoint.key].type !== '#') {
          surroundings.push(nextPoint);
        }
      }

      return surroundings;
    }
  }

  const garden = {};
  let start = {};
  const stones = [];
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[0].length; x++) {
      const type = rows[y][x];
      const point = new Point(x, y, type);
      if (type === 'S') start = JSCopy(point);
      else if (type === '#') stones.push(point.key);

      garden[point.key] = point;
    }
  }

  let loops = 64;
  let plots = [start.key];
  while (loops-- > 0) {
    for (const [x, y] of plots.map(p => p.split(','))) {
      const point = new Point(x, y);
      plots = plots.filter(p => p !== point.key);
      plots.push(...point.getSurroundings().map(p => p.key));
    }

    plots = [...new Set(plots)];
  }

  return plots.length;
};

export const partTwo = (rows, raw) => {
  return 'Hash for challenge two';
};
