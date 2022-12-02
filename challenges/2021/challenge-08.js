export const partTwo = (rows) => {
  let sum = 0;
  for (const row of rows) {
    const segments = row.split('|')[0].split(' ').filter(segment => segment !== '').map(segment => segment.trim());
    const outputSegments = row.split('|')[1].split(' ').filter(segment => segment !== '').map(segment => segment.trim());

    const segmentDefinitions = mapSegments(segments);
    let newNumber = '';
    for (const outputSegment of outputSegments) {
      newNumber += convertSegmentsToNumber(outputSegment, segmentDefinitions);
    }
    sum += parseInt(newNumber);
  }
  return (sum);
};

const mapSegments = (segments) => {
  const confirmedNumbers = new Array(10).fill([]);

  const lengthFiveSegments = [];
  const lengthSixSegments = [];

  for (const segment of segments) {
    switch (segment.length) {
      case 2: confirmedNumbers[1] = segment.split(''); break;
      case 3: confirmedNumbers[7] = segment.split(''); break;
      case 4: confirmedNumbers[4] = segment.split(''); break;
      case 7: confirmedNumbers[8] = segment.split(''); break;

      case 5: lengthFiveSegments.push(segment); break;
      case 6: lengthSixSegments.push(segment); break;
    }
  }

  const segmentDefinitions = {
    a: undefined,
    b: undefined,
    c: undefined,
    d: undefined,
    e: undefined,
    f: undefined,
    g: undefined,
  };

  // Identify segment A: difference from 7 and 1
  segmentDefinitions.a = confirmedNumbers[7].filter(e => !confirmedNumbers[1].includes(e))[0];

  // Identify number 6: element with 6 segments that shares only 1 with 1
  confirmedNumbers[6] = lengthSixSegments.filter(elements => elements.split('').filter(e => confirmedNumbers[1].includes(e)).length === 1)[0].split('');

  // Identify segment F: in common between 1 and 6
  segmentDefinitions.f = confirmedNumbers[1].filter(e => confirmedNumbers[6].includes(e))[0];

  // Identify segment C: from 1, not F
  segmentDefinitions.c = confirmedNumbers[1].filter(e => e !== segmentDefinitions.f)[0];

  // Identify number 3: from length 5 segments that includes C and F
  confirmedNumbers[3] = lengthFiveSegments.filter(elements => elements.split('').includes(segmentDefinitions.c) && elements.split('').includes(segmentDefinitions.f))[0].split('');

  // Identify segment B: from 4 not in 3
  segmentDefinitions.b = confirmedNumbers[4].filter(e => !confirmedNumbers[3].includes(e))[0];

  // Identify segment D: in common between 3, 4 and 6 but not in 1
  segmentDefinitions.d = confirmedNumbers[3].filter(e => confirmedNumbers[4].includes(e) && confirmedNumbers[6].includes(e) && !confirmedNumbers[1].includes(e))[0];

  // Identify segment G: from 3, not A, C, D, F
  segmentDefinitions.g = confirmedNumbers[3].filter(e => ![segmentDefinitions.a, segmentDefinitions.c, segmentDefinitions.d, segmentDefinitions.f].includes(e))[0];

  // Identify segment E: from 6, not A, B, C, D, F and G
  segmentDefinitions.e = confirmedNumbers[6].filter(e => ![segmentDefinitions.a, segmentDefinitions.b, segmentDefinitions.c, segmentDefinitions.d, segmentDefinitions.f, segmentDefinitions.g].includes(e))[0];

  return segmentDefinitions;
};

const convertSegmentsToNumber = (segments, segmentDefinitions) => {
  switch (segments.length) {
    case 2: return 1;
    case 3: return 7;
    case 4: return 4;
    case 7: return 8;

    case 5: {
      if (segments.includes(segmentDefinitions.b)) return 5;
      if (segments.includes(segmentDefinitions.e)) return 2;
      return 3;
    }
    case 6: {
      if (!segments.includes(segmentDefinitions.d)) return 0;
      if (segments.includes(segmentDefinitions.c)) return 9;
      return 6;
    }
  }
};
