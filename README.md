img-handler-server
==================

A minimalist node.js image handler server

Install
-------

* First, install ImageMagick (brew install imagemagick / apt-get install imagemagick);
* Clone this repository (git clone https://github.com/rodrigoalviani/img-handler-server.git);
* Install modules (npm install);
* Up your server (node app.js);
* Done!


Examples
--------

Bounded:
http://localhost:3000/http://38.media.tumblr.com/925556f88fa5603d13b728b73912511e/tumblr_n4avfmACuD1r7tv3oo1_1280.jpg?s=bounded&w=200

Matted:
http://localhost:3000/http://38.media.tumblr.com/925556f88fa5603d13b728b73912511e/tumblr_n4avfmACuD1r7tv3oo1_1280.jpg?s=matted&w=200&b=black

Fill:
http://localhost:3000/http://38.media.tumblr.com/925556f88fa5603d13b728b73912511e/tumblr_n4avfmACuD1r7tv3oo1_1280.jpg?s=fill&w=200&g=center

Strict:
http://localhost:3000/http://38.media.tumblr.com/925556f88fa5603d13b728b73912511e/tumblr_n4avfmACuD1r7tv3oo1_1280.jpg?s=strict&w=200


Options (QueryStrings)
----------------------

```
  s:  strategy    [bounded, matted, fill, strict] [defaul: bounded]
  w:  width       [default: 100]
  h:  height      [default: 100]
  q:  quality     [default: null]
  g:  gravity     [NorthWest, North, NorthEast, West, Center, East, SouthWest, South, SouthEast] [default: Center]
  b:  background  [default: black]
```
