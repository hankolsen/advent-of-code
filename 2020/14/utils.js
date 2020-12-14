/* eslint-disable no-bitwise */

const intToBin = (int) => (int >>> 0).toString(2).padStart(36, 0);

const bitwiseAnd = (value, mask) => {
  const bin = intToBin(value);
  const andMask = mask.replace(/X/g, '1');
  return andMask
    .split('')
    .map((bit, index) => bin[index] & bit)
    .join('');
};
const bitwiseOr = (bin, mask) => {
  const orMask = mask.replace(/X/g, '0');
  return orMask
    .split('')
    .map((bit, index) => bin[index] | bit)
    .join('');
};

const applyMaskToAdress = (address, mask) =>
  intToBin(address)
    .split('')
    .map((bit, i) => {
      if (mask[i] === '0') {
        return bit;
      }
      if (mask[i] === '1') {
        return 1;
      }
      return 'X';
    })
    .join('');

const getNumberOfAddresses = (mask) =>
  2 *
  mask.split('').reduce((sum, bit) => {
    if (bit === 'X') {
      sum += 1;
    }
    return sum;
  }, 0);

const replaceX = (addressMask) => {
  const index = addressMask.indexOf('X');
  if (index === -1) {
    return addressMask;
  }
  return [
    replaceX(
      `${addressMask.substring(0, index)}0${addressMask.substring(index + 1)}`,
    ),
    replaceX(
      `${addressMask.substring(0, index)}1${addressMask.substring(index + 1)}`,
    ),
  ];
};

const getAdresses = (address, mask) => {
  const addressMask = applyMaskToAdress(address, mask);

  return replaceX(addressMask)
    .flat(20)
    .map((address) => parseInt(address, 2));
};

const write = (value, mask) => {
  const and = bitwiseAnd(value, mask);
  const or = bitwiseOr(and, mask);
  return parseInt(or, 2);
};

const parseRow = ({ row, memory, currentMask }) => {
  const [, mask] = row.match(/mask = ([X01]+)/) || [];
  const [, mem, value] = row.match(/mem\[(\d+)\] = (\d+)/) || [];
  if (mask !== undefined) {
    currentMask = mask;
  }
  if (mem !== undefined) {
    memory[mem] = write(value, currentMask);
  }

  return { memory, currentMask };
};

const util1 = (input) => {
  const result = input.reduce(
    (result, row) => {
      const { memory, currentMask } = parseRow({ row, ...result });
      return { memory, currentMask };
    },
    { currentMask: '', memory: {} },
  );
  return Object.values(result.memory).reduce((sum, value) => {
    sum += value;
    return sum;
  }, 0);
};

const util2 = (input) => {
  const result = input.reduce(({ memory, currentMask }, row) => {
    const [, mask] = row.match(/mask = ([X01]+)/) || [];
    const [, address, value] = row.match(/mem\[(\d+)\] = (\d+)/) || [];
    if (mask !== undefined) {
      currentMask = mask;
    }
    if (address) {
      const addresses = getAdresses(address, currentMask);
      addresses.forEach((address) => {
        memory[address] = value;
      });
    }
    return { memory, currentMask };
  }, { memory: {}, currentMask: '' });
  return Object.values(result.memory).reduce((sum, value) => {
    sum += Number(value);
    return sum;
  }, 0);
};

module.exports = { util1, util2, write, getAdresses };