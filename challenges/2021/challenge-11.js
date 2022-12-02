export const partOne = (rows) => {
  const octopuses = rows.map(row => row.split('').map(Number));

  let allFlashes = 0;
  let iterations = 0;
  let globalFlashFound = false;

  while (!globalFlashFound) {
    // Step 1: increase all values by 1
    for (let y = 0; y < octopuses.length; y++) {
      for (let x = 0; x < octopuses[y].length; x++) {
        octopuses[y][x] += 1;
      }
    }

    // Step 2: Flash octopuses
    const flashed = [];
    for (let y = 0; y < octopuses.length; y++) {
      for (let x = 0; x < octopuses[y].length; x++) {
        flashOctopuses(octopuses, x, y, flashed);
      }
    }

    // Step 3: Count flashes and set to 0
    let newFlashes = 0;
    for (let y = 0; y < octopuses.length; y++) {
      for (let x = 0; x < octopuses[y].length; x++) {
        if (octopuses[y][x] > 9) {
          newFlashes++;
          octopuses[y][x] = 0;
        }
      }
    }

    if (newFlashes === octopuses.length * octopuses[0].length) { globalFlashFound = true; }

    // Part 1 solution
    if (iterations < 100) { allFlashes += newFlashes; }

    iterations++;
  }

  return allFlashes;
};

export const partTwo = (rows) => {
  const octopuses = rows.map(row => row.split('').map(Number));

  let iterations = 0;
  let globalFlashFound = false;

  while (!globalFlashFound) {
    // Step 1: increase all values by 1
    for (let y = 0; y < octopuses.length; y++) {
      for (let x = 0; x < octopuses[y].length; x++) {
        octopuses[y][x] += 1;
      }
    }

    // Step 2: Flash octopuses
    const flashed = [];
    for (let y = 0; y < octopuses.length; y++) {
      for (let x = 0; x < octopuses[y].length; x++) {
        flashOctopuses(octopuses, x, y, flashed);
      }
    }

    // Step 3: Count flashes and set to 0
    let newFlashes = 0;
    for (let y = 0; y < octopuses.length; y++) {
      for (let x = 0; x < octopuses[y].length; x++) {
        if (octopuses[y][x] > 9) {
          newFlashes++;
          octopuses[y][x] = 0;
        }
      }
    }

    if (newFlashes === octopuses.length * octopuses[0].length) { globalFlashFound = true; }

    iterations++;
  }

  return iterations;
};

const flashOctopuses = (octopuses, x, y, flashed) => {
  // If it was already flashed, don't flash it again
  if (flashed.includes(`${x},${y}`)) return;

  const octopus = {
    x: parseInt(x),
    y: parseInt(y),
  };

  if (octopuses[octopus.y][octopus.x] > 9) {
    flashed.push(`${octopus.x},${octopus.y}`);
    const newFlashed = flashSurrounding(octopuses, octopus.x, octopus.y);

    for (let i = 0; i < newFlashed.length; i++) {
      flashOctopuses(octopuses, newFlashed[i].split(',')[0], newFlashed[i].split(',')[1], flashed);
    }
  }
};

const flashSurrounding = (octopuses, x, y) => {
  const newFlashed = [];

  // top-left
  if (y - 1 >= 0 && x - 1 >= 0) {
    octopuses[y - 1][x - 1]++;
    newFlashed.push(`${x - 1},${y - 1}`);
  }

  // top
  if (y - 1 >= 0) {
    octopuses[y - 1][x]++;
    newFlashed.push(`${x},${y - 1}`);
  }

  // top-right
  if (y - 1 >= 0 && x + 1 < octopuses[y].length) {
    octopuses[y - 1][x + 1]++;
    newFlashed.push(`${x + 1},${y - 1}`);
  }

  // right
  if (x + 1 < octopuses[y].length) {
    octopuses[y][x + 1]++;
    newFlashed.push(`${x + 1},${y}`);
  }

  // bottom-right
  if (y + 1 < octopuses.length && x + 1 < octopuses[y].length) {
    octopuses[y + 1][x + 1]++;
    newFlashed.push(`${x + 1},${y + 1}`);
  }

  // bottom
  if (y + 1 < octopuses.length) {
    octopuses[y + 1][x]++;
    newFlashed.push(`${x},${y + 1}`);
  }

  // bottom-left
  if (y + 1 < octopuses.length && x - 1 >= 0) {
    octopuses[y + 1][x - 1]++;
    newFlashed.push(`${x - 1},${y + 1}`);
  }

  // left
  if (x - 1 >= 0) {
    octopuses[y][x - 1]++;
    newFlashed.push(`${x - 1},${y}`);
  }

  return newFlashed;
};
