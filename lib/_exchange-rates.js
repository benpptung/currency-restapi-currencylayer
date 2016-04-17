'use strict';

module.exports = ExchangeRates;

function ExchangeRates(rates) {

  rates.ts = rates.timestamp * 1000;
  rates.base = rates.source;

  rates.rates = {};
  Object.keys(rates.quotes).forEach(pair=> {
    rates.rates[pair.substr(-3)] = rates.quotes[pair];
  });

  delete rates.timestamp;
  delete rates.success;
  delete rates.terms;
  delete rates.privacy;
  delete rates.source;
  delete rates.quotes;

  return rates;
}