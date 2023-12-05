const buildAlmanac = (raw) => {
  return raw
    .split(/\n\s*\n/) // categories
    .slice(1) // skip seeds
    .map(categoryDetails => {
      return categoryDetails.split('\r\n').slice(1).map(details => {
        const [destination, source, range] = details.split(' ').map(x => Number(x));
        return {
          minStart: source,
          maxStart: source + range - 1,
          range,
          diff: destination - source,
        };
      });
    });
};

export const partOne = (rows, raw) => {
  const seeds = rows[0].split(' ').slice(1).map(x => Number(x));
  const almanac = buildAlmanac(raw);

  let min = Number.MAX_SAFE_INTEGER + 1;
  for (const seed of seeds) {
    let currentMapping = seed;
    for (const validRanges of almanac) {
      const mapping = validRanges.find(x => currentMapping >= x.minStart && currentMapping <= x.minStart + x.range);
      currentMapping += mapping?.diff || 0;
    }

    if (currentMapping < min) min = currentMapping;
  }
  return min;
};

const getNewRanges = (ranges, mappingRanges) => {
  const newRanges = [];
  mappingRanges.sort((a, b) => a.minStart - b.minStart);
  ranges.sort((a, b) => a.min - b.min);

  for (const { min, max } of ranges) {
    let currentMin = min; // Current range starting point

    if (min > mappingRanges.at(-1).maxStart) {
      newRanges.push({ min, max }); // 1-to-1 mapping
      continue;
    }

    for (const range of mappingRanges) {
      while (currentMin < range.maxStart && currentMin <= max) {
        if (currentMin < range.minStart) { // MIN < START
          if (max < range.maxStart) { // MAX < START
            newRanges.push({ min, max }); // 1-to-1 mapping, done
          }
          currentMin = max + 1;
        } else if (range.minStart <= currentMin && currentMin <= range.maxStart) { // MIN >= START <= END
          if (max <= range.maxStart) { // END <= MAX - mapping, done
            newRanges.push({ min: currentMin + range.diff, max: max + range.diff });
            currentMin = max + 1;
          } else { // END > MAX
            newRanges.push({ min: currentMin + range.diff, max: range.maxStart + range.diff });
            currentMin = range.maxStart + 1;
          }
        } else { // START > END
          newRanges.push({ min, max }); // 1-to-1 mapping
          currentMin = max + 1;
        }
      }

      if (currentMin > mappingRanges.at(-1).maxStart) { // START > END (leftover)
        newRanges.push({ min: currentMin, max }); // 1-to-1 mapping
      }
    }
  }

  return newRanges;
};

export const partTwo = (rows, raw) => {
  const almanac = buildAlmanac(raw);
  const seedRanges = rows[0].split(' ').slice(1).map(x => Number(x));

  let totalMin = Number.MAX_SAFE_INTEGER + 1;
  for (let i = 0; i < seedRanges.length; i += 2) {
    const min = seedRanges[i];
    const max = seedRanges[i] + seedRanges[i + 1];

    let rangesToCheck = [{ min, max }];
    for (const validRanges of almanac) {
      rangesToCheck = getNewRanges(rangesToCheck, validRanges);
    }

    const rangeInMin = Math.min(...rangesToCheck.map(x => x.min));
    if (rangeInMin < totalMin) totalMin = rangeInMin;
  }

  return totalMin;
};
