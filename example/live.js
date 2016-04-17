'use strict';

const API = require('..');
const key = require('../config/access.json').key;
const inspect = require('util').inspect;
const colors = require('colors');

var live = API(key).live;

live((err, quotes)=> {
  if (err) return console.error(inspect(err).red);
  console.log('live from module exports');
  console.log(inspect(quotes, {colors: true}));
});
