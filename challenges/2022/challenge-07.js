export const partOne = (rows) => {
  const indexTable = buildIndex(rows);

  let smallDirectoriesTotal = 0;

  Object.keys(indexTable).forEach(folderPath => {
    const folderSize = calculateSize(folderPath, indexTable);
    if (folderSize <= 100000) { smallDirectoriesTotal += folderSize; }
  });

  return smallDirectoriesTotal;
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
  const index = {};

  for (const row of rows) {
    if (row.startsWith('$')) {
      const [command, where] = row.split(' ').slice(1);
      if (command.startsWith('cd')) {
        if (where === '..') { currentPath.pop(); } else {
          currentPath.push(where);
        }
        continue;
      }
    } else {
      const path = currentPath.join('/');
      if (!(path in index)) {
        index[path] = [];
      }
      index[path].push(row);
    }
  }

  return index;
};

const calculateSize = (path, indexTable) => {
  let totalSize = 0;
  for (const elem of indexTable[path]) {
    if (elem.includes('dir')) {
      const newPath = `${path}/${elem.slice(4)}`;
      totalSize += calculateSize(newPath, indexTable);
    } else {
      totalSize += parseInt(elem.split(' ')[0]);
    }
  }
  return totalSize;
};
