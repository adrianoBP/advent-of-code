class Point3D {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

function inBetween(x, a, b) {
  return x >= Math.min(a, b) && x <= Math.max(a, b);
}

class Cube {
  constructor(a, b) {
    if (a.z < b.z) { // A underneath B
      if (a.x < b.x) { // A to the left of B
        if (a.y < b.y) { // A below B
          this.pb1 = a;
          this.pb2 = new Point3D(b.x, a.y, a.z);
          this.pb3 = new Point3D(b.x, b.y, a.z);
          this.pb4 = new Point3D(a.x, b.y, a.z);
          this.pc1 = new Point3D(a.x, a.y, b.z);
          this.pc2 = new Point3D(b.x, a.y, b.z);
          this.pc3 = b;
          this.pc4 = new Point3D(a.x, b.y, b.z);
        } else { // A above B
          this.pb1 = new Point3D(a.x, b.y, a.z);
          this.pb2 = new Point3D(b.x, b.y, a.z);
          this.pb3 = new Point3D(b.x, a.y, a.z);
          this.pb4 = a;
          this.pc1 = new Point3D(a.x, b.y, b.z);
          this.pc2 = b;
          this.pc3 = new Point3D(b.x, a.y, b.z);
          this.pc4 = new Point3D(a.x, a.y, b.z);
        }
      } else { // B to the left of A
        if (b.y < a.y) { // B below A
          this.pb1 = new Point3D(b.x, b.y, a.z);
          this.pb2 = new Point3D(a.x, b.y, a.z);
          this.pb3 = a;
          this.pb4 = new Point3D(b.x, a.y, a.z);
          this.pc1 = b;
          this.pc2 = new Point3D(a.x, b.y, b.z);
          this.pc3 = new Point3D(a.x, a.y, b.z);
          this.pc4 = new Point3D(b.x, a.y, b.z);
        } else { // B above A
          this.pb1 = new Point3D(b.x, a.y, a.z);
          this.pb2 = a;
          this.pb3 = new Point3D(a.x, b.y, a.z);
          this.pb4 = new Point3D(b.x, b.y, a.z);
          this.pc1 = new Point3D(b.x, a.y, b.z);
          this.pc2 = new Point3D(a.x, a.y, b.z);
          this.pc3 = new Point3D(a.x, b.y, b.z);
          this.pc4 = b;
        }
      }
    } else { // B underneath A
      if (a.x < b.x) { // A to the left of B
        if (a.y < b.y) { // A below B
          this.pb1 = new Point3D(a.x, a.y, b.z);
          this.pb2 = new Point3D(b.x, a.y, b.z);
          this.pb3 = b;
          this.pb4 = new Point3D(a.x, b.y, b.z);
          this.pc1 = a;
          this.pc2 = new Point3D(b.x, a.y, a.z);
          this.pc3 = new Point3D(b.x, b.y, a.z);
          this.pc4 = new Point3D(a.x, b.y, a.z);
        } else { // A above B
          this.pb1 = new Point3D(a.x, b.y, b.z);
          this.pb2 = b;
          this.pb3 = new Point3D(b.x, a.y, b.z);
          this.pb4 = new Point3D(a.x, a.y, b.z);
          this.pc1 = new Point3D(a.x, b.y, a.z);
          this.pc2 = new Point3D(b.x, b.y, a.z);
          this.pc3 = new Point3D(b.x, a.y, a.z);
          this.pc4 = a;
        }
      } else { // B to the left of A
        if (b.y < a.y) { // B below A
          this.pb1 = b;
          this.pb2 = new Point3D(a.x, b.y, b.z);
          this.pb3 = new Point3D(a.x, a.y, b.z);
          this.pb4 = new Point3D(b.x, a.y, b.z);
          this.pc1 = new Point3D(b.x, b.y, a.z);
          this.pc2 = new Point3D(a.x, b.y, a.z);
          this.pc3 = a;
          this.pc4 = new Point3D(b.x, a.y, a.z);
        } else { // B above A
          this.pb1 = new Point3D(b.x, a.y, b.z);
          this.pb2 = new Point3D(a.x, a.y, b.z);
          this.pb3 = new Point3D(a.x, b.y, b.z);
          this.pb4 = b;
          this.pc1 = new Point3D(b.x, a.y, a.z);
          this.pc2 = a;
          this.pc3 = new Point3D(a.x, b.y, a.z);
          this.pc4 = new Point3D(b.x, b.y, a.z);
        }
      }
    }
  }

  pushDown(quantity) {
    this.pb1.z -= quantity;
    this.pb2.z -= quantity;
    this.pb3.z -= quantity;
    this.pb4.z -= quantity;

    this.pc1.z -= quantity;
    this.pc2.z -= quantity;
    this.pc3.z -= quantity;
    this.pc4.z -= quantity;
  }

  get base() {
    return this.pb1.z;
  }

  get ceiling() {
    return this.pc1.z;
  }

  isCubeOnTop(cube) {
    if (cube.base > this.ceiling + 1) return false; // Air gap in between
    if (cube.base <= this.ceiling) return false; // Cube is base is below my ceiling. Either they are colliding or its area does not intersect my area

    if (
      (inBetween(cube.start.x, this.start.x, this.start.x) && inBetween(cube.start.y, this.start.y, this.start.y)) ||
      (inBetween(cube.end.x, this.start.x, this.end.x) && inBetween(cube.end.y, this.start.y, this.end.y))
    ) { return true; }

    if (
      (inBetween(cube.end.x, this.start.x, this.end.x) && inBetween(cube.start.y, this.start.y, this.end.y)) ||
      (inBetween(cube.start.x, this.start.x, this.end.x) && inBetween(cube.end.y, this.end.y, this.end.y))
    ) { return true; }
  }
}

function cubesIntersectHorizontally(a, b) {
  return (
    a.pb4.x <= b.pb2.x &&
    a.pb2.x >= b.pb4.x &&
    a.pb4.y >= b.pb2.y &&
    a.pb2.y <= b.pb4.y
  );
}

function printCubes(cubes) {
  const rs = [];
  const rW = 3;
  const cS = 10;
  const zs = Array(cS).fill('fill with anything').map((v, i) => i);
  for (let z = 0; z < cS; z++) {
    const row = '...   ...'.split('');
    for (let n = 0; n < rW; n++) {
      const valid = cubes.reduce((acc, c, index) => {
        const isWithinZ = c.pb1.z <= z && z <= c.pc1.z;

        const isWithinX = c.pb1.x <= n % 3 && n % 3 <= c.pc2.x;
        if (isWithinZ && isWithinX) acc.push(index);

        return acc;
      }, []);

      row[n] = valid.length === 0 ? '.' : valid.length === 1 ? zs[valid[0]] : '?';
    }
    for (let n = 0; n < rW; n++) {
      const valid = cubes.reduce((acc, c, index) => {
        const isWithinZ = c.pb1.z <= z && z <= c.pc1.z;

        const isWithinY = c.pb2.y <= n % rW && n % rW <= c.pc3.y;
        if (isWithinZ && isWithinY) acc.push(index);

        return acc;
      }, []);

      row[n + 6] = valid.length === 0 ? '.' : valid.length === 1 ? zs[valid[0]] : '?';
    }
    rs.unshift(row.join(''));
  }
  rs.unshift(...[' X     Y', '']);
  const text = rs.map((r, i) => (cS - i + 1).toString().padEnd(3) + r).join('\n\r');
  console.log(text);
}

export const partOne = (rows) => {
  const cubes = rows.map(row => {
    const coords = row.split(/~|,/).map(Number);
    return new Cube(
      new Point3D(coords[0], coords[1], coords[2]),
      new Point3D(coords[3], coords[4], coords[5]),
    );
  }).sort((a, b) => a.base - b.base);

  // printCubes(cubes);

  for (let i = 0; i < cubes.length; i++) { // From lower to higher
    const cube = cubes[i];

    // Find horizontally intersecting cubes
    const intersectingCubs = cubes.reduce((acc, c, index) => {
      if (index === i) return acc;
      if (cubesIntersectHorizontally(cube, c) && c.ceiling < cube.base) acc.push(index);
      return acc;
    }, []);

    if (intersectingCubs.length > 0) {
      const highestCubeCeiling = Math.max(...intersectingCubs.map(cubeIndex => cubes[cubeIndex].ceiling));
      cube.pushDown(cube.base - highestCubeCeiling - 1);
    }
  }

  // printCubes(cubes);

  const total = [];
  for (let i = 0; i < cubes.length; i++) {
    const cube = cubes[i];

    // # cubes sustaining this cube
    const sustaining = cubes.reduce((acc, c, index) => {
      if (index === i) return acc;
      if (cubesIntersectHorizontally(cube, c) && c.ceiling + 1 === cube.base) acc.push(index);
      return acc;
    }, []);

    const sustainedBy = cubes.reduce((acc, c, index) => {
      if (index === i) return acc;
      if (cubesIntersectHorizontally(cube, c) && c.base === cube.ceiling + 1) acc.push(index);
      return acc;
    }, []);

    if (sustaining.length > 1) { total.push(...sustaining); }
    if (sustainedBy.length === 0) total.push(i);
  }

  return [...new Set(total)].length;
};

export const partTwo = (rows, raw) => {
  return 'Hash for challenge two';
};
