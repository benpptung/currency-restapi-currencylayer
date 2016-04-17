'use strict';

const lib = 'currency-restapi-currencylayer:_request';
const request = require('superagent');
const serial = require('util-superagent-serializer');
const config = require('../config');
const CurrencyLayerErr = require('./_currencylayer-error');

var restUrl = config.restUrl;

module.exports = restRequest;
function restRequest(route, query, done) {

  request.get(restUrl + route).query(query).end((err, res)=> {

    if (err) return done(err);
    if (!res || res.body !== Object(res.body)) return done(InvalidResErr(res));

    // switch to http, if https does not work
    if (res.body.error && res.body.error.code == 105 &&
      res.body.error.info == config.httpsErr) {

      restUrl = restUrl.replace('https', 'http');
      return restRequest(route, query, done);
    }

    // callback error via HTTP 200 response
    if (!res.body.success) {
      return done(CurrencyLayerErr(res.body));
    }

    done(null, res);
  });

};


function InvalidResErr(res) {
  var err = new TypeError(`${lib} unknown response`);
  err.original = serial(res);
  return err;
}