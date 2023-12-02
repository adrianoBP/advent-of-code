export const partOne = (rows) => {
  const allowed = {
    red: 12,
    green: 13,
    blue: 14,
  };

  return rows
    .map(row => {
      const [gameDetails, sets] = row.split(':').map(x => x.trim());
      return {
        gameId: gameDetails.split(' ').map(x => Number(x.trim()))[1],
        sets,
      };
    })
    .filter(game => {
      game.sets = game.sets.split(';').map(x => x.trim());
      return game.sets.every(set => {
        const picks = set.split(',').map(x => x.trim());
        return picks.every(pick => {
          const [quantity, color] = pick.split(' ').map(x => x.trim());
          return quantity <= allowed[color];
        });
      });
    })
    .reduce((acc, curr) => { return acc + curr.gameId; }, 0);
};

export const partTwo = (rows) => {
  return rows
    .map(row => {
      const currentMins = { red: 1, green: 1, blue: 1 };

      row.split(/: |, |; /)
        .map(set => set.split(',')
          .map(pick => {
            const [quantity, color] = pick.trim().split(' ');
            return { quantity: Number(quantity), color };
          }))
        .flat()
        .forEach(curr => {
          if (curr.quantity > currentMins[curr.color]) currentMins[curr.color] = curr.quantity;
        });

      return [
        currentMins.red,
        currentMins.green,
        currentMins.blue,
      ].reduce((acc, curr) => { return acc * Number(curr); }, 1);
    })
    .reduce((acc, curr) => { return acc + curr; }, 0);
};
