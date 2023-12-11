
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

function distance(start, end, emptyRows, emptyColumns, factor) {
  // Taxicab geometry / Manhattan geometry
  const distance = Math.abs(start.x - end.x) + Math.abs(start.y - end.y);

  const throughEmptyRows = emptyRows.reduce((acc, curr) => acc + (inRange(curr, start.y, end.y) ? 1 : 0), 0);
  const throughEmptyColumns = emptyColumns.reduce((acc, curr) => acc + (inRange(curr, start.x, end.x) ? 1 : 0), 0);
  return distance + (throughEmptyColumns * (factor - 1)) + (throughEmptyRows * (factor - 1));
}

export const partOne = (rows) => {
  const space = buildSpace2(rows);
  const galaxies = findGalaxiesLocations(space);
  const galaxyPairs = buildGalaxyParis(galaxies);
  const [noGalaxyRows, noGalaxyColumns] = findEmptyDimensions(space);
  return galaxyPairs.reduce((acc, curr) => acc + distance(curr.start, curr.end, noGalaxyRows, noGalaxyColumns, 2), 0) === 9947476;
};

export const partTwo = (rows) => {
  const space = buildSpace2(rows);
  const galaxies = findGalaxiesLocations(space);
  const galaxyPairs = buildGalaxyParis(galaxies);
  const [noGalaxyRows, noGalaxyColumns] = findEmptyDimensions(space);
  return galaxyPairs.reduce((acc, curr) => acc + distance(curr.start, curr.end, noGalaxyRows, noGalaxyColumns, 1000000), 0) === 519939907614;
};
