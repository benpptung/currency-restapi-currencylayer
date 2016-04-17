'use strict';

const lib = 'currency-restapi-currencylayer:rates';
const request = require('./_request');
const serial = require('util-superagent-serializer');
const sysdate = require('./_sysdate');
const isRates = require('./_isrates');
const ExchangeRates = require('./_exchange-rates');

/**
 * //options
 * {
 *   route     : '/live|/historical'
 *   access_key: {Access_Key},
 *   currencies: {String},     - 'AUD,EUR,GBP,PLN',
  *  source    : {Currency}    - 'GBP',
  *  date:     : {YYYY-MM-DD}
 * }
 *
 *
 *
 */

module.exports = function(options) {

  var route = options.route;
  var query = {access_key: options.accessKey};

  var currencies = Array.isArray(options.currencies) ? options.currencies.join() : options.currencies;
  if (currencies) query.currencies = currencies;

  var source = options.source;
  if (source) query.source = source;

  return (date, cb)=> {

    if (route == '/live') cb = date;
    if (route == '/historical') query.date = sysdate(date);

    request(route, query, (err, res)=> {

      if (err) return cb(err);
      if (!isRates(res.body)) return cb(NotRatesError(res));
      cb(null, ExchangeRates(res.body));
    })
  };
};

function NotRatesError(res) {
  var err = new TypeError(`${lib} invalid response`);
  err.original = serial(res, true);
  return err;
}