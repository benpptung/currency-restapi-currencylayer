'use strict';

module.exports = function(date, unix) {
  var _d;

  if (isDate(date)) _d = date;
  if (!_d) _d = tsToDate(date, unix);
  if (!_d) return false;

  var y = _d.getFullYear();
  var M = '0' + (_d.getMonth() + 1);
  var d = '0' + _d.getDate();

  return y + '-' + M.substr(-2) + '-' + d.substr(-2);
};

var tsToDate = function(ts, unix) {
  if (typeof ts != 'string' && typeof ts != 'number') return;

  var n = numStrToNum(ts);
  if (n) ts = unix === true ? n * 1000 : n;

  var d = new Date(ts);
  return isNaN(d.getTime()) ? false : d;
};

var toString = Object.prototype.toString;
var dateId = toString.call(new Date());

function isDate(d) {
  return toString.call(d) == dateId && typeof d.getTime == 'function' && !isNaN(d.getTime());
}

function numStrToNum(str) {
  var n = str * 1;
  return !isNaN(n) && n;
}