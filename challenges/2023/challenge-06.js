export const partOne = (rows) => {
  const times = rows[0].split(' ').filter(x => x !== '').slice(1).map(Number);
  const distances = rows[1].split(' ').filter(x => x !== '').slice(1).map(Number);

  let result = 1;
  for (let timeIndex = 0; timeIndex < times.length; timeIndex++) {
    const time = times[timeIndex];
    const record = distances[timeIndex];
    let wins = 0;
    for (let ms = 0; ms < time; ms++) {
      const distance = ((time - ms) * ms);
      if (distance > record) wins++;
    }
    result *= wins;
  }
  return result;
};

export const partTwo = (rows) => {
  const time = Number(rows[0].split(' ').filter(x => x !== '').slice(1).join(''));
  const record = Number(rows[1].split(' ').filter(x => x !== '').slice(1).join(''));

  let wins = 0;
  for (let ms = 0; ms < time; ms++) {
    const distance = ((time - ms) * ms);
    if (distance > record) wins++;
  }

  return wins;
};
