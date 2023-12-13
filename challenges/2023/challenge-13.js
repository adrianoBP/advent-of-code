function calculateMirrors(rows, sideLength, getSidesFun, findSmudges) {
  for (let i = 0; i < sideLength - 1; i++) {
    const [first, second] = getSidesFun(rows, i);

    if (findSmudges || first === second) {
      let perfectMirror = true;
      const smudges = [];
      for (let j = 1 - (findSmudges ? 1 : 0); j < Math.min(i + 1, sideLength - (i + 1)); j++) {
        const [firstDelta, secondDelta] = getSidesFun(rows, i, j);
        perfectMirror = perfectMirror && firstDelta === secondDelta;

        if (findSmudges) {
          for (let k = 0; k < firstDelta.length; k++) {
            if (firstDelta[k] !== secondDelta[k]) smudges.push({ x: j, y: k });
          }
        }
      }

      if (!findSmudges && perfectMirror) { return i + 1; }
      if (findSmudges && smudges.length === 1) { return i + 1; }
    }
  }

  return 0;
}
const getLeftRight = (rows, i, j = 0) => {
  const left = rows.map(row => row[i - j]);
  const right = rows.map(row => row[i + 1 + j]);
  return [left.join(''), right.join('')];
};

const getUpDown = (rows, i, j = 0) => {
  const up = rows[i - j];
  const down = rows[i + 1 + j];
  return [up, down];
};

export const partOne = (rows, raw) => {
  return raw.split(/\n\s*\n/).map(field => field.split(/\r|\n/).filter(x => x))
    .reduce((acc, curr) => {
      const verticalMirror = calculateMirrors(curr, curr[0].length, getLeftRight);
      const horizontalMirror = calculateMirrors(curr, curr.length, getUpDown);
      return acc + (verticalMirror + 100 * horizontalMirror);
    }, 0);
};

export const partTwo = (rows, raw) => {
  return raw.split(/\n\s*\n/).map(field => field.split(/\r|\n/).filter(x => x))
    .reduce((acc, curr) => {
      const verticalMirror = calculateMirrors(curr, curr[0].length, getLeftRight, true);
      const horizontalMirror = calculateMirrors(curr, curr.length, getUpDown, true);
      return acc + (verticalMirror + 100 * horizontalMirror);
    }, 0);
};
