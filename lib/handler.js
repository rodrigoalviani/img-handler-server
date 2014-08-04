'use strict';

var gm = require('gm').subClass({imageMagick: true});

function convert (item, options) {
    if (options.s == 'bounded')
      return item.strip().resize(options.w, options.h);
    else if (options.s == 'matted')
      return item.strip().gravity("Center").resize(options.w, options.h).in("-background", options.b).extent(options.w, options.h).matte();
    else if (options.s == 'fill')
      return item.strip().gravity(options.g).resize(options.w, options.h + '^').extent(options.w, options.h);
    else if (options.s == 'strict')
      return item.strip().resize(options.w, options.h + '!').extent(options.w, options.h);
    else return item;
}

exports = module.exports = function (stream, options, cb) {
    var item = gm(stream);
    return cb('', convert(item, options).stream());
};