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
    } else if (options.f === 'lomo') {
      item.in("-normalize").in("-channel", "R").in("-level", "22%").in("-channel", "G").in("-level", "22%");
    } else if (options.f === 'gotham') {
      item.in("-normalize").in("-modulate", "120,10,100").in("-fill", "#222b6d").in("-colorize", 20).in("-gamma", 0.5).in("-contrast");
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