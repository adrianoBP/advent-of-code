export const partOne = (rows) => {
  let hx = 0;
  let hy = 0;
  let tx = 0;
  let ty = 0;

  const positions = [];
  positions.push(`${tx},${ty}`);

  for (const row of rows) {
    const [direction, amount] = row.split(' ');

    for (let i = 0; i < parseInt(amount); i++) {
      if (direction === 'R') {
        hx++;
      } else if (direction === 'U') {
        hy--;
      } else if (direction === 'L') {
        hx--;
      } else {
        hy++;
      }

      if (Math.abs(hx - tx) > 1 || Math.abs(hy - ty) > 1) {
        switch (direction) {
          case 'R':
            tx = hx - 1;
            ty = hy;
            break;
          case 'U':
            ty = hy + 1;
            tx = hx;
            break;
          case 'L':
            tx = hx + 1;
            ty = hy;
            break;
          case 'D':
            ty = hy - 1;
            tx = hx;
            break;
        }
        positions.push(`${tx},${ty}`);
      }
    }
  }

  return [...new Set(positions)].length;
};

export const partTwo = (rows) => {
  const positions = [];

  const knots = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ];

  positions.push(`${0},${0}`);

  for (const row of rows) {
    const [direction, amount] = row.split(' ');

    for (let i = 0; i < parseInt(amount); i++) {
      if (direction === 'R') {
        knots[0].x++;
      } else if (direction === 'U') {
        knots[0].y--;
      } else if (direction === 'L') {
        knots[0].x--;
      } else {
        knots[0].y++;
      }

      for (let i = 1; i < knots.length; i++) {
        if (Math.abs(knots[i - 1].x - knots[i].x) > 1 && Math.abs(knots[i - 1].x - knots[i].x) === Math.abs(knots[i - 1].y - knots[i].y) &&
        (knots[i - 1].x !== knots[i].x) && knots[i - 1].y !== knots[i].y) {
          const xDir = knots[i - 1].x < knots[i].x ? -1 : 1;
          const yDir = knots[i - 1].y < knots[i].y ? -1 : 1;

          knots[i] = {
            x: knots[i - 1].x - xDir,
            y: knots[i - 1].y - yDir,
          };
        } else if (Math.abs(knots[i - 1].x - knots[i].x) > 1 && knots[i - 1].x > knots[i].x) { // right
          knots[i] = {
            x: knots[i - 1].x - 1,
            y: knots[i - 1].y,
          };
        } else if (Math.abs(knots[i - 1].x - knots[i].x) > 1 && knots[i - 1].x < knots[i].x) { // left
          knots[i] = {
            x: knots[i - 1].x + 1,
            y: knots[i - 1].y,
          };
        } else if (Math.abs(knots[i - 1].y - knots[i].y) > 1 && knots[i - 1].y < knots[i].y) { // up
          knots[i] = {
            x: knots[i - 1].x,
            y: knots[i - 1].y + 1,
          };
        } else if (Math.abs(knots[i - 1].y - knots[i].y) > 1 && knots[i - 1].y > knots[i].y) { // down
          knots[i] = {
            x: knots[i - 1].x,
            y: knots[i - 1].y - 1,
          };
        }

        const pos = `${knots.at(-1).x},${knots.at(-1).y}`;
        if (!positions.includes(pos)) positions.push(pos);
      }
    }
  }

  return [...new Set(positions)].length;
};
