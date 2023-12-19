export const partOne = (rows, raw) => {
  const [workflows, ratingsDefs] = raw.split(/\n\s*\n/).map(x => x.split(/\r|\n/).filter(x => x));

  const rulesBook = {};
  for (const workflow of workflows) {
    let [name, rules] = workflow.split('{');
    rules = rules.slice(0, -1).split(',');

    rulesBook[name] = rules.map(rule => {
      const args = rule.split(/<|>|=|:/);
      if (args.length === 1) return { next: args[0], isDefault: true };
      else {
        return {
          isValid: (value) => {
            if (value == null) return false;
            if (rule.includes('<')) return value < Number(args[1]);
            if (rule.includes('>')) return value > Number(args[1]);
          },
          next: args[2],
          req: args[0],
        };
      }
    });
  }

  let sum = 0;
  for (const rating of ratingsDefs) {
    const ratings = rating.slice(1, -1).split(',').map(rating => rating.split('=')).reduce((acc, [elem, qty]) => {
      acc[elem] = qty;
      return acc;
    }, {});

    let endReached = false;
    let ruleId = 'in';
    let result = false;
    while (!endReached) {
      const rules = rulesBook[ruleId].slice(0, -1);
      const finalRule = rulesBook[ruleId].at(-1);

      let ruleFound = false;
      for (const rule of rules) {
        if (rule.isValid(ratings[rule.req])) {
          ruleId = rule.next;
          ruleFound = true;
          break;
        }
      }

      if (!ruleFound) ruleId = finalRule.next;

      if (ruleId === 'A' || ruleId === 'R') {
        endReached = true;
        result = ruleId === 'A';
      }
    }

    if (result) {
      sum += Object.values(ratings).reduce((acc, curr) => acc + Number(curr), 0);
    }
  }

  return sum;
};


export const partTwo = (_, raw) => {
  const workflows = raw.split(/\n\s*\n/).map(x => x.split(/\r|\n/).filter(x => x))[0];
  const rulesBook = {};

  for (const workflow of workflows) {
    let [name, rules] = workflow.split('{');
    rules = rules.slice(0, -1).split(',');
    const fallback = rules.at(-1);
    rules = rules.slice(0, -1).map(rule => {
      const args = rule.split(/<|>|=|:/);
      const cmp = rule.includes('>') ? '>' : rule.includes('<') ? '<' : '=';
      return {
        key: args[0],
        cmp,
        n: Number(args[1]),
        target: args[2],
      };
    });

    rulesBook[name] = { rules, fallback };
  }

  const count = (ranges, name = 'in') => {
    if (name === 'R') {
      return 0;
    }
    if (name === 'A') {
      return Object.values(ranges).reduce((acc, [low, high]) => acc * (high - low + 1), 1);
    }

    const { rules, fallback } = rulesBook[name];

    let total = 0;

    let rangesLeft = true;
    for (const { key, cmp, n, target } of rules) {
      const [lo, hi] = ranges[key];

      let T = [];
      let F = [];

      if (cmp === '<') {
        T = [lo, n - 1];
        F = [n, hi];
      } else {
        T = [n + 1, hi];
        F = [lo, n];
      }

      if (T[0] <= T[1]) { // lower bound < higher bound
        const copy = JSON.parse(JSON.stringify(ranges));
        copy[key] = T;
        total += count(copy, target);
      }
      if (F[0] <= F[1]) {
        ranges = JSON.parse(JSON.stringify(ranges));
        ranges[key] = F;
      } else {
        rangesLeft = false;
        break;
      }
    }

    if (rangesLeft) {
      total += count(ranges, fallback);
    }

    return total;
  };

  return count({ x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000] });
};
