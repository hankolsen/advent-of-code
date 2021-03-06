const { groupRows } = require('../../utils');

const isPresent = (passport, requiredField) => {
  const presentRegexp = new RegExp(`${requiredField}:`, 'g');
  return passport.match(presentRegexp);
};

const minMaxNumbers = (passport, requiredField, min, max) => {
  const numberOfDigits = String(min).length;
  const digitsRegexp = new RegExp(`${requiredField}:(\\d{${numberOfDigits}})`);
  const [, number] = passport.match(digitsRegexp) || [];
  return number && number >= min && number <= max;
};

const hasCorrectHeight = (passport) =>
  !!passport.match(/hgt:(1([5-8]\d|9[0-3]))cm|(59|6\d|7[0-6])in/);

const hasCorrectHairColor = (passport) => !!passport.match(/hcl:#([\da-f]){6}/);

const hasCorrectEyeColor = (passport) =>
  !!passport.match(/ecl:(amb|blu|brn|gry|grn|hzl|oth)/);

const hasCorrectPid = (passport) => !!passport.match(/pid:(\d{9})\b/);

const validations = {
  byr: (passport) => minMaxNumbers(passport, 'byr', 1920, 2002),
  iyr: (passport) => minMaxNumbers(passport, 'iyr', 2010, 2020),
  eyr: (passport) => minMaxNumbers(passport, 'eyr', 2020, 2030),
  hgt: (passport) => hasCorrectHeight(passport),
  hcl: (passport) => hasCorrectHairColor(passport),
  ecl: (passport) => hasCorrectEyeColor(passport),
  pid: (passport) => hasCorrectPid(passport),
};

const validatePassports = (input) => {
  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  const passports = groupRows(input);
  const matchingPassports = passports.map((passportRows) => {
    const passport = passportRows.join(',');
    return requiredFields.every((requiredField) =>
      isPresent(passport, requiredField),
    );
  });
  return matchingPassports.filter(Boolean).length;
};

const validatePassports2 = (input) => {
  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  const passports = groupRows(input);
  const matchingPassports = passports.map((passportRows) => {
    const passport = passportRows.join(',');
    return requiredFields.every((requiredField) =>
      validations[requiredField](passport, requiredField),
    );
  });
  return matchingPassports.filter(Boolean).length;
};

module.exports = {
  validatePassports,
  validatePassports2,
  hasCorrectHeight,
  hasCorrectHairColor,
  hasCorrectEyeColor,
  hasCorrectPid,
};
