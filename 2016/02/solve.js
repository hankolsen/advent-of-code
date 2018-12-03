#!/usr/bin/env node
const { findCode, findCode2 } = require('./code');
const { getRows } = require('../../utils');

const solve1 = () => {
  getRows()
    .then((data) => {
      console.log(findCode(data));
    });
};

const solve2 = () => {
  getRows()
    .then((data) => {
      console.log(findCode2(data));
    });
};

solve1();
solve2();
