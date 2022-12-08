export const partOne = (rows) => {
  const trees = rows.map(row => [...row].map(Number));

  let visibleTreesCount = 0;
  for (let row = 0; row < rows.length; row++) {
    for (let column = 0; column < rows[0].length; column++) {
      visibleTreesCount += isVisible(trees, row, column) ? 1 : 0;
    }
  }
  return visibleTreesCount;
};

export const partTwo = (rows) => {
  const trees = rows.map(row => [...row].map(Number));

  let bestTreeView = 0;
  for (let row = 1; row < rows.length - 1; row++) {
    for (let column = 1; column < rows[0].length - 1; column++) {
      const treeView = getViewScore(trees, row, column);
      if (treeView > bestTreeView) bestTreeView = treeView;
    }
  }

  return bestTreeView;
};

const getViews = (trees, row, column) => {
  const top = trees.map(line => line[column]).slice(0, row).reverse();
  const right = trees[row].map(line => line).slice(column + 1);
  const bottom = trees.map(line => line[column]).slice(row + 1);
  const left = trees[row].map(line => line).slice(0, column).reverse();
  return [top, right, bottom, left];
};

const isVisible = (trees, row, column) => {
  if (row === 0 || row === trees.length - 1 || column === 0 || column === trees[0].length - 1) return true; // edge
  const views = getViews(trees, row, column);
  return views.some(direction => direction.every(x => x < trees[row][column]));
};

const viewDistance = (treesInFront, treeHeight) => {
  let distance = 0;
  do { distance++; } while (treeHeight > treesInFront[distance - 1] && distance < treesInFront.length);
  return distance;
};

const getViewScore = (trees, row, column) => {
  const [top, right, bottom, left] = getViews(trees, row, column);
  return viewDistance(top, trees[row][column]) *
    viewDistance(right, trees[row][column]) *
    viewDistance(bottom, trees[row][column]) *
    viewDistance(left, trees[row][column]);
};
