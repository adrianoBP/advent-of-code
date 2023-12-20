class Pointer { constructor(targets) { this.targets = targets; } }

class FlipFlop extends Pointer { constructor(targets) { super(targets); this.status = false; } }

class Conjunction extends Pointer { constructor(targets) { super(targets); this.inputs = {}; } }

class Signal { constructor(from, target, type = false) { this.from = from; this.target = target; this.type = type; } }

const parseInput = (rows) => {
  const { broadcaster, flipflops, conjunctions } = rows.reduce((acc, curr) => {
    let [element, targets] = curr.split(' -> ');
    targets = targets.split(',').map(x => x.trim());

    if (element === 'broadcaster') acc.broadcaster = { targets };
    else {
      if (element[0] === '%') acc.flipflops[element.slice(1)] = new FlipFlop(targets);
      else acc.conjunctions[element.slice(1)] = new Conjunction(targets);
    }

    return acc;
  }, { broadcaster: null, flipflops: {}, conjunctions: {} });

  // Add inputs
  Object.keys(conjunctions).forEach(cKey => {
    conjunctions[cKey].inputs = Object.keys(flipflops).reduce((acc, ffKey) => {
      if (flipflops[ffKey].targets.includes(cKey)) { acc[ffKey] = false; }
      return acc;
    }, {});
  });

  return { broadcaster, flipflops, conjunctions };
};
export const partOne = (rows) => {
  const { broadcaster, flipflops, conjunctions } = parseInput(rows);
  const counts = { low: 0, high: 0 };
  let presses = 1000;
  while (presses-- > 0) {
    counts.low++;
    const queue = [...broadcaster.targets.map(target => new Signal('broadcaster', target))];

    while (queue.length > 0) {
      const signal = queue.shift();
      // console.log(signal.from, (signal.type ? 'HIGH' : 'LOW'), signal.target);

      if (signal.type) counts.high++;
      else counts.low++;

      // Handle to FlipFlop
      if (signal.target in flipflops) {
        if (signal.type) continue; // if signal is HIGH, skip
        flipflops[signal.target].status = !flipflops[signal.target].status;
        queue.push(...flipflops[signal.target].targets.map(target => new Signal(signal.target, target, flipflops[signal.target].status)));
      }

      // Handle to conjunction
      if (signal.target in conjunctions) {
        conjunctions[signal.target].inputs[signal.from] = signal.type;
        const allHigh = Object.values(conjunctions[signal.target].inputs).every(input => input);
        queue.push(...conjunctions[signal.target].targets.map(target => new Signal(signal.target, target, !allHigh)));
      }
    }
  }

  return counts.low * counts.high;
};

export const partTwo = (rows) => {
  const { broadcaster, flipflops, conjunctions } = parseInput(rows);
  const counts = { low: 0, high: 0 };
  let presses = 100000000;
  while (presses-- > 0) {
    counts.low++;
    const queue = [...broadcaster.targets.map(target => new Signal('broadcaster', target))];

    while (queue.length > 0) {
      const signal = queue.shift();

      if (signal.from === 'rx') return presses;
      // console.log(signal.from, (signal.type ? 'HIGH' : 'LOW'), signal.target);

      if (signal.type) counts.high++;
      else counts.low++;

      // Handle to FlipFlop
      if (signal.target in flipflops) {
        if (signal.type) continue; // if signal is HIGH, skip
        flipflops[signal.target].status = !flipflops[signal.target].status;
        queue.push(...flipflops[signal.target].targets.map(target => new Signal(signal.target, target, flipflops[signal.target].status)));
      }

      // Handle to conjunction
      if (signal.target in conjunctions) {
        conjunctions[signal.target].inputs[signal.from] = signal.type;
        const allHigh = Object.values(conjunctions[signal.target].inputs).every(input => input);
        queue.push(...conjunctions[signal.target].targets.map(target => new Signal(signal.target, target, !allHigh)));
      }
    }
  }

  return counts.low * counts.high;
};
