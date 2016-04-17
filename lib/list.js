'use strict';

const lib = 'currency-restapi-currencylayer:list';
const request = require('./_request');
const serial = require('util-superagent-serializer');

/**
 * // options
 * {
 *   access_key: {Access_Key}
 * }
 *
 * @param options
 * @returns {Function}
 */
module.exports = function(options) {

  if (typeof options == 'string') options = {access_key: options};

  return cb=>{

    request('/list', options, (err, res)=> {

      if (err) return cb(err);
      if (!res.body.currencies) return cb(NotResError(res));
      cb(null, res.body.currencies);
    })
  };
};

function NotResError(res) {
  var err = new TypeError(`${lib} invalid response in list request`);
  err.original = serial(res);
  return err;
}