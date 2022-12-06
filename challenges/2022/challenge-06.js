export const partOne = (_, raw) => {
  return findStart(4, raw);
};

export const partTwo = (_, raw) => {
  return findStart(14, raw);
};

const findStart = (bufferLength, raw) => {
  for (let i = 0; i <= raw.length - bufferLength; i++) {
    const chunk = [...raw.slice(i, i + bufferLength)];
    if ((new Set(chunk)).size !== chunk.length) continue;
    return i + bufferLength;
  }
};
