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

  return Object.keys(indexTable)
    .map(folderPath => calculateSize(folderPath, indexTable))
    .filter(size => size >= toDelete)
    .sort()[0];
};

const buildIndex = (rows) => {
  const currentPath = [];
  const indexTable = {};

  for (const row of rows) {
    if (row.startsWith('$')) { // is a command
      if (!row.includes('cd')) continue;
      const where = row.split(' ')[2];
      if (where === '..') currentPath.pop(); // go up
      else currentPath.push(where); // go down
      continue;
    }

    const folderPath = currentPath.join('/'); // folder entry path
    if (!(folderPath in indexTable)) indexTable[folderPath] = [];
    indexTable[folderPath].push(row);
  }

  return indexTable;
};

const calculateSize = (path, indexTable) => {
  return indexTable[path]
    .map(entry => {
      const [size, name] = entry.split(' ');
      return size === 'dir'
        ? calculateSize(`${path}/${name}`, indexTable)
        : parseInt(size);
    })
    .reduce((a, b) => a + b, 0);
};
