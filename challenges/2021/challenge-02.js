export const partTwo = (rows) => {
  let currentDistance = 0;
  let currentDepth = 0;
  let aim = 0;

  for (const row of rows) {
    const direction = row.split(' ')[0];
    const amount = parseInt(row.split(' ')[1]);

    switch (direction) {
      case 'forward': {
        currentDistance += amount;
        currentDepth += aim * amount;
        break;
      }
      case 'up': aim -= amount; break;
      case 'down': aim += amount; break;
    }
  }

  return (currentDistance * currentDepth);
};
