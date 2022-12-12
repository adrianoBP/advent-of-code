
const createInd = (x, y) => {
  return `${x},${y}`;
};

const getCoords = (ident) => {
  const [x, y] = ident.split(',').map(Number);
  return { x, y };
};

const isSameOrOneUp = (currentIden, newIden, table) => {
  return table[currentIden].code === table[newIden].code ||
    table[newIden].code === table[currentIden].code + 1 ||
    (!table[newIden].isEnd && table[newIden].code < table[currentIden].code) ||
    // table[newIden].code === table[currentIden].code - 1 ||
    (table[currentIden].char === 'z' && table[newIden].char === 'E');
};

const findNeighbors = (ident, maxX, maxY, table) => {
  const neighbors = [];
  const { x, y } = getCoords(ident);

  if (x - 1 > 0) {
    const newIdent = createInd(x - 1, y);
    if (isSameOrOneUp(ident, newIdent, table)) { neighbors.push(newIdent); }
  }
  if (x + 1 < maxX) {
    const newIdent = createInd(x + 1, y);
    if (isSameOrOneUp(ident, newIdent, table)) { neighbors.push(newIdent); }
  }
  if (y - 1 >= 0) {
    const newIdent = createInd(x, y - 1);
    if (isSameOrOneUp(ident, newIdent, table)) { neighbors.push(newIdent); }
  }
  if (y + 1 < maxY) {
    const newIdent = createInd(x, y + 1);
    if (isSameOrOneUp(ident, newIdent, table)) { neighbors.push(newIdent); }
  }

  return neighbors;
};

const vis = (visited, table) => {
  let res = '';
  for (let i = 0; i < 41; i++) {
    for (let j = 0; j < 61; j++) {
      if (visited.includes(createInd(j, i))) {
        res += table[createInd(j, i)].char;
      } else {
        res += '.';
      }
    }
    res += '\n';
  }

  console.log(res);
};

const fillTable = (start, table, maxX, maxY, visited) => {
  // vis(visited, table);
  const neighbors = findNeighbors(start, maxX, maxY, table);

  if (neighbors.length >= 0) {
    for (const neighbor of neighbors) {
      const newDist = table[neighbor].distanceStart === 9999999999999
        ? table[start].distanceStart + 1
        : table[neighbor].distanceStart + 1;

      if (table[neighbor].distanceStart > newDist) {
        table[neighbor].distanceStart = newDist;
        table[neighbor].previous = start;
      }
    }
  }

  visited.push(start);

  const res = Object.keys(table)
    .filter(k => !visited.includes(k))
    .map(k => { return { ident: createInd(table[k].x, table[k].y), weight: table[k].distanceStart }; })
    .sort((a, b) => a.weight - b.weight);

  if (res.length === 0 || res[0] === Infinity) {
    return;
  }

  fillTable(res[0].ident, table, maxX, maxY, visited);
};

// export const partOne = (rows) => {
//   const table = {};

//   let startIdent = null;

//   for (let y = 0; y < rows.length; y++) {
//     for (let x = 0; x < rows[y].length; x++) {
//       table[createInd(x, y)] = {
//         x,
//         y,
//         char: rows[y][x],
//         code: function () { return this.isStart() ? 'a'.charCodeAt(0) : this.char.charCodeAt(0); },
//         isStart: function () { return this.char === 'S'; },
//         isEnd: function () { return this.char === 'E'; },
//         distanceStart: Infinity,
//         previous: '',
//       };

//       if (table[createInd(x, y)].isStart()) startIdent = createInd(x, y);
//     }
//   }

//   table[startIdent].distanceStart = 0;

//   fillTable(startIdent, table, rows[0].length, rows.length, []);

//   return Object.keys(table)
//     .filter(k => table[k].isEnd()).map(x => table[x].distanceStart)[0];
// };


export const partTwo = (rows) => {
  let startIdent = null;
  const table = {};

  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      table[createInd(x, y)] = {
        x,
        y,
        char: rows[y][x],
        code: function () { return this.isStart() ? 'a'.charCodeAt(0) : this.char.charCodeAt(0); },
        isStart: function () { return this.char === 'S' || this.char === 'a'; },
        isEnd: function () { return this.char === 'E'; },
        distanceStart: 9999999999999,
        previous: '',
      };

      table[createInd(x, y)].code = table[createInd(x, y)].code();
      table[createInd(x, y)].isStart = table[createInd(x, y)].isStart();
      table[createInd(x, y)].isEnd = table[createInd(x, y)].isEnd();

      if (table[createInd(x, y)].isStart) startIdent = createInd(x, y);
    }
  }

  // table[startIdent].distanceStart = 0;

  const distances = [];
  for (const a of Object.keys(table)
    .sort()
    .filter(k => table[k].char === 'a')) {
    console.log(a);

    const t = JSON.parse(JSON.stringify(table));
    t[a].distanceStart = 0;
    fillTable(a, t, rows[0].length, rows.length, []);

    distances.push(Object.keys(t)
      .filter(k => t[k].isEnd).map(x => t[x].distanceStart)[0]);
  }

  return Math.min.apply(Math, distances);
  // fillTable(startIdent, table, rows[0].length, rows.length, []);

  // return Object.keys(table)
  //   .filter(k => table[k].isEnd).map(x => table[x].distanceStart)[0];
};
