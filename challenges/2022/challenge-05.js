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

  for (let i = 1; i < rows.length; i++) {
    rows[i]
      .replaceAll('    ', '_') // 4 spaces = 1 'no crate'. Last one may be missed, but we don't need to add it anyways, so can be ignored (bug -> feature)
      .replace(/(\[)|(\])|( )/g, '') // Remove all the remaining junk
      .split('')
      .forEach((crate, index) => {
        if (crate !== '_') stacks[index].push(crate);
      });
  }

  return stacks;
};

const parseMovements = (raw) => {
  return raw.split('\n')
    .map(mov => {
      const [amount, from, to] = mov
        .replace(/move | from | to /g, ',')
        .split(',').filter(x => x !== '');
      return {
        amount,
        from: parseInt(from) - 1,
        to: parseInt(to) - 1,
      };
    });
};
