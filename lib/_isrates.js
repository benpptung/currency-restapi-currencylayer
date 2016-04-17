'use strict';

module.exports = function(rates) {

  if (!(rates === Object(rates) && rates.timestamp && rates.source &&
    (rates.quotes === Object(rates.quotes)))){
    return false;
  }

  var basepair = rates.source + rates.source;
  var pairs = Object.keys(rates.quotes);
  var valid = true;

  if (pairs.indexOf(basepair) < 0) return false;
  for(let i = 0, len = pairs.length; i < len; ++i) {
    let pair = pairs[i];

    // make sure pair and rate is valid
    if (pair.length != 6 || !isUNum(rates.quotes[pair])) {
      valid = false;
      break;
    }

    // make sure basepair's rate is 1
    if (pair == basepair && rates.quotes[pair] != 1) {
      valid = false;
      break;
    }
  }

  return valid;
};


function isUNum(num) {
  if (typeof num != 'number' && typeof num != 'string') return NaN;
  if (num === Infinity || num === -Infinity) return NaN;
  if (typeof num == 'number') return num > 0;
  return num * 1 > 0;
}