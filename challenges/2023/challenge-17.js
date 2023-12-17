function getSegments(rows) {
  const nodes = {};
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[0].length; x++) {
      const nextPaths = [];

      if (x - 1 >= 0) {
        nextPaths.push({ y, x: x - 1, weight: Number(rows[y][x - 1]), ident: `${x - 1},${y}` });
      }
      if (y - 1 >= 0) {
        nextPaths.push({ y: y - 1, x, weight: Number(rows[y - 1][x]), ident: `${x},${y - 1}` });
      }
      if (x + 1 !== rows[0].length) {
        nextPaths.push({ y, x: x + 1, weight: Number(rows[y][x + 1]), ident: `${x + 1},${y}` });
      }
      if (y + 1 !== rows.length) {
        nextPaths.push({ y: y + 1, x, weight: Number(rows[y + 1][x]), ident: `${x},${y + 1}` });
      }

      nodes[`${x},${y}`] = nextPaths;
    }
  }
  return nodes;
}

const getPreviousNodes = (currentNode, distances, maxAllowed = Infinity) => {
  const previousNodes = [];
  while (currentNode !== '0,0' && maxAllowed-- > 0) {
    previousNodes.push(distances[currentNode].from);
    currentNode = distances[currentNode].from;
  }

  return previousNodes;
};

function draw(map, visited, current) {
  const fullMap = '';
  for (let y = 0; y < map.length; y++) {
    let row = '';
    for (let x = 0; x < map[0].length; x++) {
      const currentIdent = `${x},${y}`;
      if (visited.includes(currentIdent)) row += '#';
      else row += current === currentIdent ? 'O' : map[y][x];
    }
    // fullMap += row + '\n';
    console.log(row);
  }
  console.log('');
}


const findDistance = (a, b) => {
  // return (Math.abs(a.x - b.x) + Math.abs(a.y - b.y));
  return Math.sqrt(b.x - a.x) + Math.sqrt(b.y - a.y) / 10000;
};

const toCoordinate = (value) => {
  const [x, y] = value.split(',').map(Number);
  return { x, y };
};
const toCoordinateString = ({ x, y }) => {
  return `${x},${y}`;
};

const getSurroundings = ({ x, y }, map) => {
  const left = [];
  if (x - 1 > 0) left.push({ x: x - 1, y });
  if (x - 2 > 0) left.push({ x: x - 2, y });
  if (x - 3 > 0) left.push({ x: x - 3, y });

  const right = [];
  if (x + 1 < map[0].length) right.push({ x: x + 1, y });
  if (x + 2 < map[0].length) right.push({ x: x + 2, y });
  if (x + 3 < map[0].length) right.push({ x: x + 3, y });

  const up = [];
  if (y - 1 > 0) up.push({ x, y: y - 1 });
  if (y - 2 > 0) up.push({ x, y: y - 2 });
  if (y - 3 > 0) up.push({ x, y: y - 3 });

  const down = [];
  if (y + 1 < map.length) down.push({ x, y: y + 1 });
  if (y + 2 < map.length) down.push({ x, y: y + 2 });
  if (y + 3 < map.length) down.push({ x, y: y + 3 });

  return [left.map(toCoordinateString), right.map(toCoordinateString), up.map(toCoordinateString), down.map(toCoordinateString)];
};

const findPath = (map, nodes, segmentsDictionary, start, end) => {
  const distances = Object.assign({}, ...nodes.map(node => {
    const [x, y] = node.split(',');
    return {
      [node]: {
        weight: Number(map[y][x]),
        weightFromStart: node === start ? 0 : Infinity, // ? This can already be the weigh to the start?
        from: null,
        distanceToEnd: findDistance(toCoordinate(node), toCoordinate(end)),
        heuristicDistance: function () { return this.weightFromStart + this.distanceToEnd; },
      },
    };
  }));

  const stack = [start];
  const found = false;
  const visitedNodes = [];
  while (stack.length > 0 && !found) {
    const currentNode = stack.shift();
    const currentCoords = toCoordinate(currentNode);
    const neighborSegments = segmentsDictionary[currentNode].filter(segment => !visitedNodes.includes(segment.ident));

    // if (currentNode === '10,3') {
    //   debugger;
    // }

    const previousNodes = getPreviousNodes(currentNode, distances);
    const [left, right, up, down] = getSurroundings(currentCoords, map);

    const countLeft = right.filter(coord => previousNodes.includes(coord)).length;
    const countRight = left.filter(coord => previousNodes.includes(coord)).length;
    const countUp = down.filter(coord => previousNodes.includes(coord)).length;
    const countDown = up.filter(coord => previousNodes.includes(coord)).length;

    // const blockLeft = right.length === 3 && right.every(coord => previousNodes.includes(coord));
    // const blockRight = left.length === 3 && left.every(coord => previousNodes.includes(coord));
    // const blockUp = down.length === 3 && down.every(coord => previousNodes.includes(coord));
    // const blockDown = up.length === 3 && up.every(coord => previousNodes.includes(coord));

    const blockLeft = countLeft >= 3;
    const blockRight = countRight >= 3;
    const blockUp = countUp >= 3;
    const blockDown = countDown >= 3;

    draw(map, previousNodes, currentNode);
    for (const neighbor of neighborSegments.filter(node => {
      if (blockLeft && node.x < currentCoords.x) return false;
      if (blockRight && node.x > currentCoords.x) return false;
      if (blockUp && node.y < currentCoords.y) return false;
      if (blockDown && node.y > currentCoords.y) return false;

      return true;
    })) {
      const ident = neighbor.ident;
      if (ident === end) {
        // found = true;
      }

      if (!stack.includes(ident)) { stack.push(ident); }

      const newWeight = distances[currentNode].weightFromStart + distances[ident].weight;
      if (newWeight < distances[ident].weightFromStart) {
        distances[ident].weightFromStart = newWeight;
        distances[ident].from = currentNode;
      }
    }

    visitedNodes.push(currentNode);
    // Sort by heuristic distance
    // stack.sort((a, b) => distances[a].weight - distances[b].weight);
    stack.sort((a, b) => distances[a].heuristicDistance() - distances[b].heuristicDistance());
  }
  const fullPath = [end, ...getPreviousNodes(end, distances)];

  draw(map, fullPath);

  return fullPath;
};

export const partOne = (rows) => {
  const segments = getSegments(rows);
  const nodes = Object.keys(segments);

  const path = findPath(rows, nodes, segments, '0,0', `${rows[0].length - 1},${rows.length - 1}`);


  return path.map(toCoordinate).reduce((acc, { x, y }) => {
    return acc + Number(rows[y][x]);
  }, 0);
};

export const partTwo = (rows, raw) => {
  return 'Hash for challenge two';
};
