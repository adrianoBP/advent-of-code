export const partOne = (rows) => {
  const trees = rows
    .map(x => [...x]);

  let counter = 0;

  for (let row = 0; row < rows.length; row++) {
    for (let column = 0; column < rows[0].length; column++) {
      const current = parseInt(trees[row][column]);

      if (row === 0 || row === rows.length - 1 || column === 0 || column === rows[0].length - 1) { counter++; } else {
        if (isDirectionVisible(current, trees, row, column)) {
          counter++;
        }
      }
    }
  }

  return counter;
};

const isDirectionVisible = (current, trees, row, column) => {
  const fromTop = trees
    .map(x => parseInt(x[column])).slice(0, row).every(x => x < current);

  const fromRight = trees[row]
    .map(x => parseInt(x)).slice(column + 1).every(x => x < current);

  const fromBottom = trees
    .map(x => parseInt(x[column])).slice(row + 1).every(x => x < current);

  const fromLeft = trees[row]
    .map(x => parseInt(x)).slice(0, column).every(x => x < current);

  return fromTop || fromRight || fromBottom || fromLeft;
};

const isDirectionVisibleV2 = (current, trees, row, column) => {
  const fromTop = trees
    .map(x => parseInt(x[column])).slice(0, row).reverse();
  let top = 0;
  for (let i = 0; i < fromTop.length; i++) {
    if (fromTop[i] < current) top++;
    else if (fromTop[i] === current) { top++; break; } else break;
  }
  top = top === 0 ? 1 : top;


  const fromRight = trees[row]
    .map(x => parseInt(x)).slice(column + 1);
  let right = 0;
  for (let i = 0; i < fromRight.length; i++) {
    if (fromRight[i] < current) right++;
    else if (fromRight[i] === current) { right++; break; } else break;
  }
  right = right === 0 ? 1 : right;


  const fromBottom = trees
    .map(x => parseInt(x[column])).slice(row + 1);
  let bottom = 0;
  for (let i = 0; i < fromBottom.length; i++) {
    if (fromBottom[i] < current) bottom++;
    else if (fromBottom[i] === current) { bottom++; break; } else break;
  }
  bottom = bottom === 0 ? 1 : bottom;


  const fromLeft = trees[row]
    .map(x => parseInt(x)).slice(0, column).reverse();
  let left = 0;
  for (let i = 0; i < fromLeft.length; i++) {
    if (fromLeft[i] < current) left++;
    else if (fromLeft[i] === current) { left++; break; } else break;
  }
  left = left === 0 ? 1 : left;

  return top * right * bottom * left;
};

export const partTwo = (rows) => {
  const trees = rows
    .map(x => [...x]);

  let high = 0;

  for (let row = 0; row < rows.length; row++) {
    for (let column = 0; column < rows[0].length; column++) {
      const current = parseInt(trees[row][column]);


      if (row === 0 || row === rows.length - 1 || column === 0 || column === rows[0].length - 1) { continue; } else {
        const visibility = isDirectionVisibleV2(current, trees, row, column);
        if (high < visibility) high = visibility;
      }
    }
  }

  return high;
};
