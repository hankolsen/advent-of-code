#!/usr/bin/env node
const { findDistance } = require('./blocks');
const { getRow } = require('../../utils');

const solve1 = () => {
  getRow()
    .then((data) => {
      console.log(findDistance(data));
    });
};

solve1();
