'use strict';

const expect = require('expect.js');
const request = require('../lib/_request');
const access_key = require('../config/access.json').key;

describe('_request()', function() {

  it('should switch to http automatically if account is free account', function(done) {

    request('/live', {access_key}, onResponse);
    function onResponse(err, res) {
      expect(res.request.url).to.be('http://apilayer.net/api/live');
      done();
    }
  });

  it('should respond TypeError if result is not successful', function(done) {

    request('/blah', {}, onResponse);
    function onResponse(err, res) {
      expect(err).to.be.a(TypeError);
      expect(err.original).to.be.eql({
        "error": {
          "code": 101,
          "info": "You have not supplied an API Access Key. [Required format: access_key=YOUR_ACCESS_KEY]",
          "type": "missing_access_key"
        },
        "success": false
      });
      done();
    }
  });
});