'use strict';

const expect = require('expect.js');
const API = require('..');
const key = require('../config/access.json').key;

describe('live()', function() {

  var liveAll;
  var liveSingle;

  beforeEach(function() {
    liveAll = API(key).live;
    liveSingle = API.Live(key);
  });

  it('should respond rates normalized for currency-store-rates', function(done) {

    liveAll((err, quotes)=> {
      expect(quotes.base).to.be('USD');
      expect(quotes.rates).to.be.an(Object);
      next();
    });

    liveSingle((err, quotes)=> {
      expect(quotes.base).to.be('USD');
      expect(quotes.rates).to.be.an(Object);
      next();
    });

    var cnt = 2;
    function next() {
      cnt--;
      if (cnt == 0) done();
    }
  });
});