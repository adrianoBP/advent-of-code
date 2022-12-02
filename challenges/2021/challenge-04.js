export const partTwo = (rows) => {
  const numbers = rows[0].split(',');

  const tables = getTables(rows.splice(1));

  const drawnNumbers = [];
  let lastWinningTable = null;

  for (let i = 0; i < numbers.length && tables.length > 0; i++) {
    drawnNumbers.push(numbers[i]);

    for (let j = tables.length - 1; j >= 0; j--) {
      if (isBingo(tables[j], drawnNumbers)) {
        lastWinningTable = {
          table: tables[j],
          winningNumber: numbers[i],
        };
        tables.splice(j, 1);
      }
    }
  }

  const sum = lastWinningTable.table
    .flat()
    .filter(x => !drawnNumbers.includes(x))
    .map(x => parseInt(x)).reduce((a, b) => a + b);
  return (sum * lastWinningTable.winningNumber);
};

const getTables = (rows) => {
  const tables = [];
  for (let i = 0; i < rows.length; i += 6) {
    const table = [];
    for (let j = i + 1; j < i + 6; j++) { // Skip first empty line
      table.push(rows[j].split(' ').filter(x => x !== ''));
    }
    tables.push(table);
  }

  return tables;
};

const isBingo = (table, numbers) => {
  for (let i = 0; i < table.length; i++) {
    // Check horizontal
    if (table[i].every(x => numbers.includes(x))) return true;
    // Check vertical
    if (table.map(x => x[i]).every(x => numbers.includes(x))) return true;
  }

  return false;
};
