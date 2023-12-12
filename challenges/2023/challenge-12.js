/* eslint-disable no-inner-declarations */
export const partOne = (rows) => {
  return 'OK';
  const springsDetails = rows.map(row => {
    const [springs, configuration] = row.split(' ');
    return [springs, configuration.split(',').map(Number)];
  });

  let total = 0;
  for (const [springs, configuration] of springsDetails) {
    const memo = [];
    function buildMemo(text, index, nOfGroups, groups, totalSpringsRequired) {
      const c = [...text].slice(0, index + 1);
      const newText = c.join('');
      const nextIndex = index + 1;


      const springsFound = c.filter(x => x === '#').length;
      if (newText.length + (totalSpringsRequired - springsFound) - 1 > text.length) return;

      const current = text.at(index);
      if (current == null) return;

      if (current === '.' || current === '#') {
        const amount = countSections(c);

        // Check base is valid
        const lengthsSoFar = newText.split('.').filter(x => x).map(x => x.length);
        let allEq = true;
        for (let i = 0; i < lengthsSoFar.length; i++) {
          const len = lengthsSoFar[i];
          const groupLen = groups[i];

          if (current === '.' && len !== groupLen) return;
          else if (current === '#' && len > groupLen) return;

          allEq &= len === groupLen;
        }

        if (amount === groups.length && allEq && nextIndex === text.length) {
          memo[nextIndex] = memo[nextIndex] || [];
          memo[nextIndex][amount] = memo[nextIndex][amount] || 0;
          memo[nextIndex][amount]++;
        }

        buildMemo([...text], nextIndex, nOfGroups, groups, totalSpringsRequired);
      } else {
        const first = [...text];
        first.splice(index, 1, '.');
        buildMemo(first, index, nOfGroups, groups, totalSpringsRequired);

        const second = [...text];
        second.splice(index, 1, '#');
        buildMemo(second, index, nOfGroups, groups, totalSpringsRequired);
      }
    }

    const totalSpringsRequired = configuration.reduce((acc, curr) => acc + curr, 0);
    buildMemo([...springs], 0, configuration.length, configuration, totalSpringsRequired);
    const count = memo[springs.length][configuration.length];

    total += count;
  }

  return total;
};


function countSections(field) {
  return field.join('').split('.').filter(x => x).length;
}

export const partTwo = (rows, raw) => {
  const springsDetails = rows.map(row => {
    const [springs, configuration] = row.split(' ');
    return [springs, configuration.split(',').map(Number)];
  });

  // for (let i = 0; i < springsDetails.length; i++) {
  //   springsDetails[i][0] = `${springsDetails[i][0]}?${springsDetails[i][0]}?${springsDetails[i][0]}?${springsDetails[i][0]}?${springsDetails[i][0]}`;
  //   springsDetails[i][1] = [...springsDetails[i][1], ...springsDetails[i][1], ...springsDetails[i][1], ...springsDetails[i][1], ...springsDetails[i][1]];
  // }

  let total = 0;
  const totalValidationChecks = 0;

  for (let [springs, configuration] of springsDetails) {
    // 2
    // springs = `${springs}?`.repeat(2).slice(0, -1);
    // configuration = [...configuration, ...configuration];

    // 3
    springs = `${springs}?`.repeat(3).slice(0, -1);
    configuration = [...configuration, ...configuration, ...configuration];

    // 5
    // springs = `${springs}?`.repeat(5).slice(0, -1);
    // configuration = [...configuration, ...configuration, ...configuration, ...configuration, ...configuration];


    // console.log(springs);

    const memo = [];
    function buildMemo(text, index, nOfGroups, groups, totalSpringsRequired) {
      const c = [...text].slice(0, index + 1);
      const newText = c.join('');
      const nextIndex = index + 1;

      console.log(text.join('') + '\n' + newText);

      const springsFound = c.filter(x => x === '#').length;
      if (newText.length + (totalSpringsRequired - springsFound) - 1 > text.length) return;

      const current = text.at(index);
      if (current == null) return;

      if (current === '.' || current === '#') {
        // console.log(newText);
        const amount = countSections(c);

        // Check base is valid
        const lengthsSoFar = newText.split('.').filter(x => x).map(x => x.length);
        let allEq = true;
        for (let i = 0; i < lengthsSoFar.length; i++) {
          const len = lengthsSoFar[i];
          const groupLen = groups[i];

          if (current === '.' && len !== groupLen) return;
          else if (current === '#' && len > groupLen) return;

          allEq &= len === groupLen;
        }

        if (amount === groups.length && allEq && nextIndex === text.length) {
          memo[nextIndex] = memo[nextIndex] || [];
          memo[nextIndex][amount] = memo[nextIndex][amount] || 0;
          memo[nextIndex][amount]++;
        }

        buildMemo([...text], nextIndex, nOfGroups, groups, totalSpringsRequired);
      } else {
        const first = [...text];
        first.splice(index, 1, '.');
        buildMemo(first, index, nOfGroups, groups, totalSpringsRequired);

        const second = [...text];
        second.splice(index, 1, '#');
        buildMemo(second, index, nOfGroups, groups, totalSpringsRequired);
      }
    }

    const totalSpringsRequired = configuration.reduce((acc, curr) => acc + curr, 0);
    buildMemo([...springs], 0, configuration.length, configuration, totalSpringsRequired);


    // const count = [...new Set(memo[springs.length][configuration.length])].filter(
    //   memo => {
    //     return memo.split('.').filter(x => x).every((m, i) => configuration[i] === m.length);
    //   },
    // ).length;

    const count = memo[springs.length][configuration.length];

    total += count;
  }

  return [total, totalValidationChecks];
};
