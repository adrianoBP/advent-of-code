export const partTwo = (rows) => {
  const connections = mapConnections(rows);

  const validPaths = [];
  getPathsPerNode(connections, 'start', [], validPaths, false);

  return (validPaths.length);
};

const mapConnections = (rows) => {
  const connections = {};
  for (const row of rows) {
    const [left, right] = row.split('-');
    if (!connections[left]) {
      connections[left] = [];
    }

    if (!connections[right]) {
      connections[right] = [];
    }

    connections[right].push(left);
    connections[left].push(right);
  }

  return connections;
};

const getPathsPerNode = (connections, node, currentPath, validPaths, smallVisitedTwice) => {
  if (node === 'end') {
    validPaths.push([...currentPath, node]);
    return currentPath;
  }

  // Do not explore small caves twice
  if (node === 'start' && currentPath.includes(node)) return currentPath;
  if (node === node.toLowerCase() && currentPath.includes(node)) {
    if (smallVisitedTwice) { return currentPath; }
    smallVisitedTwice = true;
  }

  currentPath.push(node);

  const paths = [];
  for (const connection of connections[node]) {
    const connectionPath = getPathsPerNode(connections, connection, [...currentPath], validPaths, smallVisitedTwice);
    if (connectionPath) {
      paths.push(connectionPath);
    }
  }

  return paths;
};
