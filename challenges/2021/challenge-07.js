export const partTwo = (_, raw) => {
  const positions = raw.split(',').map(Number);

  const min = Math.min(...positions);
  const max = Math.max(...positions);

  let minimumCost = Infinity;
  for (let i = min; i <= max; i++) {
    const cost = getCost(positions, i);
    if (cost < minimumCost) {
      minimumCost = cost;
    }
  }

  return (minimumCost);
};

function getCost(positions, destination) {
  let sumOfCosts = 0;
  for (const position of positions) {
    const distance = Math.abs(position - destination);
    sumOfCosts += distance * (distance + 1) / 2;
  }
  return sumOfCosts;
}
