var express = require('express'),
  request = require('request'),
  handler = require('./lib/handler'),
  _ = require('underscore'),
  app = express();

  /*
  Possible querystrings
  s:  strategy    [bounded, matted, fill, strict] [default: bounded]
  w:  width       [default: 100]
  h:  height      [default: 100]
  q:  quality     [default: 75]
  g:  gravity     [NorthWest, North, NorthEast, West, Center, East, SouthWest, South, SouthEast] [default: Center]
  b:  background  [default: black]
  */

app.get(/(.+)/, function (req, res) {
  var url = req.params[0].substring(1, req.params[0].length);

  if (url.substring(0, 4) !== 'http') {
    return false;
  }

  if (!req.query.w && req.query.h) {
    req.query.w = req.query.h;
  }

  if (req.query.w && !req.query.h) {
    req.query.h = req.query.w;
  }

  var options = {
      s: 'bounded',
      w: 100,
      h: 100,
      g: 'Center',
      b: 'black'
    };

  _.extend(options, req.query);

  request({ url: url })
    .on('response', function (img) {
      handler(img, options, function (err, str) {
        if (err) {
          console.log(err);
        } else {
          str.pipe(res);
        }
      });
    });
});

app.listen(3000, function () {
  console.log('server listen port 3000');
});
