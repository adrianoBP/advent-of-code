function hash(string) {
  return [...string].reduce((acc, curr) => ((acc + curr.charCodeAt(0)) * 17) % 256, 0);
}

export const partOne = (_, raw) => {
  return raw.split(',').map(hash).reduce((acc, curr) => acc + curr, 0);
};

export const partTwo = (_, raw) => {
  const boxes = Array.from({ length: 256 }, () => []);

  for (const instruction of raw.split(',')) {
    const [label, focalLength] = instruction.split(/=|-/);
    const labelHash = hash(label);

    if (!focalLength) {
      boxes[labelHash] = boxes[labelHash].filter(element => element.label !== label);
      continue;
    }

    const lensIndex = boxes[labelHash].findIndex(element => element.label === label);
    if (lensIndex >= 0) {
      boxes[labelHash][lensIndex].focalLength = Number(focalLength);
    } else {
      boxes[labelHash].push({ label, focalLength });
    }
  }

  return boxes.reduce((total, box, boxIndex) => {
    return total + box.reduce((boxTotal, lens, lensIndex) => {
      return boxTotal + ((boxIndex + 1) * ((lensIndex + 1) * lens.focalLength));
    }, 0);
  }, 0);
};
