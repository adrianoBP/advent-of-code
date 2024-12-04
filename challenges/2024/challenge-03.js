export const partOne = (_, raw) => {
  return raw.match(/mul\(\d{1,3},\d{1,3}\)/g).reduce((acc, curr) => {
    const [first, second] = curr.match(/\d{1,3}/g);
    return acc + (first * second);
  }, 0);
};

export const partTwo = (_, raw) => {
  return raw.match(/mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g)
    .reduce(({ total, allowed }, curr) => {
      if (curr === 'do()') return { total, allowed: true };
      if (curr === 'don\'t()') return { total, allowed: false };
      if (!allowed) return { total, allowed };

      const [first, second] = curr.match(/\d{1,3}/g);
      return { total: total + (first * second), allowed };
    }, { total: 0, allowed: true }).total;
};
