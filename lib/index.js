'use strict';

const Rates = require('./rates');
const List = require('./list');

exports = module.exports = function(options) {

  if (typeof options == 'string') options = {accessKey: options};

  var liveOpts = Object.assign({}, options, {route: '/live'});
  var hisOpts = Object.assign({}, options, {route: '/historical'});

  return {
    live: Rates(liveOpts),
    historical: Rates(hisOpts),
    list: List(options)
  }
};

exports.List = List;

exports.Live = create('/live');

exports.Historical = create('/historical');

function create(route) {
  return options=> {

    if (typeof options == 'string') options = {accessKey: options};
    options.route = route;
    return Rates(options);
  }
}

