function push(rows, reverseX, reverseY, verticalCheck) {
  // Possible improvement: instead of looping through all elements, get all the spaces between #'s and push to the desired side.
  const newMapDetails = [];

  const startX = reverseX ? rows[0].length - 1 : 0;
  const endX = reverseX ? 0 : rows[0].length;
  const startY = reverseY ? rows.length - 1 : 0;
  const endY = reverseY ? 0 : rows.length;

  const startingPos = reverseX || reverseY ? Math.max(startX, startY) : 0;
  const delta = reverseX || reverseY ? -1 : 1;
  const diff = (a, b) => reverseX || reverseY ? a - b : b - a;

  function loopComparer(isReversed, a, b) {
    return isReversed ? b <= a : a < b;
  }

  const term = verticalCheck ? 'y' : 'x';

  for (let y = startY; loopComparer(reverseY, y, endY); y += (reverseY ? -1 : 1)) {
    for (let x = startX; loopComparer(reverseX, x, endX); x += (reverseX ? -1 : 1)) {
      const current = rows[y][x];
      newMapDetails[y] = newMapDetails[y] || [];

      if (current === '#') {
        newMapDetails[y].push({ pos: { x, y }, type: '#' });
        continue;
      }

      if (current === 'O') {
        const elementsInFront = verticalCheck ? newMapDetails.map(row => row.find(z => z.pos.x === x)).filter(x => x) : newMapDetails[y];
        elementsInFront.sort((a, b) => diff(a.pos?.[term], b.pos?.[term]));
        const closestBlock = elementsInFront.at(0);

        if (elementsInFront.length === 0) { // Free path to the border
          newMapDetails[verticalCheck ? startingPos : y].push({
            pos: {
              x: verticalCheck ? x : startX,
              y: !verticalCheck ? y : startingPos,
            },
            type: 'O',
          });
        } else {
          const key = verticalCheck ? closestBlock.pos.y + delta : y;
          newMapDetails[key].push({
            pos: {
              x: verticalCheck ? x : closestBlock.pos.x + delta,
              y: !verticalCheck ? y : closestBlock.pos.y + delta,
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
  const map = writeMap(push([...rows], false, false, true), rows[0].length, rows.length);
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
  const north = writeMap(push(rows, false, false, true), width, height);
  const west = writeMap(push(north, false, false, false), width, height);
  const south = writeMap(push(west, false, true, true), width, height);
  const east = writeMap(push(south, true, false, false), width, height);
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
