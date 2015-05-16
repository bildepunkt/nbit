(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
    width: 832,
    height: 640,
    pxSize: 16,
    gap: 4,
    gapColor: '#FFF'
};
},{}],2:[function(require,module,exports){
var Bitmap;

Bitmap = (function() {
  function Bitmap() {}

  Bitmap.prototype.bresenhamLine = function(x0, y0, x1, y1, fn) {
    var dx, dy, e2, err, ref, ref1, ref2, sx, sy;
    dx = Math.abs(x1 - x0);
    sx = (ref = x0 < x1) != null ? ref : {
      1: -1
    };
    dy = Math.abs(y1 - y0);
    sy = (ref1 = y0 < y1) != null ? ref1 : {
      1: -1
    };
    err = ((ref2 = dx > dy) != null ? ref2 : {
      dx: -dy
    }) / 2;
    while (x0 <= x1 && y0 <= y1) {
      fn(x0, y0);
      e2 = err;
      if (e2 > -dx) {
        err -= dy;
        x0 += sx;
      }
      if (e2 < dy) {
        err += dx;
        y0 += sy;
      }
    }
    return void 0;
  };

  Bitmap.prototype.cacheBitmap = function(points) {
    var bitmap, handler, hi, i, j, k, len, len1, lo, nextPt, pt;
    lo = {
      x: Infinity,
      y: Infinity
    };
    hi = {
      x: -Infinity,
      y: -Infinity
    };
    bitmap = [];
    handler = function(x, y) {
      return bitmap[y][x] = 1;
    };
    for (i = j = 0, len = points.length; j < len; i = ++j) {
      pt = points[i];
      lo.x = pt.x < lo.x ? pt.x : lo.x;
      lo.y = pt.y < lo.y ? pt.y : lo.y;
      hi.x = pt.x > hi.x ? pt.x : hi.x;
      hi.y = pt.y > hi.y ? pt.y : hi.y;
    }
    bitmap = this.createBlank(hi.x - lo.x, hi.y - lo.y);
    for (i = k = 0, len1 = points.length; k < len1; i = ++k) {
      pt = points[i];
      nextPt = points[i + 1];
      if (nextPt != null) {
        this.bresenhamLine(pt.x, pt.y, nextPt.x, nextPt.y, handler);
      } else {
        break;
      }
    }
    return bitmap;
  };

  Bitmap.prototype.createBlank = function(xlen, ylen) {
    var blank, j, k, ref, ref1, x, y;
    blank = [];
    for (y = j = 0, ref = ylen; 0 <= ref ? j <= ref : j >= ref; y = 0 <= ref ? ++j : --j) {
      blank[y] = [];
      for (x = k = 0, ref1 = xlen; 0 <= ref1 ? k <= ref1 : k >= ref1; x = 0 <= ref1 ? ++k : --k) {
        blank[y][x] = 0;
      }
    }
    return blank;
  };

  return Bitmap;

})();

module.exports = Bitmap;


},{}],3:[function(require,module,exports){
var Dom;

Dom = (function() {
  function Dom(canvas) {
    this.body = document.getElementsByTagName('body')[0];
    this.canvas = document.getElementsByTagName('canvas')[0];
  }

  Dom.prototype.stretchAndCenter = function(el) {
    var IS_LANDSCAPE, LANDSCAPE_RATIO, PORTRAIT_RATIO, elHeight, elWidth, left, ref, top, winHeight, winLandscapeRatio, winPortraitRatio, winWidth;
    if (!el.height && !el.height) {
      false;
    }
    LANDSCAPE_RATIO = el.height / el.width;
    PORTRAIT_RATIO = el.width / el.height;
    IS_LANDSCAPE = (ref = LANDSCAPE_RATIO < PORTRAIT_RATIO) != null ? ref : {
      "true": false
    };
    winWidth = window.innerWidth;
    winHeight = window.innerHeight;
    winLandscapeRatio = winHeight / winWidth;
    winPortraitRatio = winWidth / winHeight;
    left = 0;
    top = 0;
    if (IS_LANDSCAPE) {
      if (LANDSCAPE_RATIO < winLandscapeRatio) {
        elWidth = winWidth;
        elHeight = elWidth * LANDSCAPE_RATIO;
        top = (winHeight - elHeight) / 2;
      } else {
        elHeight = winHeight;
        elWidth = winHeight * PORTRAIT_RATIO;
        left = (winWidth - elWidth) / 2;
      }
    } else {
      if (PORTRAIT_RATIO < winPortraitRatio) {
        elHeight = winHeight;
        elWidth = winHeight * PORTRAIT_RATIO;
        left = (winWidth - elWidth) / 2;
      } else {
        elWidth = winWidth;
        elHeight = elWidth * LANDSCAPE_RATIO;
        top = (winHeight - elHeight) / 2;
      }
    }
    el.style.width = (Math.round(elWidth)) + "px";
    el.style.height = (Math.round(elHeight)) + "px";
    el.style.left = (Math.round(left)) + "px";
    el.style.top = (Math.round(top)) + "px";
    return void 0;
  };

  Dom.prototype.getCanvas = function() {
    return this.canvas;
  };

  return Dom;

})();

module.exports = Dom;


},{}],4:[function(require,module,exports){
var Draw, config;

config = require('../config');

Draw = (function() {
  function Draw(context) {
    this.context = context;
  }

  Draw.prototype.render = function(entity) {};

  return Draw;

})();

module.exports = Draw;


},{"../config":1}],5:[function(require,module,exports){
var Bitmap, Dom, Draw, bitmap, bm, dom, draw;

Draw = require('./src/draw');

Dom = require('./src/dom');

Bitmap = require('./src/bitmap');

dom = new Dom;

dom.stretchAndCenter(dom.getCanvas());

draw = new Draw(dom.getCanvas().getContext('2d'));

bitmap = new Bitmap;

bm = bitmap.cacheBitmap([
  {
    x: 0,
    y: 0
  }, {
    x: 4,
    y: 4
  }
]);

console.log(bm);


},{"./src/bitmap":2,"./src/dom":3,"./src/draw":4}]},{},[5]);
