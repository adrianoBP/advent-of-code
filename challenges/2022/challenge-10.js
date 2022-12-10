export const partOne = (rows) => {
  const commands = rows.map(row => row.split(' ').map((x, i) => i === 0 ? x === 'addx' : parseInt(x)));
  const cycles = [20, 60, 100, 140, 180, 220];

  return emulate(cycles.at(-1), commands, (clock, register, sum) => {
    if (cycles.some(x => x === clock)) {
      sum += register * cycles.filter(x => x === clock)[0];
    }
    return sum;
  }, 0);
};

export const partTwo = (rows) => {
  const commands = rows.map(row => row.split(' ').map((x, i) => i === 0 ? x === 'addx' : parseInt(x)));

  return '\n' +
  emulate(240, commands, (clock, register, screen) => {
    screen += [register - 1, register, register + 1].includes((clock - 1) % 40) ? '##' : '  ';
    if (clock % 40 === 0) screen += '|'; // End of screen reached
    return screen;
  }, '##').split('|').join('\n');
};

const emulate = (last, commands, callback, args) => {
  let register = 1;
  let commandIndex = 0;
  let previousCommandIndex = -1;

  for (let clock = 2; clock <= last; clock++) {
    const [isAddition, amount] = commands[commandIndex];

    args = callback(clock, register, args);

    if (isAddition && previousCommandIndex !== commandIndex) {
      register += amount;
      previousCommandIndex = commandIndex;
      continue;
    }

    previousCommandIndex = commandIndex++;
  }

  return args;
};
