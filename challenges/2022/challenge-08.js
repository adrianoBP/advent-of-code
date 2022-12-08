export const partOne = (rows) => {
  const trees = rows
    .map(x => [...x].map(x => parseInt(x)));

  let counter = 0;
  for (let row = 0; row < rows.length; row++) {
    for (let column = 0; column < rows[0].length; column++) {
      counter += isDirectionVisible(trees[row][column], trees, row, column) ? 1 : 0;
    }
  }

  return counter;
};

const getDirections = (trees, row, column) => {
  const top = trees
    .map(x => parseInt(x[column])).slice(0, row).reverse();

  const right = trees[row]
    .map(x => parseInt(x)).slice(column + 1);

  const bottom = trees
    .map(x => parseInt(x[column])).slice(row + 1);

  const left = trees[row]
    .map(x => parseInt(x)).slice(0, column).reverse();

  return [top, right, bottom, left];
};

const isDirectionVisible = (current, trees, row, column) => {
  if (row === 0 || row === trees.length - 1 || column === 0 || column === trees[0].length - 1) return true;
  const directions = getDirections(trees, row, column);
  return directions.some(direction => direction.every(x => x < current));
};

const calcViewDistance = (treesInFront, treeHeight) => {
  let distance = 0;
  do {
    distance++;
  } while (treeHeight > treesInFront[distance - 1] && distance < treesInFront.length);
  return distance;
};

const isDirectionVisibleV2 = (current, trees, row, column) => {
  if (row === 0 || row === trees.length - 1 || column === 0 || column === trees[0].length - 1) return 1;
  const [top, right, bottom, left] = getDirections(trees, row, column);
  return calcViewDistance(top, current) *
    calcViewDistance(right, current) *
    calcViewDistance(bottom, current) *
    calcViewDistance(left, current);
};

export const partTwo = (rows) => {
  const trees = rows
    .map(x => [...x].map(x => parseInt(x)));

  let high = 0;

  for (let row = 1; row < rows.length - 1; row++) {
    for (let column = 1; column < rows[0].length - 1; column++) {
      if (row === 0 || row === rows.length - 1 || column === 0 || column === rows[0].length - 1) { continue; } else {
        const visibility = isDirectionVisibleV2(trees[row][column], trees, row, column);
        if (high < visibility) high = visibility;
      }
    }
  }

  return high;
};
