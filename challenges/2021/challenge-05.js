export const partTwo = (rows) => {
  const lines = [];
  for (const line of rows.map(row => row.split(' -> '))) {
    const p1 = line[0].split(',');
    const p2 = line[1].split(',');

    const segment = {
      p1: {
        x: parseInt(p1[0]),
        y: parseInt(p1[1]),
      },
      p2: {
        x: parseInt(p2[0]),
        y: parseInt(p2[1]),
      },
    };

    lines.push(segment);
  }

  const multiPoints = [];

  const traversedLines = [];

  for (const line of lines) {
    for (const traversedLine of traversedLines) {
      if (doIntersect(line.p1, line.p2, traversedLine.p1, traversedLine.p2)) {
        const ps1 = getAllPointsBetweenTwoPoints(line.p1.x, line.p1.y, line.p2.x, line.p2.y);
        const ps2 = getAllPointsBetweenTwoPoints(traversedLine.p1.x, traversedLine.p1.y, traversedLine.p2.x, traversedLine.p2.y);

        multiPoints.push(...ps1.filter(p => ps2.includes(p)));
      }
    }

    traversedLines.push(line);
  }

  return (new Set(multiPoints).size);
};


function getAllPointsBetweenTwoPoints(x0, y0, x1, y1) {
  const points = [];

  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = (x0 < x1) ? 1 : -1;
  const sy = (y0 < y1) ? 1 : -1;
  let err = dx - dy;

  while (true) {
    points.push(`${x0},${y0}`);

    if ((x0 === x1) && (y0 === y1)) break;
    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x0 += sx; }
    if (e2 < dx) { err += dx; y0 += sy; }
  }
  return points;
}

function onSegment(p, q, r) {
  if (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
        q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y)) {
    return true;
  }

  return false;
}

function orientation(p, q, r) {
  const val = (q.y - p.y) * (r.x - q.x) -
        (q.x - p.x) * (r.y - q.y);

  if (val === 0) return 0;

  return (val > 0) ? 1 : 2;
}

function doIntersect(p1, q1, p2, q2) {
  const o1 = orientation(p1, q1, p2);
  const o2 = orientation(p1, q1, q2);
  const o3 = orientation(p2, q2, p1);
  const o4 = orientation(p2, q2, q1);

  if (o1 !== o2 && o3 !== o4) { return true; }

  if (o1 === 0 && onSegment(p1, p2, q1)) return true;
  if (o2 === 0 && onSegment(p1, q2, q1)) return true;
  if (o3 === 0 && onSegment(p2, p1, q2)) return true;
  if (o4 === 0 && onSegment(p2, q1, q2)) return true;

  return false;
}
