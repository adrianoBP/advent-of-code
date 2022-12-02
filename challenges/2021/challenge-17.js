export const partTwo = (_, raw) => {
  const { areaX1, areaX2, areaY1, areaY2 } = getParameters(raw);

  let startingAccX = 1000;
  let startingAccY = 1000;

  let maxHeight = 0;
  let successfulLaunches = 0;

  while (true) {
    const { result, highest } = testProbe(0, 0, startingAccX, startingAccY, areaX1, areaX2, areaY1, areaY2);

    if (result) {
      maxHeight = highest > maxHeight ? highest : maxHeight;
      successfulLaunches++;
    }

    if (startingAccY === -1000) {
      startingAccX -= 1;
      startingAccY = 1000;
    } else startingAccY -= 1;

    if (startingAccX === 0 && startingAccY === -1000) {
      break;
    }
  }

  return successfulLaunches;
};

const getParameters = (input) => {
  const parameters = input.split(' ').slice(2);

  const [areaX1, areaX2] = parameters[0].replace('x=', '').replace(',', '').split('..').map(Number);
  const [areaY1, areaY2] = parameters[1].replace('y=', '').split('..').map(Number);

  return { areaX1, areaX2, areaY1, areaY2 };
};

const testProbe = (x, y, accX, accY, areaX1, areaX2, areaY1, areaY2) => {
  let highest = 0;

  while (true) {
    if (y > highest) highest = y;

    x += accX;
    y += accY;

    if (isOver(x, y, areaX1, areaX2, areaY1, areaY2)) {
      return { result: false, highest };
    }

    if (probeInArea(x, y, areaX1, areaX2, areaY1, areaY2)) {
      return { result: true, highest };
    }

    accX = accX > 0 ? accX - 1 : accX;
    accY -= 1;
  }
};

const probeInArea = (x, y, areaX1, areaX2, areaY1, areaY2) => {
  return x >= areaX1 && x <= areaX2 && y >= areaY1 && y <= areaY2;
};

const isOver = (x, y, areaX1, areaX2, areaY1, areaY2) => {
  return x > areaX2 || (areaY1 > 0 ? y > areaY2 : y < areaY1);
};
