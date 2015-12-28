(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Config = require('../../../nbit/Config');

var _Config2 = _interopRequireDefault(_Config);

var _Viewport = require('../../../nbit/Viewport');

var _Viewport2 = _interopRequireDefault(_Viewport);

var _Point = require('../../../nbit/Point');

var _Point2 = _interopRequireDefault(_Point);

var _Block = require('../../../nbit/draw/Block');

var _Block2 = _interopRequireDefault(_Block);

var _Line = require('../../../nbit/draw/Line');

var _Line2 = _interopRequireDefault(_Line);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = new _Config2.default();
var viewport = new _Viewport2.default({ config: config });
var line = new _Line2.default();

_Block2.default.setContext(viewport.getContext()).setBlockSize(config.blockSize);

line.setPoints(new _Point2.default(4, 4), new _Point2.default(16, 32)).render();

},{"../../../nbit/Config":2,"../../../nbit/Point":3,"../../../nbit/Viewport":4,"../../../nbit/draw/Block":5,"../../../nbit/draw/Line":6}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"./lib/MaintainMax":8}],5:[function(require,module,exports){
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

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/**
 * @class       draw.Block
 * @description 2D point with color data. Used to render all nbit display objects
 * @author      Chris Peters
 */

var Block = (function () {
    function Block() {
        _classCallCheck(this, Block);
    }

    _createClass(Block, null, [{
        key: '_getPixelOffset',

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
        key: 'render',
        value: function render(x, y, color) {
            if (!Block._context || !Block._blockSize) {
                throw new Error('Block requires a context and size');
            }

            var offset = this._getPixelOffset(x, y, this._blockSize);

            Block._context.save();
            Block._context.fillStyle = color;
            Block._context.fillRect(offset.x, offset.y, this._blockSize, this._blockSize);
            Block._context.restore();
        }
    }, {
        key: 'setContext',
        value: function setContext(context) {
            Block._context = context;

            return this;
        }
    }, {
        key: 'setBlockSize',
        value: function setBlockSize(size) {
            Block._blockSize = size;

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
Block._blockSize = null;

},{}],6:[function(require,module,exports){
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

    function Line(color) {
        _classCallCheck(this, Line);

        this._points = [];
        this._color = color || '#000';
    }

    /**
     * The wrapper method to pass to Bresenham.plotLine
     *
     * @private
     * @param  {[type]} x [description]
     * @param  {[type]} y [description]
     */

    _createClass(Line, [{
        key: '_plot',
        value: function _plot(x, y) {
            _Block2.default.render(x, y, this._color);
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

},{"../lib/Bresenham":7,"./Block":5}],7:[function(require,module,exports){
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
 * @author      Chris Peters
 * @reference   http://rosettacode.org/wiki/Bitmap/Bresenham's_line_algorithm
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

        /**
         * [plotEllipse description]
         * @return {[type]} [description]
         */

    }, {
        key: "plotEllipse",
        value: function plotEllipse() {}
    }]);

    return Bresenham;
})();

exports.default = Bresenham;

},{}],8:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlcy9saW5lL3NyYy9tYWluLmpzIiwibmJpdC9Db25maWcuanMiLCJuYml0L1BvaW50LmpzIiwibmJpdC9WaWV3cG9ydC5qcyIsIm5iaXQvZHJhdy9CbG9jay5qcyIsIm5iaXQvZHJhdy9MaW5lLmpzIiwibmJpdC9saWIvQnJlc2VuaGFtLmpzIiwibmJpdC9saWIvTWFpbnRhaW5NYXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNNQSxJQUFJLE1BQU0sR0FBRyxzQkFBWSxDQUFDO0FBQzFCLElBQUksUUFBUSxHQUFHLHVCQUFhLEVBQUMsTUFBTSxFQUFOLE1BQU0sRUFBQyxDQUFDLENBQUM7QUFDdEMsSUFBSSxJQUFJLEdBQUcsb0JBQVUsQ0FBQzs7QUFFdEIsZ0JBQU0sVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBRXZFLElBQUksQ0FBQyxTQUFTLENBQ1Ysb0JBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLG9CQUFVLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FDckMsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7O0FDZFgsWUFBWSxDQUFDOztBQUViLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRTtBQUN6QyxTQUFLLEVBQUUsSUFBSTtDQUNkLENBQUMsQ0FBQzs7QUFFSCxTQUFTLGVBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFO0FBQUUsUUFBSSxFQUFFLFFBQVEsWUFBWSxXQUFXLENBQUEsQUFBQyxFQUFFO0FBQUUsY0FBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0tBQUU7Q0FBRTs7Ozs7Ozs7O0FBQUEsQUFTekosSUFBSSxNQUFN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QVksQ0FBQSxHQUFJLENBQUMsQ0FBQztpQkFDOUMsTUFBTTtBQUNILGdDQUFZLEdBQUcsU0FBUyxDQUFDO0FBQ3pCLCtCQUFXLEdBQUcsU0FBUyxHQUFHLGNBQWMsQ0FBQztBQUN6Qyw4QkFBVSxHQUFHLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQSxHQUFJLENBQUMsQ0FBQztpQkFDN0M7YUFDSixNQUFNO0FBQ0gsb0JBQUksY0FBYyxHQUFHLGdCQUFnQixFQUFFO0FBQ25DLGdDQUFZLEdBQUcsU0FBUyxDQUFDO0FBQ3pCLCtCQUFXLEdBQUcsU0FBUyxHQUFHLGNBQWMsQ0FBQztBQUN6Qyw4QkFBVSxHQUFHLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQSxHQUFJLENBQUMsQ0FBQztpQkFDN0MsTUFBTTtBQUNILCtCQUFXLEdBQUcsUUFBUSxDQUFDO0FBQ3ZCLGdDQUFZLEdBQUcsV0FBVyxHQUFHLGVBQWUsQ0FBQztBQUM3Qyw2QkFBUyxHQUFHLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQSxHQUFJLENBQUMsQ0FBQztpQkFDOUM7YUFDSjs7QUFFRCxtQkFBTztBQUNILHFCQUFLLEVBQUUsV0FBVztBQUNsQixzQkFBTSxFQUFFLFlBQVk7QUFDcEIsb0JBQUksRUFBRSxVQUFVO0FBQ2hCLG1CQUFHLEVBQUUsU0FBUzthQUNqQixDQUFDO1NBQ0w7S0FDSixDQUFDLENBQUMsQ0FBQzs7QUFFSixXQUFPLFdBQVcsQ0FBQztDQUN0QixDQUFBLEVBQUcsQ0FBQzs7QUFFTCxPQUFPLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uLy4uL25iaXQvQ29uZmlnJ1xuaW1wb3J0IFZpZXdwb3J0IGZyb20gJy4uLy4uLy4uL25iaXQvVmlld3BvcnQnO1xuaW1wb3J0IFBvaW50IGZyb20gJy4uLy4uLy4uL25iaXQvUG9pbnQnO1xuaW1wb3J0IEJsb2NrIGZyb20gJy4uLy4uLy4uL25iaXQvZHJhdy9CbG9jayc7XG5pbXBvcnQgTGluZSBmcm9tICcuLi8uLi8uLi9uYml0L2RyYXcvTGluZSc7XG5cbmxldCBjb25maWcgPSBuZXcgQ29uZmlnKCk7XG5sZXQgdmlld3BvcnQgPSBuZXcgVmlld3BvcnQoe2NvbmZpZ30pO1xubGV0IGxpbmUgPSBuZXcgTGluZSgpO1xuXG5CbG9jay5zZXRDb250ZXh0KHZpZXdwb3J0LmdldENvbnRleHQoKSkuc2V0QmxvY2tTaXplKGNvbmZpZy5ibG9ja1NpemUpO1xuXG5saW5lLnNldFBvaW50cyhcbiAgICBuZXcgUG9pbnQoNCwgNCksIG5ldyBQb2ludCgxNiwgMzIpXG4pLnJlbmRlcigpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogQGNsYXNzICAgICAgIENvbmZpZ1xuICogQGRlc2NyaXB0aW9uIFRoZSBjb25maWd1cmF0aW9uIG9iamVjdCBmb3IgbkJpdC4gVGhpcyBvYmplY3QgZG9lcyBub3QgY29uZm9ybSB0b1xuICogICAgICAgICAgICAgIHRoZSB1bmRlcnNjb3JlIHByZWZpeGVkIHByaXZhdGUgcHJvcGVydHkgcGFyYWRpZ20uXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cblxudmFyIENvbmZpZyA9XG4vKipcbiAqIFtjb25zdHJ1Y3RvciBkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBDb25maWcob3B0aW9ucykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb25maWcpO1xuXG4gICAgdGhpcy5ibG9ja1NpemUgPSA4O1xuICAgIHRoaXMudmlld3BvcnRXaWR0aCA9IDEwMDtcbiAgICB0aGlzLnZpZXdwb3J0SGVpZ2h0ID0gNzU7XG4gICAgdGhpcy5wYXJlbnRFbCA9IGRvY3VtZW50LmJvZHk7XG4gICAgdGhpcy5wYXJlbnRFbEJnQ29sb3IgPSAnIzAwMCc7XG4gICAgdGhpcy5jYW52YXNCZ0NvbG9yID0gJyNGRkYnO1xuXG4gICAgZm9yICh2YXIga2V5IGluIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpc1trZXldID0gb3B0aW9uc1trZXldO1xuICAgIH1cbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IENvbmZpZzsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyoqXG4gKiBAY2xhc3MgICAgICAgUG9pbnRcbiAqIEBkZXNjcmlwdGlvbiBDcmVhdGUgMkQgcG9pbnQuIFRoaXMgb2JqZWN0IGRvZXMgbm90IGNvbmZvcm0gdG8gdGhlIHVuZGVyc2NvcmVcbiAqICAgICAgICAgICAgICBwcmVmaXhlZCBwcml2YXRlIHByb3BlcnR5IHBhcmFkaWdtLlxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5cbnZhciBQb2ludCA9XG4vKipcbiAqIGluaXRpYWxpemUgYSBwb2ludCB3aXRoIDAsMCBvciBnaXZlbiBjb29yZGluYXRlc1xuICogQHBhcmFtICB7SW50ZWdlcn0geFxuICogQHBhcmFtICB7SW50ZWdlcn0geVxuICovXG5mdW5jdGlvbiBQb2ludCh4LCB5KSB7XG4gIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQb2ludCk7XG5cbiAgdGhpcy54ID0geCB8fCAwO1xuICB0aGlzLnkgPSB5IHx8IDA7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBQb2ludDsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX01haW50YWluTWF4ID0gcmVxdWlyZSgnLi9saWIvTWFpbnRhaW5NYXgnKTtcblxudmFyIF9NYWludGFpbk1heDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9NYWludGFpbk1heCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogQGNsYXNzICAgICAgIFZpZXdwb3J0XG4gKiBAZGVzY3JpcHRpb24gQ3JlYXRlcyBhbmQgaGFuZGxlcyB0aGUgY2FudmFzIERPTSBlbGVtZW50XG4gKiBAZXh0ZW5kcyAgICAgR2V0U2V0XG4gKiBAcmVxdWlyZWQgICAgTWFpbnRhaW5NYXhcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqL1xuXG52YXIgVmlld3BvcnQgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBkZXBzXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGRlcHMuY29uZmlnXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtkZXBzLmRvY3VtZW50XVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbZGVwcy53aW5kb3ddXG4gICAgICovXG5cbiAgICBmdW5jdGlvbiBWaWV3cG9ydChkZXBzKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBWaWV3cG9ydCk7XG5cbiAgICAgICAgdGhpcy5fY29uZmlnID0gZGVwcy5jb25maWc7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50ID0gZGVwcy5kb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgICAgICAgdGhpcy5fd2luZG93ID0gZGVwcy53aW5kb3cgfHwgd2luZG93O1xuXG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLl9jb250ZXh0ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gdGhpcy5fY29uZmlnLnZpZXdwb3J0V2lkdGggKiB0aGlzLl9jb25maWcuYmxvY2tTaXplO1xuICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gdGhpcy5fY29uZmlnLnZpZXdwb3J0SGVpZ2h0ICogdGhpcy5fY29uZmlnLmJsb2NrU2l6ZTtcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuX2NvbmZpZy5jYW52YXNCZ0NvbG9yO1xuXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJlbnRFbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLl9jb25maWcucGFyZW50RWxCZ0NvbG9yO1xuICAgICAgICB0aGlzLl9jb25maWcucGFyZW50RWwuYXBwZW5kQ2hpbGQodGhpcy5fY2FudmFzKTtcblxuICAgICAgICB0aGlzLl93aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5faGFuZGxlUmVzaXplLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuX2hhbmRsZVJlc2l6ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFtfaGFuZGxlUmVzaXplIGRlc2NyaXB0aW9uXVxuICAgICAqL1xuXG4gICAgX2NyZWF0ZUNsYXNzKFZpZXdwb3J0LCBbe1xuICAgICAgICBrZXk6ICdfaGFuZGxlUmVzaXplJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVSZXNpemUoKSB7XG4gICAgICAgICAgICB2YXIgY29uZmlnID0gdGhpcy5fY29uZmlnO1xuXG4gICAgICAgICAgICB2YXIgX01haW50YWluTWF4JGZpdCA9IF9NYWludGFpbk1heDIuZGVmYXVsdC5maXQoY29uZmlnLnZpZXdwb3J0V2lkdGggKiBjb25maWcuYmxvY2tTaXplLCBjb25maWcudmlld3BvcnRIZWlnaHQgKiBjb25maWcuYmxvY2tTaXplKTtcblxuICAgICAgICAgICAgdmFyIHRvcCA9IF9NYWludGFpbk1heCRmaXQudG9wO1xuICAgICAgICAgICAgdmFyIGxlZnQgPSBfTWFpbnRhaW5NYXgkZml0LmxlZnQ7XG4gICAgICAgICAgICB2YXIgd2lkdGggPSBfTWFpbnRhaW5NYXgkZml0LndpZHRoO1xuICAgICAgICAgICAgdmFyIGhlaWdodCA9IF9NYWludGFpbk1heCRmaXQuaGVpZ2h0O1xuXG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUudG9wID0gTWF0aC5yb3VuZCh0b3ApICsgJ3B4JztcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5sZWZ0ID0gTWF0aC5yb3VuZChsZWZ0KSArICdweCc7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUud2lkdGggPSBNYXRoLnJvdW5kKHdpZHRoKSArICdweCc7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUuaGVpZ2h0ID0gTWF0aC5yb3VuZChoZWlnaHQpICsgJ3B4JztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBjYW52YXMnIDJkIGNvbnRleHQgb2JqZWN0XG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRDb250ZXh0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldENvbnRleHQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBWaWV3cG9ydDtcbn0pKCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFZpZXdwb3J0OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogQGNsYXNzICAgICAgIGRyYXcuQmxvY2tcbiAqIEBkZXNjcmlwdGlvbiAyRCBwb2ludCB3aXRoIGNvbG9yIGRhdGEuIFVzZWQgdG8gcmVuZGVyIGFsbCBuYml0IGRpc3BsYXkgb2JqZWN0c1xuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5cbnZhciBCbG9jayA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmxvY2soKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCbG9jayk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKEJsb2NrLCBudWxsLCBbe1xuICAgICAgICBrZXk6ICdfZ2V0UGl4ZWxPZmZzZXQnLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbZ2V0UG9pbnRPZmZzZXQgZGVzY3JpcHRpb25dXG4gICAgICAgICAqIEBwYXJhbSB7SW50ZWdlcn0geCAgICBUaGUgeSBjb29yZFxuICAgICAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IHkgICAgVGhlIHggY29vcmRcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfSBzaXplIFRoZSBibG9jayBzaXplXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gICAgICBUaGUgQmxvY2sgcG9pbnQgb2Zmc2V0XG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2dldFBpeGVsT2Zmc2V0KHgsIHksIHNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgeDogTWF0aC5yb3VuZCh4KSAqIHNpemUgLSBzaXplIC8gMixcbiAgICAgICAgICAgICAgICB5OiBNYXRoLnJvdW5kKHkpICogc2l6ZSAtIHNpemUgLyAyXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbmRlcnMgYSBibG9jayB0byB0aGUgY2FudmFzXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0IFRoZSBjYW52YXMnIDJkIGNvbnRleHQgb2JqZWN0XG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKHgsIHksIGNvbG9yKSB7XG4gICAgICAgICAgICBpZiAoIUJsb2NrLl9jb250ZXh0IHx8ICFCbG9jay5fYmxvY2tTaXplKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCbG9jayByZXF1aXJlcyBhIGNvbnRleHQgYW5kIHNpemUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG9mZnNldCA9IHRoaXMuX2dldFBpeGVsT2Zmc2V0KHgsIHksIHRoaXMuX2Jsb2NrU2l6ZSk7XG5cbiAgICAgICAgICAgIEJsb2NrLl9jb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgIEJsb2NrLl9jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICAgICAgQmxvY2suX2NvbnRleHQuZmlsbFJlY3Qob2Zmc2V0LngsIG9mZnNldC55LCB0aGlzLl9ibG9ja1NpemUsIHRoaXMuX2Jsb2NrU2l6ZSk7XG4gICAgICAgICAgICBCbG9jay5fY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3NldENvbnRleHQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2V0Q29udGV4dChjb250ZXh0KSB7XG4gICAgICAgICAgICBCbG9jay5fY29udGV4dCA9IGNvbnRleHQ7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzZXRCbG9ja1NpemUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2V0QmxvY2tTaXplKHNpemUpIHtcbiAgICAgICAgICAgIEJsb2NrLl9ibG9ja1NpemUgPSBzaXplO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBCbG9jaztcbn0pKCk7XG5cbi8qKlxuICogU3RhdGljIHByb3BlcnRpZXNcbiAqL1xuXG5leHBvcnRzLmRlZmF1bHQgPSBCbG9jaztcbkJsb2NrLl9jb250ZXh0ID0gbnVsbDtcbkJsb2NrLl9ibG9ja1NpemUgPSBudWxsOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfQmxvY2sgPSByZXF1aXJlKCcuL0Jsb2NrJyk7XG5cbnZhciBfQmxvY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQmxvY2spO1xuXG52YXIgX0JyZXNlbmhhbSA9IHJlcXVpcmUoJy4uL2xpYi9CcmVzZW5oYW0nKTtcblxudmFyIF9CcmVzZW5oYW0yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQnJlc2VuaGFtKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyoqXG4gKiBAY2xhc3MgICAgICAgZHJhdy5MaW5lXG4gKiBAZGVzY3JpcHRpb24gUGxvdHMgQmxvY2tzIGJldHdlZW4gKGFuZCBhdCkgdHdvIFBvaW50c1xuICogQHJlcXVpcmVzICAgIEJsb2NrXG4gKiBAcmVxdWlyZXMgICAgQnJlc2VuaGFtXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cblxudmFyIExpbmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICBkZXBzICAgICAgICAgSW5qZWN0ZWQgZGVwZW5kZW5jaWVzXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICBkZXBzLmNvbmZpZyAgQ29uZmlndXJhdGlvblxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgZGVwcy5jb250ZXh0IFRoZSBjYW52YXMnIDJkIGNvbnRleHRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gIFtjb2xvcl0gICAgICBJbml0aWFsIGNvbG9yXG4gICAgICovXG5cbiAgICBmdW5jdGlvbiBMaW5lKGNvbG9yKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBMaW5lKTtcblxuICAgICAgICB0aGlzLl9wb2ludHMgPSBbXTtcbiAgICAgICAgdGhpcy5fY29sb3IgPSBjb2xvciB8fCAnIzAwMCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHdyYXBwZXIgbWV0aG9kIHRvIHBhc3MgdG8gQnJlc2VuaGFtLnBsb3RMaW5lXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSAge1t0eXBlXX0geCBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICB7W3R5cGVdfSB5IFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cblxuICAgIF9jcmVhdGVDbGFzcyhMaW5lLCBbe1xuICAgICAgICBrZXk6ICdfcGxvdCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfcGxvdCh4LCB5KSB7XG4gICAgICAgICAgICBfQmxvY2syLmRlZmF1bHQucmVuZGVyKHgsIHksIHRoaXMuX2NvbG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgdGhlIGxpbmUncyB0d28gcG9pbnRzXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7W3R5cGVdfSBrZXkgW2Rlc2NyaXB0aW9uXVxuICAgICAgICAgKiBAcGFyYW0ge1t0eXBlXX0gdmFsIFtkZXNjcmlwdGlvbl1cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3NldFBvaW50cycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRQb2ludHMocHRBLCBwdEIpIHtcbiAgICAgICAgICAgIHRoaXMuX3BvaW50cyA9IFtwdEEsIHB0Ql07XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3BvaW50c1swXSAmJiB0aGlzLl9wb2ludHNbMV0pIHtcbiAgICAgICAgICAgICAgICBfQnJlc2VuaGFtMi5kZWZhdWx0LnBsb3RMaW5lKHRoaXMuX3BvaW50c1swXSwgdGhpcy5fcG9pbnRzWzFdLCB0aGlzLl9wbG90LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xpbmUgbXVzdCBoYXZlIHR3byBwb2ludHMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBMaW5lO1xufSkoKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gTGluZTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogQGNsYXNzICAgICAgIEJyZXNlbmhhbVxuICogQGRlc2NyaXB0aW9uIEJyZXNlbmhhbSdzIGZvcm11bGFlIGZvciBjYWxjdWxhdGluZyBibG9ja3MgZnJvbSBjdXJ2ZXMsIGJldHdlZW4gcG9pbnRzIGV0Yy5cbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqIEByZWZlcmVuY2UgICBodHRwOi8vcm9zZXR0YWNvZGUub3JnL3dpa2kvQml0bWFwL0JyZXNlbmhhbSdzX2xpbmVfYWxnb3JpdGhtXG4gKi9cblxudmFyIEJyZXNlbmhhbSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQnJlc2VuaGFtKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQnJlc2VuaGFtKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoQnJlc2VuaGFtLCBudWxsLCBbe1xuICAgICAgICBrZXk6IFwicGxvdExpbmVcIixcblxuICAgICAgICAvKipcbiAgICAgICAgICogcGxvdCB0aGUgY29ubmVjdGluZyBibG9ja3MgYmV0d2VlbiB0d28gcG9pbnRzXG4gICAgICAgICAqIEBwYXJhbSB7UG9pbnR9IHB0QVxuICAgICAgICAgKiBAcGFyYW0ge1BvaW50fSBwdEJcbiAgICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSB3aGF0IHRvIGRvIHdoZW4gYSBjb25uZWN0aW9uIHBvaW50IGlzIGNhbGN1bGF0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBwbG90TGluZShwdEEsIHB0QiwgcGxvdCkge1xuICAgICAgICAgICAgdmFyIGR4ID0gTWF0aC5hYnMocHRCLnggLSBwdEEueCk7XG4gICAgICAgICAgICB2YXIgc3ggPSBwdEEueCA8IHB0Qi54ID8gMSA6IC0xO1xuICAgICAgICAgICAgdmFyIGR5ID0gLU1hdGguYWJzKHB0Qi55IC0gcHRBLnkpO1xuICAgICAgICAgICAgdmFyIHN5ID0gcHRBLnkgPCBwdEIueSA/IDEgOiAtMTtcbiAgICAgICAgICAgIHZhciBlcnIgPSBkeCArIGR5LFxuICAgICAgICAgICAgICAgIGUyID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgIHBsb3QocHRBLngsIHB0QS55KTtcblxuICAgICAgICAgICAgICAgIGlmIChwdEEueCA9PSBwdEIueCAmJiBwdEEueSA9PSBwdEIueSkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlMiA9IDIgKiBlcnI7XG5cbiAgICAgICAgICAgICAgICBpZiAoZTIgPj0gZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyICs9IGR5O1xuICAgICAgICAgICAgICAgICAgICBwdEEueCArPSBzeDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZTIgPD0gZHgpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyICs9IGR4O1xuICAgICAgICAgICAgICAgICAgICBwdEEueSArPSBzeTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogW3Bsb3RFbGxpcHNlIGRlc2NyaXB0aW9uXVxuICAgICAgICAgKiBAcmV0dXJuIHtbdHlwZV19IFtkZXNjcmlwdGlvbl1cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogXCJwbG90RWxsaXBzZVwiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcGxvdEVsbGlwc2UoKSB7fVxuICAgIH1dKTtcblxuICAgIHJldHVybiBCcmVzZW5oYW07XG59KSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBCcmVzZW5oYW07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIEBjbGFzcyAgICAgICBNYWludGFpbk1heFxuICogQGRlc2NyaXB0aW9uIEtlZXBzIGNhbnZhcyBlbGVtZW50IGNlbnRlcmVkIGFuZCAod2l0aCBhc3BlY3QgcmF0aW8gaW50YWN0KSBpbiB0aGUgdmlld3BvcnRcbiAqL1xuXG52YXIgTWFpbnRhaW5NYXggPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1haW50YWluTWF4KCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTWFpbnRhaW5NYXgpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhNYWludGFpbk1heCwgbnVsbCwgW3tcbiAgICAgICAga2V5OiBcImZpdFwiLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0gIHtudW1iZXJ9IHdpZHRoIC0gdGhlIGVsZW1lbnQncyB3aWR0aFxuICAgICAgICAgKiBAcGFyYW0gIHtudW1iZXJ9IGhlaWdodCAtIHRoZSBlbGVtZW50J3MgaGVpZ2h0XG4gICAgICAgICAqIEByZXR1cm4ge29iamVjdH0gdGhlIG5ldyB0b3AsIGxlZnQsIHdpZHRoLCAmIGhlaWdodFxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGZpdCh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgICAgICB2YXIgTEFORFNDQVBFX1JBVElPID0gaGVpZ2h0IC8gd2lkdGg7XG4gICAgICAgICAgICB2YXIgUE9SVFJBSVRfUkFUSU8gPSB3aWR0aCAvIGhlaWdodDtcbiAgICAgICAgICAgIHZhciBJU19MQU5EU0NBUEUgPSBMQU5EU0NBUEVfUkFUSU8gPCBQT1JUUkFJVF9SQVRJTyA/IHRydWUgOiBmYWxzZTtcblxuICAgICAgICAgICAgdmFyIHdpbldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgICAgICB2YXIgd2luSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICAgICAgdmFyIHdpbkxhbmRzY2FwZVJhdGlvID0gd2luSGVpZ2h0IC8gd2luV2lkdGg7XG4gICAgICAgICAgICB2YXIgd2luUG9ydHJhaXRSYXRpbyA9IHdpbldpZHRoIC8gd2luSGVpZ2h0O1xuICAgICAgICAgICAgdmFyIG9mZnNldExlZnQgPSAwO1xuICAgICAgICAgICAgdmFyIG9mZnNldFRvcCA9IDA7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0V2lkdGggPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0SGVpZ2h0ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICBpZiAoSVNfTEFORFNDQVBFKSB7XG4gICAgICAgICAgICAgICAgaWYgKExBTkRTQ0FQRV9SQVRJTyA8IHdpbkxhbmRzY2FwZVJhdGlvKSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoID0gd2luV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IG9mZnNldFdpZHRoICogTEFORFNDQVBFX1JBVElPO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRUb3AgPSAod2luSGVpZ2h0IC0gb2Zmc2V0SGVpZ2h0KSAvIDI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gd2luSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHdpbkhlaWdodCAqIFBPUlRSQUlUX1JBVElPO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRMZWZ0ID0gKHdpbldpZHRoIC0gb2Zmc2V0V2lkdGgpIC8gMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChQT1JUUkFJVF9SQVRJTyA8IHdpblBvcnRyYWl0UmF0aW8pIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gd2luSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHdpbkhlaWdodCAqIFBPUlRSQUlUX1JBVElPO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRMZWZ0ID0gKHdpbldpZHRoIC0gb2Zmc2V0V2lkdGgpIC8gMjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHdpbldpZHRoO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSBvZmZzZXRXaWR0aCAqIExBTkRTQ0FQRV9SQVRJTztcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0VG9wID0gKHdpbkhlaWdodCAtIG9mZnNldEhlaWdodCkgLyAyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogb2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBvZmZzZXRIZWlnaHQsXG4gICAgICAgICAgICAgICAgbGVmdDogb2Zmc2V0TGVmdCxcbiAgICAgICAgICAgICAgICB0b3A6IG9mZnNldFRvcFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBNYWludGFpbk1heDtcbn0pKCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IE1haW50YWluTWF4OyJdfQ==
