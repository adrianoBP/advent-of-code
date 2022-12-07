export const partOne = (rows) => {
  const indexTable = buildIndex(rows);

  return Object.keys(indexTable)
    .map(folderPath => calculateSize(folderPath, indexTable))
    .filter(size => size <= 100000)
    .reduce((a, b) => a + b, 0);
};

export const partTwo = (rows) => {
  const indexTable = buildIndex(rows);

  const totalUsed = calculateSize('/', indexTable);
  const toDelete = (totalUsed + 30000000) - 70000000;

  let smallestFolderToDelete = totalUsed;

  Object.keys(indexTable).forEach(folderPath => {
    const folderSize = calculateSize(folderPath, indexTable);
    if (folderSize >= toDelete && folderSize < smallestFolderToDelete) {
      smallestFolderToDelete = folderSize;
    }
  });

  return smallestFolderToDelete;
};

const buildIndex = (rows) => {
  const currentPath = [];
  const indexTable = {};

  for (const row of rows) {
    if (row.startsWith('$')) { // is a command
      const [command, where] = row.split(' ').slice(1);
      if (command !== 'cd') continue; // only check directory movements
      if (where === '..') currentPath.pop(); // go up
      else currentPath.push(where); // go down
      continue;
    }

    const path = currentPath.join('/'); // folder entry path
    if (!(path in indexTable)) indexTable[path] = [];
    indexTable[path].push(row);
  }

  return indexTable;
};

const calculateSize = (path, indexTable) => {
  return indexTable[path]
    .map(entry => entry.split(' '))
    .map(([size, name]) => size === 'dir'
      ? calculateSize(`${path}/${name}`, indexTable)
      : parseInt(size),
    )
    .reduce((a, b) => a + b, 0);
};
