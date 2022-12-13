export const partOne = (rows, raw) => {
  const pairs = raw.split('\n\n').map(pair => pair.split('\n').map(data => JSON.parse(data)));

  let index = 1;
  let sum = 0;
  for (const pair of pairs) {
    const correct = inCorrectOrder(pair[0], pair[1]);
    if (correct) {
      sum += index;
    }
    index++;
  }

  return sum;
};

const copy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const partTwo = (rows) => {
  let packets = rows.filter(x => x !== '').map(data => JSON.parse(data));
  packets = [...packets, [[2]], [[6]]];

  let isSorter = true;
  for (let index = 0; index < packets.length - 1; index++) {
    const areSorted = inCorrectOrder(copy(packets[index]), copy(packets[index + 1]));

    if (!areSorted) {
      const temp = copy(packets[index]);
      packets[index] = copy(packets[index + 1]);
      packets[index + 1] = copy(temp);
    }

    isSorter = isSorter && areSorted;

    if (index === packets.length - 2) {
      index = -1;
      if (isSorter) break;
      isSorter = true;
    }
  }

  let res = 1;
  for (let i = 1; i <= packets.length; i++) {
    if (JSON.stringify(packets[i - 1]) === JSON.stringify([[2]]) || JSON.stringify(packets[i - 1]) === JSON.stringify([[6]])) {
      res *= i;
    }
  }

  return res;
};


const isArray = (val) => {
  return val.constructor === Array;
};

function isNumber(x) {
  return !isArray(x) && !isNaN(x);
}

const inCorrectOrder = (left, right) => {
  while (left.length && right.length) {
    const l = left.shift();
    const r = right.shift();

    if (isNumber(l) && isNumber(r)) {
      if (l < r) return true;
      if (l > r) return false;
    } else if (isArray(l) && isNumber(r)) {
      const res = inCorrectOrder(l, [r]);
      if (res != null) return res;
    } else if (isNumber(l) && isArray(r)) {
      const res = inCorrectOrder([l], r);
      if (res != null) return res;
    } else {
      const res = inCorrectOrder(l, r);
      if (res != null) return res;
    }
  }
  if (left.length) return false;
  if (right.length) return true;
};
