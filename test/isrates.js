'use strict';

const expect = require('expect.js');
const isRates = require('../lib/_isrates');

const liveResult = require('./fixtures/live-result');
const hisResult = require('./fixtures/historical-result');
const errResult = require('./fixtures/invalid-result');

describe('isRates()', function() {

  it('should detect valid exchange rates from historical or live', function() {
    expect(isRates(liveResult)).to.be.ok();
    expect(isRates(errResult)).to.not.be.ok();
  });
});