const groupedByQuantities = (arr) => {
  return arr.reduce((acc, curr) => {
    acc[curr] = curr in acc ? (acc[curr] + 1) : 1;
    return acc;
  }, {});
};

const getType = (cards, useJockers) => {
  const arr = Object.values(groupedByQuantities(cards)).sort().reverse();
  const js = cards.filter(card => card === 'J').length;

  // 1 KIND
  if (arr.length === 1) return 7; // AAAAA -> FIVE OF A KIND

  if (arr.length === 2) { // 2 KINDS
    // AAAAJ|JJJJA -> FIVE OF A KIND || AAAAB -> FULL FOUR OF A KIND
    if (arr[0] === 4) return useJockers && js >= 1 ? 7 : 6;
    // AAAJJ|JJJAA -> FIVE OF A KIND || AAABB -> FULL HOUSE
    return useJockers && js >= 2 ? 7 : 5;
  } else if (arr.length === 3) { // 3 KINDS
    // AAABJ|JJJAB -> FOUR OF A KIND || AAABC -> THREE OF A KIND
    if (arr[0] === 3) return useJockers && js >= 1 ? 6 : 4;
    // AAJJB -> FOUR OF A KIND || AABBJ -> FULL HOUSE || AABBC -> TWO PAIRS
    else return useJockers && js >= 1 ? (4 + js) : 3;
  } else if (arr.length === 4) { // 4 KINDS
    // JJABC|AABCJ -> THREE OF A KIND || AABCD -> ONE PAIR
    return useJockers && js >= 1 ? 4 : 2;
  }

  // 5 KINDS
  // ABCDJ -> TWO PAIRS || ABCDE -> HIGH CARD
  return useJockers && js >= 1 ? 2 : 1;
};

const sortByCardIndex = (numbers) => {
  return (a, b) => {
    for (let i = 0; i < a.cards.length; i++) {
      const indexA = numbers.indexOf(a.cards[i]);
      const indexB = numbers.indexOf(b.cards[i]);
      if (indexA !== indexB) return indexB - indexA;
    }
    return 0; // Equal hands
  };
};

export const partOne = (rows) => {
  const numbers = 'AKQJT98765432';

  const hands = rows.map(row => {
    const [hand, points] = row.split(' ');
    const cards = hand.split('');
    return { cards, points: Number(points), type: getType(cards) };
  });

  const byType = hands.reduce((acc, curr) => {
    acc[curr.type] = acc[curr.type] || [];
    acc[curr.type].push(curr);
    acc[curr.type].sort(sortByCardIndex(numbers)); return acc;
  }, {});

  return [...Object.values(byType).map(group => {
    return group.map(({ points }) => points);
  })].flat().reduce((acc, curr, index) => acc + (curr * (index + 1)), 0) === 247961593;
};

export const partTwo = (rows) => {
  const numbers = 'AKQT98765432J';

  const hands = rows.map(row => {
    const [hand, points] = row.split(' ');
    const cards = hand.split('');
    return { cards, points: Number(points), type: getType(cards, true) };
  });

  const groups = hands.reduce((acc, curr) => {
    acc[curr.type] = acc[curr.type] || [];
    acc[curr.type].push(curr);
    acc[curr.type].sort(sortByCardIndex(numbers)); return acc;
  }, {});

  return [...Object.values(groups).map(group => {
    return group.map(({ points }) => points);
  })].flat().reduce((acc, curr, index) => acc + (curr * (index + 1)), 0) === 248750699;
};
