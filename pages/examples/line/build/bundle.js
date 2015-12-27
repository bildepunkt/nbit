(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/**
 * @class       Config
 * @description The configuration object for nBit. This object does not conform to
 *              the underscore prefixed private property paradigm.
 * @author      Chris Peters
 */

var Config =
/**
 * [constructor description]
 * @return {[type]} [description]
 */
function Config(options) {
    _classCallCheck(this, Config);

    this.blockSize = 8;
    this.viewportWidth = 100;
    this.viewportHeight = 75;
    this.parentEl = document.body;
    this.parentElBgColor = '#000';
    this.canvasBgColor = '#FFF';

    for (var key in options) {
        this[key] = options[key];
    }
};

exports.default = Config;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * @class       Point
 * @description Create 2D point. This object does not conform to the underscore
 *              prefixed private property paradigm.
 * @author      Chris Peters
 */

var Point =
/**
 * initialize a point with 0,0 or given coordinates
 * @param  {Integer} x
 * @param  {Integer} y
 */
function Point(x, y) {
  _classCallCheck(this, Point);

  this.x = x || 0;
  this.y = y || 0;
};

exports.default = Point;

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _MaintainMax = require('./lib/MaintainMax');

var _MaintainMax2 = _interopRequireDefault(_MaintainMax);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/**
 * @class       Viewport
 * @description Creates and handles the canvas DOM element
 * @extends     GetSet
 * @required    MaintainMax
 * @author      Chris Peters
 */

var Viewport = (function () {
    /**
     * @param {object} deps
     * @param {object} deps.config
     * @param {object} [deps.document]
     * @param {object} [deps.window]
     */

    function Viewport(deps) {
        _classCallCheck(this, Viewport);

        this._config = deps.config;
        this._document = deps.document || document;
        this._window = deps.window || window;

        this._canvas = this._document.createElement('canvas');
        this._context = this._canvas.getContext('2d');

        this._canvas.width = this._config.viewportWidth * this._config.blockSize;
        this._canvas.height = this._config.viewportHeight * this._config.blockSize;
        this._canvas.style.position = 'absolute';
        this._canvas.style.backgroundColor = this._config.canvasBgColor;

        this._config.parentEl.style.backgroundColor = this._config.parentElBgColor;
        this._config.parentEl.appendChild(this._canvas);

        this._window.addEventListener('resize', this._handleResize.bind(this));

        this._handleResize();
    }

    /**
     * [_handleResize description]
     */

    _createClass(Viewport, [{
        key: '_handleResize',
        value: function _handleResize() {
            var config = this._config;

            var _MaintainMax$fit = _MaintainMax2.default.fit(config.viewportWidth * config.blockSize, config.viewportHeight * config.blockSize);

            var top = _MaintainMax$fit.top;
            var left = _MaintainMax$fit.left;
            var width = _MaintainMax$fit.width;
            var height = _MaintainMax$fit.height;

            this._canvas.style.top = Math.round(top) + 'px';
            this._canvas.style.left = Math.round(left) + 'px';
            this._canvas.style.width = Math.round(width) + 'px';
            this._canvas.style.height = Math.round(height) + 'px';
        }

        /**
         * @return {Object} The canvas' 2d context object
         */

    }, {
        key: 'getContext',
        value: function getContext() {
            return this._context;
        }
    }]);

    return Viewport;
})();

exports.default = Viewport;

},{"./lib/MaintainMax":7}],4:[function(require,module,exports){
"use strict";

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/**
 * @class       draw.Block
 * @description 2D point with color data
 * @author      Chris Peters
 */

var Block = (function () {
    function Block() {
        _classCallCheck(this, Block);
    }

    _createClass(Block, null, [{
        key: "_getPixelOffset",

        /**
         * [getPointOffset description]
         * @param {Integer} x    The y coord
         * @param {Integer} y    The x coord
         * @param {Integer} size The block size
         * @return {Object}      The Block point offset
         */
        value: function _getPixelOffset(x, y, size) {
            return {
                x: Math.round(x) * size - size / 2,
                y: Math.round(y) * size - size / 2
            };
        }

        /**
         * Renders a block to the canvas
         *
         * @param {Object} context The canvas' 2d context object
         */

    }, {
        key: "render",
        value: function render(x, y, color, size) {
            var offset = this._getPixelOffset(x, y, size);

            Block._context.save();
            Block._context.fillStyle = color;
            Block._context.fillRect(offset.x, offset.y, size, size);
            Block._context.restore();
        }
    }, {
        key: "setContext",
        value: function setContext(context) {
            Block._context = context;

            return this;
        }
    }]);

    return Block;
})();

/**
 * Static properties
 */

exports.default = Block;
Block._context = null;

},{}],5:[function(require,module,exports){
'use strict';

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Block = require('./Block');

var _Block2 = _interopRequireDefault(_Block);

var _Bresenham = require('../lib/Bresenham');

var _Bresenham2 = _interopRequireDefault(_Bresenham);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/**
 * @class       draw.Line
 * @description Plots Blocks between (and at) two Points
 * @requires    Block
 * @requires    Bresenham
 * @author      Chris Peters
 */

var Line = (function () {
    /**
     *
     * @param {Object}  deps         Injected dependencies
     * @param {Object}  deps.config  Configuration
     * @param {Object}  deps.context The canvas' 2d context
     * @param {String}  [color]      Initial color
     */

    function Line(deps, color) {
        _classCallCheck(this, Line);

        this._config = deps.config;

        this._points = [];
        this._color = color || '#000';
    }

    /**
     * The wrapper method to pass to Bresenham.plotLine
     *
     * @param  {[type]} x [description]
     * @param  {[type]} y [description]
     */

    _createClass(Line, [{
        key: '_plot',
        value: function _plot(x, y) {
            _Block2.default.render(x, y, this._color, this._config.blockSize, this._context);
        }

        /**
         * Set the line's two points
         *
         * @param {[type]} key [description]
         * @param {[type]} val [description]
         */

    }, {
        key: 'setPoints',
        value: function setPoints(ptA, ptB) {
            this._points = [ptA, ptB];

            return this;
        }
    }, {
        key: 'render',
        value: function render() {
            if (this._points[0] && this._points[1]) {
                _Bresenham2.default.plotLine(this._points[0], this._points[1], this._plot.bind(this));
            } else {
                throw new Error('Line must have two points');
            }
        }
    }]);

    return Line;
})();

exports.default = Line;

},{"../lib/Bresenham":6,"./Block":4}],6:[function(require,module,exports){
"use strict";

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/**
 * @class       Bresenham
 * @description Bresenham's formulae for calculating blocks from curves, between points etc.
 *              Thanks to Zingl Alois: http://members.chello.at/easyfilter/bresenham.html
 * @author      Chris Peters
 */

var Bresenham = (function () {
    function Bresenham() {
        _classCallCheck(this, Bresenham);
    }

    _createClass(Bresenham, null, [{
        key: "plotLine",

        /**
         * plot the connecting blocks between two points
         * @param {Point} ptA
         * @param {Point} ptB
         * @param {function} callback - what to do when a connection point is calculated
         */
        value: function plotLine(ptA, ptB, plot) {
            var dx = Math.abs(ptB.x - ptA.x);
            var sx = ptA.x < ptB.x ? 1 : -1;
            var dy = -Math.abs(ptB.y - ptA.y);
            var sy = ptA.y < ptB.y ? 1 : -1;
            var err = dx + dy,
                e2 = undefined;

            while (true) {
                plot(ptA.x, ptA.y);

                if (ptA.x == ptB.x && ptA.y == ptB.y) {
                    break;
                }

                e2 = 2 * err;

                if (e2 >= dy) {
                    err += dy;
                    ptA.x += sx;
                }

                if (e2 <= dx) {
                    err += dx;
                    ptA.y += sy;
                }
            }
        }
    }]);

    return Bresenham;
})();

exports.default = Bresenham;

},{}],7:[function(require,module,exports){
"use strict";

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/**
 * @class       MaintainMax
 * @description Keeps canvas element centered and (with aspect ratio intact) in the viewport
 */

var MaintainMax = (function () {
    function MaintainMax() {
        _classCallCheck(this, MaintainMax);
    }

    _createClass(MaintainMax, null, [{
        key: "fit",

        /**
         * @param  {number} width - the element's width
         * @param  {number} height - the element's height
         * @return {object} the new top, left, width, & height
         */
        value: function fit(width, height) {
            var LANDSCAPE_RATIO = height / width;
            var PORTRAIT_RATIO = width / height;
            var IS_LANDSCAPE = LANDSCAPE_RATIO < PORTRAIT_RATIO ? true : false;

            var winWidth = window.innerWidth;
            var winHeight = window.innerHeight;
            var winLandscapeRatio = winHeight / winWidth;
            var winPortraitRatio = winWidth / winHeight;
            var offsetLeft = 0;
            var offsetTop = 0;
            var offsetWidth = undefined;
            var offsetHeight = undefined;

            if (IS_LANDSCAPE) {
                if (LANDSCAPE_RATIO < winLandscapeRatio) {
                    offsetWidth = winWidth;
                    offsetHeight = offsetWidth * LANDSCAPE_RATIO;
                    offsetTop = (winHeight - offsetHeight) / 2;
                } else {
                    offsetHeight = winHeight;
                    offsetWidth = winHeight * PORTRAIT_RATIO;
                    offsetLeft = (winWidth - offsetWidth) / 2;
                }
            } else {
                if (PORTRAIT_RATIO < winPortraitRatio) {
                    offsetHeight = winHeight;
                    offsetWidth = winHeight * PORTRAIT_RATIO;
                    offsetLeft = (winWidth - offsetWidth) / 2;
                } else {
                    offsetWidth = winWidth;
                    offsetHeight = offsetWidth * LANDSCAPE_RATIO;
                    offsetTop = (winHeight - offsetHeight) / 2;
                }
            }

            return {
                width: offsetWidth,
                height: offsetHeight,
                left: offsetLeft,
                top: offsetTop
            };
        }
    }]);

    return MaintainMax;
})();

exports.default = MaintainMax;

},{}],8:[function(require,module,exports){
'use strict';

var _Config = require('../../../../dist/Config');

var _Config2 = _interopRequireDefault(_Config);

var _Viewport = require('../../../../dist/Viewport');

var _Viewport2 = _interopRequireDefault(_Viewport);

var _Point = require('../../../../dist/Point');

var _Point2 = _interopRequireDefault(_Point);

var _Block = require('../../../../dist/draw/Block');

var _Block2 = _interopRequireDefault(_Block);

var _Line = require('../../../../dist/draw/Line');

var _Line2 = _interopRequireDefault(_Line);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = new _Config2.default();
var viewport = new _Viewport2.default({ config: config });
var line = new _Line2.default({ config: config });

_Block2.default.setContext(viewport.getContext());

line.setPoints(new _Point2.default(4, 4), new _Point2.default(16, 32)).render();

},{"../../../../dist/Config":1,"../../../../dist/Point":2,"../../../../dist/Viewport":3,"../../../../dist/draw/Block":4,"../../../../dist/draw/Line":5}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9kaXN0L0NvbmZpZy5qcyIsIi4uL2Rpc3QvUG9pbnQuanMiLCIuLi9kaXN0L1ZpZXdwb3J0LmpzIiwiLi4vZGlzdC9kcmF3L0Jsb2NrLmpzIiwiLi4vZGlzdC9kcmF3L0xpbmUuanMiLCIuLi9kaXN0L2xpYi9CcmVzZW5oYW0uanMiLCIuLi9kaXN0L2xpYi9NYWludGFpbk1heC5qcyIsImV4YW1wbGVzL2xpbmUvc3JjL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7O0FBRWIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQ3pDLFNBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQyxDQUFDOztBQUVILFNBQVMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUU7QUFBRSxRQUFJLEVBQUUsUUFBUSxZQUFZLFdBQVcsQ0FBQSxBQUFDLEVBQUU7QUFBRSxjQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7S0FBRTtDQUFFOzs7Ozs7Ozs7QUFBQSxBQVN6SixJQUFJLE1BQU07Ozs7O0FBS1YsU0FBUyxNQUFNLENBQUMsT0FBTyxFQUFFO0FBQ3JCLG1CQUFlLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztBQUU5QixRQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztBQUNuQixRQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztBQUN6QixRQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztBQUN6QixRQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7QUFDOUIsUUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUM7QUFDOUIsUUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7O0FBRTVCLFNBQUssSUFBSSxHQUFHLElB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OztBQUVKLFdBQU8sV0FBVyxDQUFDO0NBQ3RCLENBQUEsRUFBRyxDQUFDOztBQUVMLE9BQU8sQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0RTlCLElBQUksTUFBTSxHQUFHLHNCQUFZLENBQUM7QUFDMUIsSUFBSSxRQUFRLEdBQUcsdUJBQWEsRUFBQyxNQUFNLEVBQU4sTUFBTSxFQUFDLENBQUMsQ0FBQztBQUN0QyxJQUFJLElBQUksR0FBRyxtQkFBUyxFQUFDLE1BQU0sRUFBTixNQUFNLEVBQUMsQ0FBQyxDQUFDOztBQUU5QixnQkFBTSxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7O0FBRXhDLElBQUksQ0FBQyxTQUFTLENBQ1Ysb0JBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLG9CQUFVLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FDckMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyoqXG4gKiBAY2xhc3MgICAgICAgQ29uZmlnXG4gKiBAZGVzY3JpcHRpb24gVGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGZvciBuQml0LiBUaGlzIG9iamVjdCBkb2VzIG5vdCBjb25mb3JtIHRvXG4gKiAgICAgICAgICAgICAgdGhlIHVuZGVyc2NvcmUgcHJlZml4ZWQgcHJpdmF0ZSBwcm9wZXJ0eSBwYXJhZGlnbS5cbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqL1xuXG52YXIgQ29uZmlnID1cbi8qKlxuICogW2NvbnN0cnVjdG9yIGRlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3R5cGVdfSBbZGVzY3JpcHRpb25dXG4gKi9cbmZ1bmN0aW9uIENvbmZpZyhvcHRpb25zKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvbmZpZyk7XG5cbiAgICB0aGlzLmJsb2NrU2l6ZSA9IDg7XG4gICAgdGhpcy52aWV3cG9ydFdpZHRoID0gMTAwO1xuICAgIHRoaXMudmlld3BvcnRIZWlnaHQgPSA3NTtcbiAgICB0aGlzLnBhcmVudEVsID0gZG9jdW1lbnQuYm9keTtcbiAgICB0aGlzLnBhcmVudEVsQmdDb2xvciA9ICcjMDAwJztcbiAgICB0aGlzLmNhbnZhc0JnQ29sb3IgPSAnI0ZGRic7XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gb3B0aW9ucykge1xuICAgICAgICB0aGlzW2tleV0gPSBvcHRpb25zW2tleV07XG4gICAgfVxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQ29uZmlnOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIEBjbGFzcyAgICAgICBQb2ludFxuICogQGRlc2NyaXB0aW9uIENyZWF0ZSAyRCBwb2ludC4gVGhpcyBvYmplY3QgZG9lcyBub3QgY29uZm9ybSB0byB0aGUgdW5kZXJzY29yZVxuICogICAgICAgICAgICAgIHByZWZpeGVkIHByaXZhdGUgcHJvcGVydHkgcGFyYWRpZ20uXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cblxudmFyIFBvaW50ID1cbi8qKlxuICogaW5pdGlhbGl6ZSBhIHBvaW50IHdpdGggMCwwIG9yIGdpdmVuIGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0gIHtJbnRlZ2VyfSB4XG4gKiBAcGFyYW0gIHtJbnRlZ2VyfSB5XG4gKi9cbmZ1bmN0aW9uIFBvaW50KHgsIHkpIHtcbiAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFBvaW50KTtcblxuICB0aGlzLnggPSB4IHx8IDA7XG4gIHRoaXMueSA9IHkgfHwgMDtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFBvaW50OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfTWFpbnRhaW5NYXggPSByZXF1aXJlKCcuL2xpYi9NYWludGFpbk1heCcpO1xuXG52YXIgX01haW50YWluTWF4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX01haW50YWluTWF4KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyoqXG4gKiBAY2xhc3MgICAgICAgVmlld3BvcnRcbiAqIEBkZXNjcmlwdGlvbiBDcmVhdGVzIGFuZCBoYW5kbGVzIHRoZSBjYW52YXMgRE9NIGVsZW1lbnRcbiAqIEBleHRlbmRzICAgICBHZXRTZXRcbiAqIEByZXF1aXJlZCAgICBNYWludGFpbk1heFxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5cbnZhciBWaWV3cG9ydCA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGRlcHNcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZGVwcy5jb25maWdcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW2RlcHMuZG9jdW1lbnRdXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtkZXBzLndpbmRvd11cbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIFZpZXdwb3J0KGRlcHMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFZpZXdwb3J0KTtcblxuICAgICAgICB0aGlzLl9jb25maWcgPSBkZXBzLmNvbmZpZztcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQgPSBkZXBzLmRvY3VtZW50IHx8IGRvY3VtZW50O1xuICAgICAgICB0aGlzLl93aW5kb3cgPSBkZXBzLndpbmRvdyB8fCB3aW5kb3c7XG5cbiAgICAgICAgdGhpcy5fY2FudmFzID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSB0aGlzLl9jb25maWcudmlld3BvcnRXaWR0aCAqIHRoaXMuX2NvbmZpZy5ibG9ja1NpemU7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSB0aGlzLl9jb25maWcudmlld3BvcnRIZWlnaHQgKiB0aGlzLl9jb25maWcuYmxvY2tTaXplO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5fY29uZmlnLmNhbnZhc0JnQ29sb3I7XG5cbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcmVudEVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuX2NvbmZpZy5wYXJlbnRFbEJnQ29sb3I7XG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJlbnRFbC5hcHBlbmRDaGlsZCh0aGlzLl9jYW52YXMpO1xuXG4gICAgICAgIHRoaXMuX3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9oYW5kbGVSZXNpemUuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5faGFuZGxlUmVzaXplKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogW19oYW5kbGVSZXNpemUgZGVzY3JpcHRpb25dXG4gICAgICovXG5cbiAgICBfY3JlYXRlQ2xhc3MoVmlld3BvcnQsIFt7XG4gICAgICAgIGtleTogJ19oYW5kbGVSZXNpemUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2hhbmRsZVJlc2l6ZSgpIHtcbiAgICAgICAgICAgIHZhciBjb25maWcgPSB0aGlzLl9jb25maWc7XG5cbiAgICAgICAgICAgIHZhciBfTWFpbnRhaW5NYXgkZml0ID0gX01haW50YWluTWF4Mi5kZWZhdWx0LmZpdChjb25maWcudmlld3BvcnRXaWR0aCAqIGNvbmZpZy5ibG9ja1NpemUsIGNvbmZpZy52aWV3cG9ydEhlaWdodCAqIGNvbmZpZy5ibG9ja1NpemUpO1xuXG4gICAgICAgICAgICB2YXIgdG9wID0gX01haW50YWluTWF4JGZpdC50b3A7XG4gICAgICAgICAgICB2YXIgbGVmdCA9IF9NYWludGFpbk1heCRmaXQubGVmdDtcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IF9NYWludGFpbk1heCRmaXQud2lkdGg7XG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gX01haW50YWluTWF4JGZpdC5oZWlnaHQ7XG5cbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS50b3AgPSBNYXRoLnJvdW5kKHRvcCkgKyAncHgnO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLmxlZnQgPSBNYXRoLnJvdW5kKGxlZnQpICsgJ3B4JztcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS53aWR0aCA9IE1hdGgucm91bmQod2lkdGgpICsgJ3B4JztcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5oZWlnaHQgPSBNYXRoLnJvdW5kKGhlaWdodCkgKyAncHgnO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGNhbnZhcycgMmQgY29udGV4dCBvYmplY3RcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldENvbnRleHQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q29udGV4dCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0O1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIFZpZXdwb3J0O1xufSkoKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gVmlld3BvcnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIEBjbGFzcyAgICAgICBkcmF3LkJsb2NrXG4gKiBAZGVzY3JpcHRpb24gMkQgcG9pbnQgd2l0aCBjb2xvciBkYXRhXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cblxudmFyIEJsb2NrID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCbG9jaygpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJsb2NrKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoQmxvY2ssIG51bGwsIFt7XG4gICAgICAgIGtleTogXCJfZ2V0UGl4ZWxPZmZzZXRcIixcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2dldFBvaW50T2Zmc2V0IGRlc2NyaXB0aW9uXVxuICAgICAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IHggICAgVGhlIHkgY29vcmRcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfSB5ICAgIFRoZSB4IGNvb3JkXG4gICAgICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gc2l6ZSBUaGUgYmxvY2sgc2l6ZVxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgVGhlIEJsb2NrIHBvaW50IG9mZnNldFxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRQaXhlbE9mZnNldCh4LCB5LCBzaXplKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHg6IE1hdGgucm91bmQoeCkgKiBzaXplIC0gc2l6ZSAvIDIsXG4gICAgICAgICAgICAgICAgeTogTWF0aC5yb3VuZCh5KSAqIHNpemUgLSBzaXplIC8gMlxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW5kZXJzIGEgYmxvY2sgdG8gdGhlIGNhbnZhc1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY29udGV4dCBUaGUgY2FudmFzJyAyZCBjb250ZXh0IG9iamVjdFxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcInJlbmRlclwiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKHgsIHksIGNvbG9yLCBzaXplKSB7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5fZ2V0UGl4ZWxPZmZzZXQoeCwgeSwgc2l6ZSk7XG5cbiAgICAgICAgICAgIEJsb2NrLl9jb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgIEJsb2NrLl9jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICAgICAgQmxvY2suX2NvbnRleHQuZmlsbFJlY3Qob2Zmc2V0LngsIG9mZnNldC55LCBzaXplLCBzaXplKTtcbiAgICAgICAgICAgIEJsb2NrLl9jb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcInNldENvbnRleHRcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNldENvbnRleHQoY29udGV4dCkge1xuICAgICAgICAgICAgQmxvY2suX2NvbnRleHQgPSBjb250ZXh0O1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBCbG9jaztcbn0pKCk7XG5cbi8qKlxuICogU3RhdGljIHByb3BlcnRpZXNcbiAqL1xuXG5leHBvcnRzLmRlZmF1bHQgPSBCbG9jaztcbkJsb2NrLl9jb250ZXh0ID0gbnVsbDsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX0Jsb2NrID0gcmVxdWlyZSgnLi9CbG9jaycpO1xuXG52YXIgX0Jsb2NrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Jsb2NrKTtcblxudmFyIF9CcmVzZW5oYW0gPSByZXF1aXJlKCcuLi9saWIvQnJlc2VuaGFtJyk7XG5cbnZhciBfQnJlc2VuaGFtMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0JyZXNlbmhhbSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogQGNsYXNzICAgICAgIGRyYXcuTGluZVxuICogQGRlc2NyaXB0aW9uIFBsb3RzIEJsb2NrcyBiZXR3ZWVuIChhbmQgYXQpIHR3byBQb2ludHNcbiAqIEByZXF1aXJlcyAgICBCbG9ja1xuICogQHJlcXVpcmVzICAgIEJyZXNlbmhhbVxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5cbnZhciBMaW5lID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgZGVwcyAgICAgICAgIEluamVjdGVkIGRlcGVuZGVuY2llc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgZGVwcy5jb25maWcgIENvbmZpZ3VyYXRpb25cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gIGRlcHMuY29udGV4dCBUaGUgY2FudmFzJyAyZCBjb250ZXh0XG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICBbY29sb3JdICAgICAgSW5pdGlhbCBjb2xvclxuICAgICAqL1xuXG4gICAgZnVuY3Rpb24gTGluZShkZXBzLCBjb2xvcikge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTGluZSk7XG5cbiAgICAgICAgdGhpcy5fY29uZmlnID0gZGVwcy5jb25maWc7XG5cbiAgICAgICAgdGhpcy5fcG9pbnRzID0gW107XG4gICAgICAgIHRoaXMuX2NvbG9yID0gY29sb3IgfHwgJyMwMDAnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSB3cmFwcGVyIG1ldGhvZCB0byBwYXNzIHRvIEJyZXNlbmhhbS5wbG90TGluZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7W3R5cGVdfSB4IFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIHtbdHlwZV19IHkgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuXG4gICAgX2NyZWF0ZUNsYXNzKExpbmUsIFt7XG4gICAgICAgIGtleTogJ19wbG90JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9wbG90KHgsIHkpIHtcbiAgICAgICAgICAgIF9CbG9jazIuZGVmYXVsdC5yZW5kZXIoeCwgeSwgdGhpcy5fY29sb3IsIHRoaXMuX2NvbmZpZy5ibG9ja1NpemUsIHRoaXMuX2NvbnRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCB0aGUgbGluZSdzIHR3byBwb2ludHNcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtbdHlwZV19IGtleSBbZGVzY3JpcHRpb25dXG4gICAgICAgICAqIEBwYXJhbSB7W3R5cGVdfSB2YWwgW2Rlc2NyaXB0aW9uXVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2V0UG9pbnRzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNldFBvaW50cyhwdEEsIHB0Qikge1xuICAgICAgICAgICAgdGhpcy5fcG9pbnRzID0gW3B0QSwgcHRCXTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fcG9pbnRzWzBdICYmIHRoaXMuX3BvaW50c1sxXSkge1xuICAgICAgICAgICAgICAgIF9CcmVzZW5oYW0yLmRlZmF1bHQucGxvdExpbmUodGhpcy5fcG9pbnRzWzBdLCB0aGlzLl9wb2ludHNbMV0sIHRoaXMuX3Bsb3QuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTGluZSBtdXN0IGhhdmUgdHdvIHBvaW50cycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIExpbmU7XG59KSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBMaW5lOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyoqXG4gKiBAY2xhc3MgICAgICAgQnJlc2VuaGFtXG4gKiBAZGVzY3JpcHRpb24gQnJlc2VuaGFtJ3MgZm9ybXVsYWUgZm9yIGNhbGN1bGF0aW5nIGJsb2NrcyBmcm9tIGN1cnZlcywgYmV0d2VlbiBwb2ludHMgZXRjLlxuICogICAgICAgICAgICAgIFRoYW5rcyB0byBaaW5nbCBBbG9pczogaHR0cDovL21lbWJlcnMuY2hlbGxvLmF0L2Vhc3lmaWx0ZXIvYnJlc2VuaGFtLmh0bWxcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqL1xuXG52YXIgQnJlc2VuaGFtID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCcmVzZW5oYW0oKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCcmVzZW5oYW0pO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhCcmVzZW5oYW0sIG51bGwsIFt7XG4gICAgICAgIGtleTogXCJwbG90TGluZVwiLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBwbG90IHRoZSBjb25uZWN0aW5nIGJsb2NrcyBiZXR3ZWVuIHR3byBwb2ludHNcbiAgICAgICAgICogQHBhcmFtIHtQb2ludH0gcHRBXG4gICAgICAgICAqIEBwYXJhbSB7UG9pbnR9IHB0QlxuICAgICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIHdoYXQgdG8gZG8gd2hlbiBhIGNvbm5lY3Rpb24gcG9pbnQgaXMgY2FsY3VsYXRlZFxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHBsb3RMaW5lKHB0QSwgcHRCLCBwbG90KSB7XG4gICAgICAgICAgICB2YXIgZHggPSBNYXRoLmFicyhwdEIueCAtIHB0QS54KTtcbiAgICAgICAgICAgIHZhciBzeCA9IHB0QS54IDwgcHRCLnggPyAxIDogLTE7XG4gICAgICAgICAgICB2YXIgZHkgPSAtTWF0aC5hYnMocHRCLnkgLSBwdEEueSk7XG4gICAgICAgICAgICB2YXIgc3kgPSBwdEEueSA8IHB0Qi55ID8gMSA6IC0xO1xuICAgICAgICAgICAgdmFyIGVyciA9IGR4ICsgZHksXG4gICAgICAgICAgICAgICAgZTIgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgcGxvdChwdEEueCwgcHRBLnkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHB0QS54ID09IHB0Qi54ICYmIHB0QS55ID09IHB0Qi55KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGUyID0gMiAqIGVycjtcblxuICAgICAgICAgICAgICAgIGlmIChlMiA+PSBkeSkge1xuICAgICAgICAgICAgICAgICAgICBlcnIgKz0gZHk7XG4gICAgICAgICAgICAgICAgICAgIHB0QS54ICs9IHN4O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChlMiA8PSBkeCkge1xuICAgICAgICAgICAgICAgICAgICBlcnIgKz0gZHg7XG4gICAgICAgICAgICAgICAgICAgIHB0QS55ICs9IHN5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBCcmVzZW5oYW07XG59KSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBCcmVzZW5oYW07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIEBjbGFzcyAgICAgICBNYWludGFpbk1heFxuICogQGRlc2NyaXB0aW9uIEtlZXBzIGNhbnZhcyBlbGVtZW50IGNlbnRlcmVkIGFuZCAod2l0aCBhc3BlY3QgcmF0aW8gaW50YWN0KSBpbiB0aGUgdmlld3BvcnRcbiAqL1xuXG52YXIgTWFpbnRhaW5NYXggPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1haW50YWluTWF4KCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTWFpbnRhaW5NYXgpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhNYWludGFpbk1heCwgbnVsbCwgW3tcbiAgICAgICAga2V5OiBcImZpdFwiLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0gIHtudW1iZXJ9IHdpZHRoIC0gdGhlIGVsZW1lbnQncyB3aWR0aFxuICAgICAgICAgKiBAcGFyYW0gIHtudW1iZXJ9IGhlaWdodCAtIHRoZSBlbGVtZW50J3MgaGVpZ2h0XG4gICAgICAgICAqIEByZXR1cm4ge29iamVjdH0gdGhlIG5ldyB0b3AsIGxlZnQsIHdpZHRoLCAmIGhlaWdodFxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGZpdCh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgICAgICB2YXIgTEFORFNDQVBFX1JBVElPID0gaGVpZ2h0IC8gd2lkdGg7XG4gICAgICAgICAgICB2YXIgUE9SVFJBSVRfUkFUSU8gPSB3aWR0aCAvIGhlaWdodDtcbiAgICAgICAgICAgIHZhciBJU19MQU5EU0NBUEUgPSBMQU5EU0NBUEVfUkFUSU8gPCBQT1JUUkFJVF9SQVRJTyA/IHRydWUgOiBmYWxzZTtcblxuICAgICAgICAgICAgdmFyIHdpbldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgICAgICB2YXIgd2luSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICAgICAgdmFyIHdpbkxhbmRzY2FwZVJhdGlvID0gd2luSGVpZ2h0IC8gd2luV2lkdGg7XG4gICAgICAgICAgICB2YXIgd2luUG9ydHJhaXRSYXRpbyA9IHdpbldpZHRoIC8gd2luSGVpZ2h0O1xuICAgICAgICAgICAgdmFyIG9mZnNldExlZnQgPSAwO1xuICAgICAgICAgICAgdmFyIG9mZnNldFRvcCA9IDA7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0V2lkdGggPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0SGVpZ2h0ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICBpZiAoSVNfTEFORFNDQVBFKSB7XG4gICAgICAgICAgICAgICAgaWYgKExBTkRTQ0FQRV9SQVRJTyA8IHdpbkxhbmRzY2FwZVJhdGlvKSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoID0gd2luV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IG9mZnNldFdpZHRoICogTEFORFNDQVBFX1JBVElPO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRUb3AgPSAod2luSGVpZ2h0IC0gb2Zmc2V0SGVpZ2h0KSAvIDI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gd2luSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHdpbkhlaWdodCAqIFBPUlRSQUlUX1JBVElPO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRMZWZ0ID0gKHdpbldpZHRoIC0gb2Zmc2V0V2lkdGgpIC8gMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChQT1JUUkFJVF9SQVRJTyA8IHdpblBvcnRyYWl0UmF0aW8pIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gd2luSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHdpbkhlaWdodCAqIFBPUlRSQUlUX1JBVElPO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRMZWZ0ID0gKHdpbldpZHRoIC0gb2Zmc2V0V2lkdGgpIC8gMjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHdpbldpZHRoO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSBvZmZzZXRXaWR0aCAqIExBTkRTQ0FQRV9SQVRJTztcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0VG9wID0gKHdpbkhlaWdodCAtIG9mZnNldEhlaWdodCkgLyAyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogb2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBvZmZzZXRIZWlnaHQsXG4gICAgICAgICAgICAgICAgbGVmdDogb2Zmc2V0TGVmdCxcbiAgICAgICAgICAgICAgICB0b3A6IG9mZnNldFRvcFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBNYWludGFpbk1heDtcbn0pKCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IE1haW50YWluTWF4OyIsImltcG9ydCBDb25maWcgZnJvbSAnLi4vLi4vLi4vLi4vZGlzdC9Db25maWcnXG5pbXBvcnQgVmlld3BvcnQgZnJvbSAnLi4vLi4vLi4vLi4vZGlzdC9WaWV3cG9ydCc7XG5pbXBvcnQgUG9pbnQgZnJvbSAnLi4vLi4vLi4vLi4vZGlzdC9Qb2ludCc7XG5pbXBvcnQgQmxvY2sgZnJvbSAnLi4vLi4vLi4vLi4vZGlzdC9kcmF3L0Jsb2NrJztcbmltcG9ydCBMaW5lIGZyb20gJy4uLy4uLy4uLy4uL2Rpc3QvZHJhdy9MaW5lJztcblxubGV0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcbmxldCB2aWV3cG9ydCA9IG5ldyBWaWV3cG9ydCh7Y29uZmlnfSk7XG5sZXQgbGluZSA9IG5ldyBMaW5lKHtjb25maWd9KTtcblxuQmxvY2suc2V0Q29udGV4dCh2aWV3cG9ydC5nZXRDb250ZXh0KCkpO1xuXG5saW5lLnNldFBvaW50cyhcbiAgICBuZXcgUG9pbnQoNCwgNCksIG5ldyBQb2ludCgxNiwgMzIpXG4pLnJlbmRlcigpO1xuIl19
