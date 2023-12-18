function findVertices(instructions) {
  let x = 0;
  let y = 0;
  let perimeter = 0;
  const vertices = [];
  for (const { direction, amount } of instructions) {
    switch (direction) {
      case 'R': x += amount; break;
      case 'L': x -= amount; break;
      case 'D': y += amount; break;
      case 'U': y -= amount; break;
    }
    vertices.push({ x, y });
    perimeter += amount;
  }

  return { vertices, perimeter };
}

function calculateArea(vertices) {
  const area = vertices.reduce((acc, current, index) => {
    const nextIndex = (index + 1) % vertices.length;
    const next = vertices[nextIndex];
    return acc + (current.x * next.y) - (next.x * current.y);
  }, 0) * 0.5;
  return Math.abs(area);
}

function calculateInnerVertices(area, pathLength) {
  return area - (pathLength / 2) + 1;
}

function findTotalArea(vertices, perimeter) {
  const area = calculateArea(vertices);
  const innerVertices = calculateInnerVertices(area, perimeter);
  return perimeter + innerVertices;
}

export const partOne = (rows) => {
  const instructions = rows.map(row => {
    const [direction, amount, colour] = row.split(' ');
    return {
      direction,
      amount: Number(amount),
      colour,
    };
  });

  const { vertices, perimeter } = findVertices(instructions);
  return findTotalArea(vertices, perimeter);
};

export const partTwo = (rows) => {
  const instructions = rows.map(row => {
    const start = row.indexOf('#') + 1;
    const instruction = row.slice(start, start + 6);
    return {
      direction: ['R', 'D', 'L', 'U'][Number(instruction.at(-1))],
      amount: parseInt(instruction.slice(0, 5), 16),
    };
  });

  const { vertices, perimeter } = findVertices(instructions);
  return findTotalArea(vertices, perimeter);
};
