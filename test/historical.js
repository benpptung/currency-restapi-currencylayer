'use strict';

const expect = require('expect.js');
const api = require('..');
const key = require('../config/access.json').key;

describe('historical()', function() {

  var hisAll;
  var hisSingle;

  beforeEach(function() {
    hisAll = api(key).historical;
    hisSingle = api.Historical(key);
  });

  it('should respond rates normalized for currency-store-rates', function(done) {



    var d = new Date(1460856051547 - 1000*60*60*24*30*6); // 6 months ago

    hisAll(d, onResponse);
    hisSingle(d, onResponse);

    function onResponse(err, quotes) {
      expect(quotes.base).to.be('USD');
      expect(quotes.rates).to.be.an(Object);
      expect(quotes.date).to.be('2015-10-20');
      expect(quotes.historical).to.be.ok();
      next();
    }

    var cnt = 2;
    function next() {
      cnt--;
      if (cnt == 0) done();
    }

  });
});