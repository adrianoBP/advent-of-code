export const partOne = (rows) => {
  return rows
    .map(row => {
      return row.slice(8) // Skip card number
        .split('|')
        .map(x => x.trim().split(' ').filter(x => x !== ''));
    })
    .reduce((acc, [winningNums, selectedNums]) => {
      const points = selectedNums.filter(num => winningNums.includes(num)).length;
      if (points > 0) return acc + Math.pow(2, points - 1);
      return acc;
    }, 0);
};

export const partTwo = (rows) => {
  const cards = rows.map(row => {
    const cardNum = row.split(':')[0].split(' ').pop();
    return [Number(cardNum), ...row.slice(8)
      .split('|')
      .map(nums => nums.trim().split(' ').filter(num => num)),
    ];
  });

  const totals = {};
  for (const [cardNum, winningNums, selectedNums] of cards) {
    const points = selectedNums.filter(num => winningNums.includes(num)).length;

    totals[cardNum] = totals[cardNum] || 1; // Add current card
    if (points === 0) continue;

    const additionalWinnings = Array.from({ length: points }, (_, index) => index + cardNum + 1);

    for (let i = 0; i < totals[cardNum]; i++) {
      for (let i = additionalWinnings.at(0); i <= additionalWinnings.at(-1); i++) {
        totals[i] = totals[i] || 1;
        totals[i]++;
      }
    }
  }

  return Object.values(totals).reduce((acc, curr) => { return curr + acc; }, 0);
};
