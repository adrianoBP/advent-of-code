export const partOne = (rows) => {
  const commands = rows.map(row => row.split(' ').map((x, i) => i === 0 ? x : parseInt(x)));
  return getTrailLength(2, commands);
};

export const partTwo = (rows) => {
  const commands = rows.map(row => row.split(' ').map((x, i) => i === 0 ? x : parseInt(x)));
  return getTrailLength(10, commands);
};

const getTrailLength = (nodesCount, commands) => {
  const knots = [...Array(nodesCount)].map(() => { return { x: 0, y: 0 }; });
  const trail = new Set([`${0}${0}`]);

  // Indicates how much to increment the axis by for the direction
  const moveRules = {
    R: { x: -1, y: 0 },
    U: { x: 0, y: 1 },
    D: { x: 0, y: -1 },
    L: { x: 1, y: 0 },
  };

  for (const [direction, amount] of commands) {
    [...Array(amount)].forEach(() => {
      const what = ['R', 'L'].includes(direction) ? 'x' : 'y';
      const howMuch = ['R', 'D'].includes(direction) ? 1 : -1;
      knots[0][what] += howMuch; // Move the head

      for (let i = 1; i < knots.length; i++) {
        const isXMove = Math.abs(knots[i - 1].x - knots[i].x) > 1; // Move when two knots aren't side by side
        const isYMove = Math.abs(knots[i - 1].y - knots[i].y) > 1; // Move when two knots aren't side by side
        if (!isXMove && !isYMove) continue;

        const xMove = !isXMove ? undefined : knots[i - 1].x > knots[i].x ? 'R' : 'L';
        const yMove = !isYMove ? undefined : knots[i - 1].y > knots[i].y ? 'D' : 'U';

        knots[i] = {
          x: knots[i - 1].x + (moveRules[xMove]?.x || 0) + (moveRules[yMove]?.x || 0),
          y: knots[i - 1].y + (moveRules[xMove]?.y || 0) + (moveRules[yMove]?.y || 0),
        };

        trail.add(`${knots.at(-1).x}${knots.at(-1).y}`);
      }
    });
  }

  return trail.size;
};
