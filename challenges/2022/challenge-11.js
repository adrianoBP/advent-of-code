export const partOne = (rows, raw) => {
  const monkeys = raw.split('\n\n')
    .map(monkey => {
      let [items, op, test, trueCon, falseCon] = monkey.split('\n').map(data => data.split(':')[1]).slice(1);

      items = items.split(',').map(item => { return { worryLevel: parseInt(item.trim()), visits: 0 }; });
      op = op.split(' ').slice(-2);
      test = test.split(' ').slice(-1).map(Number)[0];
      trueCon = trueCon.split(' ').slice(-1).map(Number)[0];
      falseCon = falseCon.split(' ').slice(-1).map(Number)[0];

      return { items: items || [], operation: { sign: op[0], where: op[1] }, test, trueCon, falseCon, visits: 0 };
    });

  for (let i = 0; i < 20; i++) {
    for (const monkey of monkeys) {
      for (const item of monkey.items) {
        monkey.visits++;

        const howMuch = monkey.operation.where === 'old' ? item.worryLevel : parseInt(monkey.operation.where);
        if (monkey.operation.sign === '+') {
          item.worryLevel = item.worryLevel + howMuch;
        } else {
          item.worryLevel = item.worryLevel * howMuch;
        }

        item.worryLevel = parseInt(item.worryLevel / 3);

        if (item.worryLevel % monkey.test === 0) {
          monkeys[monkey.trueCon].items.push(item);
        } else {
          monkeys[monkey.falseCon].items.push(item);
        }
      }
      monkey.items = [];
    }
  }

  const levels = monkeys.map(monkey => parseInt(monkey.visits)).sort(function (a, b) { return b - a; });

  return levels[0] * levels[1];
};

export const partTwo = (rows, raw) => {
  const monkeys = raw.split('\n\n')
    .map(monkey => {
      let [items, op, test, trueCon, falseCon] = monkey.split('\n').map(data => data.split(':')[1]).slice(1);

      items = items.split(',').map(item => { return { worryLevel: parseInt(item.trim()), visits: 0 }; });
      op = op.split(' ').slice(-2);
      test = test.split(' ').slice(-1).map(Number)[0];
      trueCon = trueCon.split(' ').slice(-1).map(Number)[0];
      falseCon = falseCon.split(' ').slice(-1).map(Number)[0];

      return { items: items || [], operation: { sign: op[0], where: op[1] }, test, trueCon, falseCon, visits: 0 };
    });

  const modProd = monkeys.map((monkey) => monkey.test).reduce((acc, n) => acc * n);

  for (let i = 0; i < 10000; i++) {
    for (const monkey of monkeys) {
      for (const item of monkey.items) {
        monkey.visits++;

        const howMuch = monkey.operation.where === 'old' ? item.worryLevel : parseInt(monkey.operation.where);
        if (monkey.operation.sign === '+') {
          item.worryLevel = item.worryLevel + howMuch;
        } else {
          item.worryLevel = item.worryLevel * howMuch;
        }

        item.worryLevel = item.worryLevel % modProd;

        if (item.worryLevel % monkey.test === 0) {
          monkeys[monkey.trueCon].items.push(item);
        } else {
          monkeys[monkey.falseCon].items.push(item);
        }
      }
      monkey.items = [];
    }
  }

  const levels = monkeys.map(monkey => parseInt(monkey.visits)).sort(function (a, b) { return b - a; });

  return levels[0] * levels[1];
};
