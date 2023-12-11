function buildSpace2(rows) {
  return rows.map((row, y) => row.split('').map((element, x) => ({ x, y, element })));
}

function findGalaxiesLocations(space) {
  return space.reduce((acc, curr) => [
    ...acc, curr.filter(({ element }) => element === '#')
      .map(({ x, y }) => ({ x, y })),
  ], []).flat();
}

function buildGalaxyParis(galaxies) {
  const pairs = [];
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      pairs.push({
        start: galaxies[i],
        end: galaxies[j],
      });
    }
  }
  return pairs;
}

function findEmptyDimensions(space) {
  const noGalaxyRows = space.reduce((acc, curr, index) => {
    if (curr.every(section => section.element === '.')) acc.push(index);
    return acc;
  }, []);

  const noGalaxyColumns = [];
  for (let x = space[0].length - 1; x >= 0; x--) {
    if (space.every(row => row.at(x).element === '.')) noGalaxyColumns.push(x);
  }

  return [noGalaxyRows, noGalaxyColumns];
}

function inRange(element, start, end) {
  return (element > start && element < end) || (element > end && element < start);
}

function calculateIntersections(arr, start, end, property) {
  arr.reduce((acc, curr) => acc + (inRange(curr, start[property], end[property]) ? 1 : 0), 0);
}

function distance(start, end, noGalaxyRows, noGalaxyColumns, factor) {
  // Taxicab geometry / Manhattan geometry
  const distance = Math.abs(start.x - end.x) + Math.abs(start.y - end.y);
  const throughEmptyRows = calculateIntersections(noGalaxyRows, start, end, 'y');
  const throughEmptyColumns = calculateIntersections(noGalaxyColumns, start, end, 'x');
  return distance + (throughEmptyColumns * (factor - 1)) + (throughEmptyRows * (factor - 1));
}

function getGalaxyInfo(rows) {
  const space = buildSpace2(rows);
  const galaxies = findGalaxiesLocations(space);
  return [buildGalaxyParis(galaxies), ...findEmptyDimensions(space)];
}

export const partOne = (rows) => {
  const [galaxyPairs, noGalaxyRows, noGalaxyColumns] = getGalaxyInfo(rows);
  return galaxyPairs.reduce((acc, curr) => acc + distance(curr.start, curr.end, noGalaxyRows, noGalaxyColumns, 2), 0) === 9947476;
};

export const partTwo = (rows) => {
  const [galaxyPairs, noGalaxyRows, noGalaxyColumns] = getGalaxyInfo(rows);
  return galaxyPairs.reduce((acc, curr) => acc + distance(curr.start, curr.end, noGalaxyRows, noGalaxyColumns, 1000000), 0) === 519939907614;
};
