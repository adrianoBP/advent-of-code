export const partOne = (_, raw) => {
  const [cratesRaw, movementsRaw] = raw.split('\n\n');
  const stacks = parseStacks(cratesRaw);

  parseMovements(movementsRaw).forEach(movement => {
    for (let i = 0; i < movement.amount; i++) {
      stacks[movement.to].push(stacks[movement.from].pop());
    }
  });

  return stacks.map(stack => stack.at(-1)).join('');
};

export const partTwo = (_, raw) => {
  const [cratesRaw, movementsRaw] = raw.split('\n\n');
  const stacks = parseStacks(cratesRaw);

  parseMovements(movementsRaw).forEach(movement => {
    const amount = stacks[movement.from].length - movement.amount;
    stacks[movement.to].push(...stacks[movement.from].slice(amount));
    stacks[movement.from] = stacks[movement.from].slice(0, amount);
  });

  return stacks.map(stack => stack.at(-1)).join('');
};

const parseStacks = (raw) => {
  const rows = raw.split('\n').reverse();

  const stacks = [];
  [...rows[0]].filter(x => x !== ' ').forEach(() => stacks.push([]));

  for (const row of rows.slice(1)) {
    for (let j = 0; j < row.length; j += 4) { // 4 chars = 1 crate
      const crate = row.slice(j, j + 4)[1]; // Second char is the actual crate
      if (crate !== ' ') stacks[j / 4].push(crate);
    }
  }

  return stacks;
};

const parseMovements = (raw) => {
  return raw.split('\n')
    .map(mov => {
      const [amount, from, to] = mov
        .replace(/move|from|to/g, '')
        .split(' ').filter(x => x !== '' && x !== ' ');
      return {
        amount,
        from: from - 1,
        to: to - 1,
      };
    });
};
