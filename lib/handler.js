'use strict';

var gm = require('gm').subClass({imageMagick: true});

function convert (item, options) {
    if (options.s == 'bounded')
      item.strip().resize(options.w, options.h);
    else if (options.s == 'matted')
      item.strip().gravity("Center").resize(options.w, options.h).in("-background", options.b).extent(options.w, options.h).matte();
    else if (options.s == 'fill')
      item.strip().gravity(options.g).resize(options.w, options.h + '^').extent(options.w, options.h);
    else if (options.s == 'strict')
      item.strip().resize(options.w, options.h + '!').extent(options.w, options.h);
  
    if (options.q)
      item.quality(options.q);

    return item;
}

exports = module.exports = function (stream, options, cb) {
    var item = gm(stream);
    return cb('', convert(item, options).stream());
};