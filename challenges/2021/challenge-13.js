export const partTwo = (rows) => {
  let { dots, instructions } = getParameters(rows);

  for (const instruction of instructions) {
    if (instruction.axis === 'x') {
      for (const dot of dots) {
        if (dot.x > instruction.index) dot.x = instruction.index - (dot.x - instruction.index);
      }
    }

    if (instruction.axis === 'y') {
      for (const dot of dots) {
        if (dot.y > instruction.index) dot.y = instruction.index - (dot.y - instruction.index);
      }
    }

    dots = dots.reduce((acc, dot) => {
      if (acc.find(d => d.x === dot.x && d.y === dot.y)) {
        return acc;
      }
      return [...acc, dot];
    }, []);
  }

  return ('\n' + printResult(dots));
};

const getParameters = (rows) => {
  const dots = [];
  const instructions = [];

  for (const row of rows) {
    if (row.startsWith('fold')) {
      const [axis, index] = row.split(' ').slice(-1)[0].split('=');
      instructions.push({
        axis,
        index: parseInt(index),
      });
    } else if (!row) {
      continue;
    } else {
      const [x, y] = row.split(',').map(Number);
      dots.push({ x, y });
    }
  }

  return { dots, instructions };
};

const printResult = (dots) => {
  const maxX = dots.reduce((acc, dot) => Math.max(acc, dot.x), 0);
  const maxY = dots.reduce((acc, dot) => Math.max(acc, dot.y), 0);

  dots = dots.map(dot => `${dot.x}${dot.y}`);

  let finalResult = '';

  for (let y = 0; y <= maxY; y++) {
    let row = '';
    for (let x = 0; x <= maxX; x++) {
      row += dots.includes(`${x}${y}`) ? '#' : '.';
    }
    finalResult += row + '\n';
  }

  return finalResult;
};
