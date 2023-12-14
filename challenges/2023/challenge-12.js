function count(segment, groups, memo = {}) {
  function handleDot() {
    return count(segment.slice(1), groups, memo);
  }

  function handleHash() {
    const currentGroupSize = groups[0];
    if (
      currentGroupSize <= segment.length && // we must have enough springs left
      !segment.slice(0, currentGroupSize).includes('.') && // all springs before N must be broken up
      (
        currentGroupSize === segment.length || // number of strings matches the group size
        segment[currentGroupSize] !== '#' // next space must not be a #
      )
    ) {
      return count(segment.slice(currentGroupSize + 1), groups.slice(1), memo);
    }
    return 0;
  }

  function memoize(result) {
    memo[cacheKey] = result;
    return result;
  }

  const cacheKey = segment + groups.join('');
  if (cacheKey in memo) return memo[cacheKey];

  // check if the segment is empty and if the configs are also empty, return 1
  if (segment === '') return memoize(groups.length === 0 ? 1 : 0);
  // if we don't have any more configs, check if we still need configs, if so return 0
  if (groups.length === 0) return memoize(segment.includes('#') ? 0 : 1);

  const currentElement = segment[0];

  if (currentElement === '.') return memoize(handleDot());
  else if (currentElement === '#') return memoize(handleHash());
  else return memoize(handleDot() + handleHash());
}

export const partOne = (rows) => {
  return rows.reduce((acc, curr) => {
    let [segment, groups] = curr.split(' ');
    groups = groups.split(',').map(Number);
    return acc + count(segment, groups);
  }, 0);
};

export const partTwo = (rows) => {
  return rows.reduce((acc, curr) => {
    let [segment, groups] = curr.split(' ');
    groups = groups.split(',').map(Number);
    const x5Rows = segment + '?' + segment + '?' + segment + '?' + segment + '?' + segment;
    const x5Groups = [...groups, ...groups, ...groups, ...groups, ...groups];
    return acc + count(x5Rows, x5Groups);
  }, 0);
};
