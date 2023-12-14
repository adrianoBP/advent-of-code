function aIsLower(a, b) {
  return a < b;
}

function bIsLower(a, b) {
  return b < a;
}

function push(rows, reverseX, reverseY, term) {
  const newMapDetails = [];

  const startX = reverseX ? rows[0].length - 1 : 0;
  const endX = reverseX ? 0 : rows[0].length;
  const startY = reverseY ? rows.length - 1 : 0;
  const endY = reverseY ? 0 : rows.length;

  const startingPos = reverseX || reverseY ? Math.max(startX, startY) : 0;
  const delta = reverseX || reverseY ? -1 : 1;
  const comparer = (a, b) => reverseX || reverseY ? aIsLower(a, b) : bIsLower(a, b);

  function compare(isReversed, a, b) {
    return isReversed ? b <= a : a < b;
  }

  const checkColumns = term === 'y';

  for (let y = startY; compare(reverseY, y, endY); y += (reverseY ? -1 : 1)) {
    for (let x = startX; compare(reverseX, x, endX); x += (reverseX ? -1 : 1)) {
      const current = rows[y][x];
      newMapDetails[y] = newMapDetails[y] || [];

      if (current === '#') {
        newMapDetails[y].push({ pos: { x, y }, type: '#' });
        continue;
      }

      if (current === 'O') {
        const elementsInFront = checkColumns ? newMapDetails.map(row => row.find(z => z.pos.x === x)).filter(x => x) : newMapDetails[y];

        const closestBlock = elementsInFront?.reduce((acc, curr) => {
          if (acc.pos?.[term] == null || comparer(curr.pos[term], acc.pos[term])) acc = curr;
          return acc;
        }, {});

        // If we have a free path to the north
        if (elementsInFront.length === 0) {
          newMapDetails[checkColumns ? startingPos : y].push({
            pos: {
              x: checkColumns ? x : startX,
              y: term === 'x' ? y : startingPos,
            },
            type: 'O',
          });
        } else {
          // find next available from position
          const key = checkColumns ? closestBlock.pos.y + delta : y;
          newMapDetails[key].push({
            pos: {
              x: checkColumns ? x : closestBlock.pos.x + delta,
              y: term === 'x' ? y : closestBlock.pos.y + delta,
            },
            type: 'O',
          });
        }
      }
    }
  }

  return newMapDetails;
}

export const partOne = (rows) => {
  const map = writeMap(push([...rows], false, false, 'y'), rows[0].length, rows.length);
  return weightMap(map) === 113486;
};

function writeMap(rows, width, height) {
  const map = [];
  for (let y2 = 0; y2 < height; y2++) {
    let row = '';
    for (let x = 0; x < width; x++) {
      const possibleRock = rows[y2].find(r => r.pos.x === x);
      row += possibleRock?.type || '.';
    }
    map.push(row);
  }
  return map;
}

function cycle(rows, width, height) {
  const north = writeMap(push(rows, false, false, 'y'), width, height);
  const west = writeMap(push(north, false, false, 'x'), width, height);
  const south = writeMap(push(west, false, true, 'y'), width, height);
  const east = writeMap(push(south, true, false, 'x'), width, height);
  return east;
}

function weightMap(map) {
  let sum = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === 'O') sum += map.length - y;
    }
  }
  return sum;
}

export const partTwo = (rows) => {
  const size = 1000000000;

  let map = rows;
  const visitedMaps = [];

  for (let i = 0; i < size; i++) {
    map = cycle([...map], rows[0].length, rows.length);
    const mapCode = map.toString();
    const visitedMap = visitedMaps.find(map => map.code === mapCode);

    if (visitedMap) {
      const cycleLength = i - visitedMap.index;

      const goto = Math.floor(size / cycleLength) * cycleLength;
      const remainder = size - goto;

      const cycleMaps = visitedMaps.slice(visitedMap.index);
      const innerThrough = goto - (i + 1);

      map = cycleMaps[(innerThrough) % cycleLength].map;

      for (let k = 0; k < remainder; k++) {
        map = cycle([...map], rows[0].length, rows.length);
      }

      break;
    }

    visitedMaps.push({
      index: i,
      map,
      code: mapCode,
    });
  }

  return weightMap(map) === 104409;
};
