(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
    width: 832,
    height: 640,
    pxSize: 16,
    gap: 4,
    gapColor: '#EEE',
    barsColor: '#444'
};
},{}],2:[function(require,module,exports){
module.exports = (function() {
    'use strict';

    /**
     * event handler
     *
     * @class SW.Signal
     * @belongsto SW
     * @singleton
     */
    var Signal = function() {
        this._handlerManager = {};

        this._mediator = document;
    };

    /**
     * tune in to events from a dom element or built-in mediator
     *
     * @method SW.Signal.prototype.addListener
     * @param {HTMLElement} [el] - the element to listen to (if not present, will listen to built-in mediator)
     * @param {String} type - event type; can be custom or DOM
     * @param {function} handler - the event handler
     * @param {Object} [context] - if present will call handler with this scope
     */
    Signal.prototype.addListener = function(el, type, handler, context) {
        var handlers;

        // no element, shift args over
        if (typeof el === 'string' && typeof type === 'function') {
            context = handler ? handler : null;
            handler = type;
            type = el;
            el = this._mediator;
        }

        if (context) {
            if (!this._handlerManager[type]) {
                this._handlerManager[type] = [];
            }

            handlers = {
                handler: handler,
                boundHandler: handler.bind(context)
            };

            this._handlerManager[type].push(handlers);
        }

        el.addEventListener(type, handlers ? handlers.boundHandler : handler, false);
    };

    /**
     * tune out events from a dom element or built-in mediator
     *
     * @method SW.Signal.prototype.removeListener
     * @param {HTMLElement} [el] - the element to stop listening to (if not present, will tune out the built-in mediator)
     * @param {String} type - event type; can be custom or DOM
     * @param {function} handler - the event handler
     */
    Signal.prototype.removeListener = function(el, type, handler) {
        // no element, shift args over
        if (typeof el === 'string' && typeof type === 'function') {
            handler = type;
            type = el;
            el = this._mediator;
        }

        // if handler matches object of handler & boundHandler - assign boundHandler to handler; else leave as is
        if (this._handlerManager[type]) {
            for (var i = 0; i < this._handlerManager[type].length; i += 1) {
                if (handler === this._handlerManager[type][i].handler) {
                    handler = this._handlerManager[type][i].boundHandler;
                    this._handlerManager[type].splice(i, 1);
                    break;
                }
            }
        }

        el.removeEventListener(type, handler, false);
    };

    /**
     * dispatches events from a dom element or built-in mediator
     *
     * @method SW.Signal.prototype.dispatch
     * @param {HTMLElement} [el] - the element to broadcast from (if not present, will broadcast from built-in mediator)
     * @param {String} type - event type
     * @param {Object} data - the data to pass to the handler
     */
    Signal.prototype.dispatch = function(el, type, data) {
        var customEvent;

        // no element, shift args over
        if (typeof el === 'string' && typeof type !== 'string') {
            data = type;
            type = el;
            el = this._mediator;
        }
        
        customEvent = new CustomEvent(type, {
            detail : data
        });

        el.dispatchEvent(customEvent);
    };

    return new Signal();
}());
},{}],3:[function(require,module,exports){
var Bitmap;

Bitmap = (function() {
  function Bitmap() {}

  Bitmap.prototype.bresenhamLine = function(x0, y0, x1, y1, fn) {
    var dx, dy, e2, err, sx, sy, xTotal, yTotal;
    dx = Math.abs(x1 - x0);
    sx = x0 < x1 ? 1 : -1;
    dy = Math.abs(y1 - y0);
    sy = y0 < y1 ? 1 : -1;
    err = (dx > dy ? dx : -dy) / 2;
    xTotal = Math.abs(x1 - x0);
    yTotal = Math.abs(y1 - y0);
    while (xTotal >= 0 && yTotal >= 0) {
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

  Bitmap.prototype.fromPoints = function(points) {
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


},{}],4:[function(require,module,exports){
var Dom, config, signal;

signal = require('../lib/signal');

config = require('../config');

Dom = (function() {
  function Dom(canvas) {
    this.body = document.getElementsByTagName('body')[0];
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.context = this.canvas.getContext('2d');
    this.body.style.margin = 0;
    this.body.style.backgroundColor = config.barsColor;
    this.canvas.style.position = 'absolute';
    this.canvas.width = config.width;
    this.canvas.height = config.height;
    signal.addListener(window, 'resize', this.resizeHandler, this);
    this.stretchAndCenter(this.canvas);
  }

  Dom.prototype.resizeHandler = function() {
    return this.stretchAndCenter(this.canvas);
  };

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

  Dom.prototype.getContext = function() {
    return this.context;
  };

  return Dom;

})();

module.exports = Dom;


},{"../config":1,"../lib/signal":2}],5:[function(require,module,exports){
var Draw, config;

config = require('../config');

Draw = (function() {
  function Draw(context) {
    this.context = context;
  }

  Draw.prototype.clear = function() {
    return this.context.clearRect(0, 0, config.width, config.height);
  };

  Draw.prototype.fill = function(color) {
    var halfGap, hasGap, i, j, ref, ref1, size, x, xlen, y, ylen;
    hasGap = config.gap > 0;
    this.context.save();
    this.context.fillStyle = hasGap ? config.gapColor : color;
    this.context.fillRect(0, 0, config.width, config.height);
    if (hasGap) {
      xlen = config.width / config.gap;
      ylen = config.height / config.gap;
      size = config.pxSize;
      halfGap = Math.floor(config.gap / 2);
      this.context.fillStyle = color;
      for (y = i = 0, ref = xlen; 0 <= ref ? i <= ref : i >= ref; y = 0 <= ref ? ++i : --i) {
        for (x = j = 0, ref1 = ylen; 0 <= ref1 ? j <= ref1 : j >= ref1; x = 0 <= ref1 ? ++j : --j) {
          this.context.fillRect(size * x + halfGap, size * y + halfGap, size - halfGap, size - halfGap);
        }
      }
    }
    return this.context.restore();
  };

  Draw.prototype.render = function(entity) {
    var gap, halfGap, i, j, legend, len, len1, map, mapx, mapy, size, x, y;
    size = config.pxSize;
    gap = config.gap;
    map = entity.map;
    legend = entity.legend;
    halfGap = Math.floor(gap / 2);
    this.context.save();
    this.context.translate(entity.x, entity.y);
    for (y = i = 0, len = map.length; i < len; y = ++i) {
      mapy = map[y];
      for (x = j = 0, len1 = mapy.length; j < len1; x = ++j) {
        mapx = mapy[x];
        if (legend[mapx] != null) {
          this.context.fillStyle = legend[mapx];
          this.context.fillRect(size * x + halfGap, size * y + halfGap, size - halfGap, size - halfGap);
        }
      }
    }
    return this.context.restore();
  };

  return Draw;

})();

module.exports = Draw;


},{"../config":1}],6:[function(require,module,exports){
var Bitmap, Dom, Draw, bitmap, dom, draw, sprite;

Draw = require('./src/draw');

Dom = require('./src/dom');

Bitmap = require('./src/bitmap');

dom = new Dom;

draw = new Draw(dom.getContext());

bitmap = new Bitmap;

sprite = {
  x: 0,
  y: 0,
  map: [[1, 1, 1, 1], [1, 2, 2, 1], [1, 2, 2, 1], [1, 1, 1, 1]],
  legend: {
    '1': '#0C0',
    '2': '#C0C'
  }
};

draw.fill('#DDD');

draw.render(sprite);


},{"./src/bitmap":3,"./src/dom":4,"./src/draw":5}]},{},[6]);
