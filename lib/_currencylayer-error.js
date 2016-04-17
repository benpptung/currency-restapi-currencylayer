'use strict';

module.exports = CurrencyLayerError;

function CurrencyLayerError(body) {
  var err = new TypeError('currencylayer error via Http 200 response');
  err.errco = 'ERR_INBODY';
  err.original = body;
  return err;
}
