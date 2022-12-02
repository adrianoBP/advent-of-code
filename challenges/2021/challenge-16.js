export const partTwo = (_, raw) => {
  const binary = raw.split('').map(hexToBinary).join('');

  return decode(binary);
};

const hexToBinary = (hex) => {
  const binary = parseInt(hex, 16).toString(2);
  return '0000'.substring(binary.length) + binary;
};

const binaryToDecimal = (binary) => {
  return parseInt(binary, 2);
};

const decode = (binary, opType) => {
  let index = 0;

  let currentResult = 0;

  while (index + 6 + 5 <= binary.length) {
    const typeId = binaryToDecimal(binary.substring(index + 3, index + 6));
    index += 6;

    if (typeId === 4) {
      const literal = binary.substring(index);
      const { code, currentIndex } = readLiteralPacket(literal);

      switch (opType) {
        case 0:
          currentResult += binaryToDecimal(code);
          break;
        case 1:
          if (currentResult === 0) currentResult = 1;
          currentResult *= binaryToDecimal(code);
          break;
        case 2: {
          const newResult = binaryToDecimal(code);
          if (newResult < currentResult || currentResult === 0) currentResult = newResult;
          break;
        }
        case 3: {
          const newResult = binaryToDecimal(code);
          if (newResult > currentResult) currentResult = newResult;
          break;
        }
        case 5: {
          const newResult = binaryToDecimal(code);
          if (currentResult === 0) currentResult = newResult;
          else currentResult = currentResult > newResult ? 1 : 0;
          break;
        }
        case 6: {
          const newResult = binaryToDecimal(code);
          if (currentResult === 0) currentResult = newResult;
          else currentResult = currentResult < newResult ? 1 : 0;
          break;
        }
        case 7: {
          const newResult = binaryToDecimal(code);
          if (currentResult === 0) currentResult = newResult;
          else currentResult = currentResult === newResult ? 1 : 0;
          break;
        }
      }

      index += currentIndex;
    } else {
      const lengthTypeId = binary.substring(index, index + 1);

      if (lengthTypeId === '0') {
        currentResult += decode(binary.substring(++index + 15), typeId);
      } else {
        currentResult += decode(binary.substring(++index + 11), typeId);
      }
      return currentResult;
    }
  }

  return currentResult;
};

const readLiteralPacket = (binary) => {
  let code = '';
  let currentIndex = 0;
  for (let i = 0; i < binary.length; i += 5) {
    const codeBinary = binary.substring(i, i + 5);

    if (codeBinary.length === 5) { code += codeBinary.substring(1); }

    if (binary.substring(i, i + 1) === '0') {
      currentIndex = i + 5;
      break;
    }
  }

  return { code, currentIndex };
};
