'use strict';

var gm = require('gm').subClass({imageMagick: true});

function convert(item, options, cb) {
  switch (options.s) {
  case 'bounded':
    item.strip().resize(options.w, options.h).quality(options.q).stream(function (err, stdout) {
      return cb(err, stdout);
    });
    break;
  case 'matted':
    item.strip().gravity("Center").resize(options.w, options.h).in("-background", options.b).extent(options.w, options.h).matte().quality(options.q).stream(function (err, stdout) {
      return cb(err, stdout);
    });
    break;
  case 'fill':
    item.strip().gravity(options.g).resize(options.w, options.h + '^').extent(options.w, options.h).quality(options.q).stream(function (err, stdout) {
      return cb(err, stdout);
    });
    break;
  case 'strict':
    item.strip().resize(options.w, options.h + '!').extent(options.w, options.h).quality(options.q).stream(function (err, stdout) {
      return cb(err, stdout);
    });
    break;
  }
}

exports = module.exports = function (stream, options, cb) {
  convert(gm(stream), options, cb);
};