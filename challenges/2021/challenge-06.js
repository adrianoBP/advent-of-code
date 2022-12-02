export const partTwo = (_, raw) => {
  const timers = raw.split(',').map(Number);

  const groupedTimers = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (const timer of timers) {
    groupedTimers[timer]++;
  }

  for (let day = 1; day <= 256; day++) {
    let toRenew = 0;
    let toAdd = 0;

    for (let i = 0; i < groupedTimers.length; i++) {
      if (i === 0) {
        toRenew = groupedTimers[i];
        toAdd += groupedTimers[i];
      }

      groupedTimers[i] = i === 8 ? 0 : groupedTimers[i + 1];
    }

    groupedTimers[6] += toRenew;
    groupedTimers[8] = toAdd;
  }

  return (groupedTimers.reduce((a, b) => a + b, 0));
};
