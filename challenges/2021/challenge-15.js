export const partTwo = (rows) => {
  const map = rows.map(row => row.split('').map(cell => parseInt(cell)));

  const distances = findShortestPath(map);
  const path = getPath(distances, distances[distances.length - 1], '')
    .split('|')
    .reverse()
    .filter(node => node !== '')
    .map(node => {
      const [x, y] = node.split(',').map(Number);
      return map[x][y];
    });

  return (path.reduce((a, b) => a + b));
};

const findShortestPath = (map) => {
  let queue = [
    {
      node: '0,0',
      cost: 0,
      previous: null,
    },
  ];

  const completed = [];

  const endingPaths = [];

  while (queue.length > 0) {
    const currentNode = queue.shift();
    const [x, y] = currentNode.node.split(',').map(Number);

    if (x === map.length - 1 && y === map[0].length - 1) {
      endingPaths.push([...completed, currentNode]);
      continue;
    }

    completed.push(currentNode);

    // Check top
    if (y > 0) {
      const top = `${x},${y - 1}`;
      getNode(queue, top, map[x][y - 1], currentNode, completed);
    }

    // Check right
    if (x < map.length - 1) {
      const right = `${x + 1},${y}`;
      getNode(queue, right, map[x + 1][y], currentNode, completed);
    }

    // Check bottom
    if (y < map[x].length - 1) {
      const bottom = `${x},${y + 1}`;
      getNode(queue, bottom, map[x][y + 1], currentNode, completed);
    }

    // Check left
    if (x > 0) {
      const left = `${x - 1},${y}`;
      getNode(queue, left, map[x - 1][y], currentNode, completed);
    }

    queue = queue.sort((a, b) => a.cost - b.cost);
  }

  return endingPaths.sort((a, b) => a[a.length - 1].cost - b[b.length - 1].cost)[0];
};

const getNode = (queue, currentNode, cost, previousNode, completed) => {
  if (completed.filter(node => node.node === currentNode).length > 0) return;

  const filteredNode = queue.filter(item => item.node === currentNode);

  if (filteredNode.length > 0) {
    const newCost = filteredNode[0].cost + cost;
    if (newCost < filteredNode[0].cost) {
      filteredNode[0].cost = newCost;
      filteredNode[0].previous = previousNode.node;
    }
  } else {
    queue.push({
      node: currentNode,
      cost,
      previous: previousNode.node,
    });
  }
};

const getPath = (completed, current, path) => {
  if (current.previous == null) return path + '|' + current.node;

  return getPath(completed, completed.filter(node => node.node === current.previous)[0], path + current.node + '|');
};
