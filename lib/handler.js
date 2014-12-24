'use strict';

var gm = require('gm').subClass({imageMagick: true});

function convert(item, options) {
  if (options.s.toLowerCase() === 'bounded') {
    item.strip().resize(options.w, options.h);
  } else if (options.s.toLowerCase() === 'matted') {
    item.strip().gravity("Center").resize(options.w, options.h).in("-background", options.b).extent(options.w, options.h).matte();
  } else if (options.s.toLowerCase() === 'fill') {
    item.strip().gravity(options.g).resize(options.w, options.h + '^').extent(options.w, options.h);
  } else if (options.s.toLowerCase() === 'strict') {
    item.strip().resize(options.w, options.h + '!').extent(options.w, options.h);
  }

  if (options.f) {
    options.f = options.f.toLowerCase();
    if (options.f === 'grayscale') {
      item.in("-normalize").in("-grayscale", "Average");
    } else if (options.f === 'sepia') {
      item.in("-normalize").in("-grayscale", "Average").in("-fill", "goldenrod").in("-tint", 100);
    } else if (options.f === 'negate') {
      item.in("-normalize").in("-negate");
    }
  }

  if (options.q) {
    item.quality(options.q);
  }

  return item;
}

exports = module.exports = function (stream, options, cb) {
  var item = gm(stream);
  return cb('', convert(item, options).stream());
};