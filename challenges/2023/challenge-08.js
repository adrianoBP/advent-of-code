export const partOne = (rows) => {
  const steps = rows[0].split('');
  const nodes = rows.slice(2)
    .reduce((acc, curr) => {
      const [nodeName, mappings] = curr.replace(/\(|\)| /g, '').split('=');
      const nodes = mappings.split(',');
      acc[nodeName] = { L: nodes[0], R: nodes[1] };
      return acc;
    }, {});

  let currentNode = 'AAA';
  let moves = 0;
  while (currentNode !== 'ZZZ') {
    steps.forEach(move => { currentNode = nodes[currentNode][move]; });
    moves += steps.length;
  }
  return moves;
};

const findFactors = (number) => {
  const factorToQty = {};
  for (let i = 2; i <= number; i++) {
    if (number % i === 0) {
      number /= i;
      factorToQty[i] = factorToQty[i] ? factorToQty[i]++ : 1;
      i--; // Use the same dividend again
    }
  }
  return factorToQty;
};

export const partTwo = (rows) => {
  const steps = rows[0].split('');
  const nodes = rows.slice(2)
    .reduce((acc, curr) => {
      const [nodeName, mappings] = curr.replace(/\(|\)| /g, '').split('=');
      const nodes = mappings.split(',');
      acc[nodeName] = { L: nodes[0], R: nodes[1] };
      return acc;
    }, {});

  const highestFactors = {};
  for (let currentNode of Object.keys(nodes).filter((node) => node.endsWith('A'))) {
    let moves = 0;
    while (!currentNode.endsWith('Z')) {
      steps.forEach(move => { currentNode = nodes[currentNode][move]; });
      moves += steps.length;
    }

    // Find highest number of that factor required
    for (const [factor, factorQty] of Object.entries(findFactors(moves))) {
      highestFactors[factor] = highestFactors[factor] || 1;
      if (highestFactors[factor] > factorQty) highestFactors[factor] = factorQty;
    }
  }

  return Object.keys(highestFactors).reduce((acc, curr) => acc * (curr * highestFactors[curr]), 1);
};
