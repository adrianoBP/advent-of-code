export const partOne = (rows) => {
  const times = rows[0].split(' ').filter(x => x !== '').slice(1).map(Number);
  const distances = rows[1].split(' ').filter(x => x !== '').slice(1).map(Number);

  let result = 1;
  for (let x = 0; x < times.length; x++) {
    const time = times[x];
    const record = distances[x];
    let greaters = 0;
    // run math
    for (let i = 0; i < time; i++) {
      const distance = ((time - i) * i);
      if (distance > record) greaters++;
    }
    result *= greaters;
  }

  return result;
};

export const partTwo = (rows) => {
  const time = Number(rows[0].split(' ').filter(x => x !== '').slice(1).join(''));
  const record = Number(rows[1].split(' ').filter(x => x !== '').slice(1).join(''));

  let greaters = 0;
  // run math
  for (let i = 0; i < time; i++) {
    const distance = ((time - i) * i);
    if (distance > record) greaters++;
  }

  return greaters;
};
