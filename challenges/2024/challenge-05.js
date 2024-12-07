export const partOne = (rows) => {
  const { rules, updates } = rows.reduce(({ rules, updates, rulesDone }, curr) => {
    if (curr === '') return { rules, updates, rulesDone: true };

    if (rulesDone) updates.push(curr.split(','));
    if (!rulesDone) {
      const [base, follow] = curr.split('|');
      if (!(base in rules)) rules[base] = [];
      rules[base].push(follow);
    }

    return { rules, updates, rulesDone };
  }, { rules: {}, updates: [], rulesDone: false });


  let total = 0;

  for (const update of updates) {
    let isValid = true;
    for (let i = 0; i < update.length; i++) {
      const currentPage = update[i];

      const pagesBefore = [...update].slice(0, i);

      isValid = isValid && (!(currentPage in rules) || pagesBefore.every(page => !rules[currentPage].includes(page)));
    }

    if (isValid) {
      total += Number(update[Math.floor(update.length / 2)]);
    }
  }

  return total;
};

export const partTwo = (rows, raw) => {
  return 'Hash for challenge two';
};
