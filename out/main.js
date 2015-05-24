(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Vector, can, ctx, v;

can = document.querySelector('canvas');

can.width = 512;

can.height = 512;

ctx = can.getContext('2d');

Vector = (function() {
  function Vector(ctx) {
    this.context = ctx;
    this.strokeStyle = '#0C0';
    this.fillStyle = '#C0C';
    this.size = 8;
    this.gap = 2;
  }

  Vector.prototype.bresenhamize = function(x0, y0, x1, y1, fn) {
    var dx, dy, e2, err, sx, sy, xTotal, yTotal;
    dx = Math.abs(x1 - x0);
    sx = x0 < x1 ? 1 : -1;
    dy = Math.abs(y1 - y0);
    sy = y0 < y1 ? 1 : -1;
    err = (dx > dy ? dx : -dy) / 2;
    xTotal = Math.abs(x1 - x0);
    yTotal = Math.abs(y1 - y0);
    while (xTotal >= 0 || yTotal >= 0) {
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
      xTotal--;
      yTotal--;
    }
    return void 0;
  };

  Vector.prototype.setPoints = function(points) {
    var bitmap, hi, i, j, len, lo, pt;
    hi = {
      x: 0,
      y: 0
    };
    lo = {
      x: 0,
      y: 0
    };
    bitmap = [];
    for (i = j = 0, len = points.length; j < len; i = ++j) {
      pt = points[i];
      lo.x = pt.x < lo.x ? pt.x : lo.x;
      lo.y = pt.y < lo.y ? pt.y : lo.y;
      hi.x = pt.x > hi.x ? pt.x : hi.x;
      hi.y = pt.y > hi.y ? pt.y : hi.y;
    }
    bitmap = this.createBlank(hi.x - lo.x, hi.y - lo.y);
    bitmap = this.setStroke(bitmap, points);
    bitmap = this.setFill(bitmap);
    this.bitmap = bitmap;
    return void 0;
  };

  Vector.prototype.setStroke = function(bitmap, points) {
    var handler, j, len, nextPt, p, pt;
    handler = function(x, y) {
      bitmap[y][x] = 1;
      return void 0;
    };
    for (p = j = 0, len = points.length; j < len; p = ++j) {
      pt = points[p];
      nextPt = points[p + 1];
      if (nextPt != null) {
        this.bresenhamize(pt.x, pt.y, nextPt.x, nextPt.y, handler);
      } else {
        break;
      }
    }
    return bitmap;
  };

  Vector.prototype.setFill = function(bitmap) {
    var bitmapY, bitmapYX, fillEnded, fillStarted, fillableIndex, filledRow, j, k, len, len1, rowHasFill, x, y;
    fillStarted = false;
    fillEnded = false;
    fillableIndex = false;
    rowHasFill = false;
    filledRow = [];
    for (y = j = 0, len = bitmap.length; j < len; y = ++j) {
      bitmapY = bitmap[y];
      if (rowHasFill) {
        bitmap[y - 1] = filledRow;
      }
      console.log('-----');
      fillStarted = false;
      fillEnded = false;
      fillableIndex = false;
      rowHasFill = false;
      filledRow = [];
      for (x = k = 0, len1 = bitmapY.length; k < len1; x = ++k) {
        bitmapYX = bitmapY[x];
        fillableIndex = false;
        if (bitmapYX === 0 && bitmapY[x - 1] === 1) {
          fillStarted = true;
        }
        if (bitmapYX === 1 && fillStarted) {
          fillEnded = true;
          rowHasFill = true;
        }
        if (fillStarted && !fillEnded) {
          fillableIndex = true;
        }
        filledRow[x] = fillableIndex ? 2 : bitmapYX;
      }
    }
    return bitmap;
  };

  Vector.prototype.render = function() {
    var bmx, bmy, j, k, len, len1, noPoint, ref, x, y;
    this.context.save();
    ref = this.bitmap;
    for (y = j = 0, len = ref.length; j < len; y = ++j) {
      bmy = ref[y];
      for (x = k = 0, len1 = bmy.length; k < len1; x = ++k) {
        bmx = bmy[x];
        noPoint = false;
        if (bmx === 0) {
          noPoint = true;
        } else if (bmx === 1) {
          this.context.fillStyle = this.strokeStyle;
        } else if (bmx === 2) {
          this.context.fillStyle = this.fillStyle;
        }
        if (!noPoint) {
          this.drawPoint(x, y);
        }
      }
    }
    this.context.restore();
    return void 0;
  };

  Vector.prototype.drawPoint = function(x, y) {
    var halfGap;
    if (this.gap != null) {
      halfGap = this.gap / 2;
      this.context.fillRect((x * this.size) + halfGap * x, (y * this.size) + halfGap * y, this.size - halfGap, this.size - halfGap);
    } else {
      this.context.fillRect(x * this.size, y * this.size, this.size, this.size);
    }
    return void 0;
  };

  Vector.prototype.createBlank = function(xlen, ylen) {
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

  return Vector;

})();

v = new Vector(ctx);

v.setPoints([
  {
    x: 0,
    y: 0
  }, {
    x: 8,
    y: 4
  }, {
    x: 8,
    y: 8
  }, {
    x: 0,
    y: 4
  }, {
    x: 0,
    y: 0
  }
]);

v.render();


},{}]},{},[1]);
