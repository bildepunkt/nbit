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
var line = new _Line2.default({ config: config });

_Block2.default.setContext(viewport.getContext());

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlcy9saW5lL3NyYy9tYWluLmpzIiwibmJpdC9Db25maWcuanMiLCJuYml0L1BvaW50LmpzIiwibmJpdC9WaWV3cG9ydC5qcyIsIm5iaXQvZHJhdy9CbG9jay5qcyIsIm5iaXQvZHJhdy9MaW5lLmpzIiwibmJpdC9saWIvQnJlc2VuaGFtLmpzIiwibmJpdC9saWIvTWFpbnRhaW5NYXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNNQSxJQUFJLE1BQU0sR0FBRyxzQkFBWSxDQUFDO0FBQzFCLElBQUksUUFBUSxHQUFHLHVCQUFhLEVBQUMsTUFBTSxFQUFOLE1BQU0sRUFBQyxDQUFDLENBQUM7QUFDdEMsSUFBSSxJQUFJLEdBQUcsbUJBQVMsRUFBQyxNQUFNLEVBQU4sTUFBTSxFQUFDLENBQUMsQ0FBQzs7QUFFOUIsZ0JBQU0sVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDOztBQUV4QyxJQUFJLENBQUMsU0FBUyxDQUNWLG9CQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxvQkFBVSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQ3JDLENBQUMsTUFBTSxFQUFFLENBQUM7OztBQ2RYLFlBQVksQ0FBQzs7QUFFYixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7QUFDekMsU0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDLENBQUM7O0FBRUgsU0FBUyxlQUFlLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRTtBQUFFLFFBQUksRUFBRSxRQUFRLFlBQVksV0FBVyxDQUFBLEFBQUMsRUFBRTtBQUFFLGNBQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztLQUFFO0NBQUU7Ozs7Ozs7OztBQUFBLEFBU3pKLElBQUksTUFBTTs7Ozs7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QUFHLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQSxHQUFJLENBQUMsQ0FBQztpQkFDN0MsTUFBTTtBQUNILCtCQUFXLEdBQUcsUUFBUSxDQUFDO0FBQ3ZCLGdDQUFZLEdBQUcsV0FBVyxHQUFHLGVBQWUsQ0FBQztBQUM3Qyw2QkFBUyxHQUFHLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQSxHQUFJLENBQUMsQ0FBQztpQkFDOUM7YUFDSjs7QUFFRCxtQkFBTztBQUNILHFCQUFLLEVBQUUsV0FBVztBQUNsQixzQkFBTSxFQUFFLFlBQVk7QUFDcEIsb0JBQUksRUFBRSxVQUFVO0FBQ2hCLG1CQUFHLEVBQUUsU0FBUzthQUNqQixDQUFDO1NBQ0w7S0FDSixDQUFDLENBQUMsQ0FBQzs7QUFFSixXQUFPLFdBQVcsQ0FBQztDQUN0QixDQUFBLEVBQUcsQ0FBQzs7QUFFTCxPQUFPLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uLy4uL25iaXQvQ29uZmlnJ1xuaW1wb3J0IFZpZXdwb3J0IGZyb20gJy4uLy4uLy4uL25iaXQvVmlld3BvcnQnO1xuaW1wb3J0IFBvaW50IGZyb20gJy4uLy4uLy4uL25iaXQvUG9pbnQnO1xuaW1wb3J0IEJsb2NrIGZyb20gJy4uLy4uLy4uL25iaXQvZHJhdy9CbG9jayc7XG5pbXBvcnQgTGluZSBmcm9tICcuLi8uLi8uLi9uYml0L2RyYXcvTGluZSc7XG5cbmxldCBjb25maWcgPSBuZXcgQ29uZmlnKCk7XG5sZXQgdmlld3BvcnQgPSBuZXcgVmlld3BvcnQoe2NvbmZpZ30pO1xubGV0IGxpbmUgPSBuZXcgTGluZSh7Y29uZmlnfSk7XG5cbkJsb2NrLnNldENvbnRleHQodmlld3BvcnQuZ2V0Q29udGV4dCgpKTtcblxubGluZS5zZXRQb2ludHMoXG4gICAgbmV3IFBvaW50KDQsIDQpLCBuZXcgUG9pbnQoMTYsIDMyKVxuKS5yZW5kZXIoKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIEBjbGFzcyAgICAgICBDb25maWdcbiAqIEBkZXNjcmlwdGlvbiBUaGUgY29uZmlndXJhdGlvbiBvYmplY3QgZm9yIG5CaXQuIFRoaXMgb2JqZWN0IGRvZXMgbm90IGNvbmZvcm0gdG9cbiAqICAgICAgICAgICAgICB0aGUgdW5kZXJzY29yZSBwcmVmaXhlZCBwcml2YXRlIHByb3BlcnR5IHBhcmFkaWdtLlxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5cbnZhciBDb25maWcgPVxuLyoqXG4gKiBbY29uc3RydWN0b3IgZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbdHlwZV19IFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gQ29uZmlnKG9wdGlvbnMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29uZmlnKTtcblxuICAgIHRoaXMuYmxvY2tTaXplID0gODtcbiAgICB0aGlzLnZpZXdwb3J0V2lkdGggPSAxMDA7XG4gICAgdGhpcy52aWV3cG9ydEhlaWdodCA9IDc1O1xuICAgIHRoaXMucGFyZW50RWwgPSBkb2N1bWVudC5ib2R5O1xuICAgIHRoaXMucGFyZW50RWxCZ0NvbG9yID0gJyMwMDAnO1xuICAgIHRoaXMuY2FudmFzQmdDb2xvciA9ICcjRkZGJztcblxuICAgIGZvciAodmFyIGtleSBpbiBvcHRpb25zKSB7XG4gICAgICAgIHRoaXNba2V5XSA9IG9wdGlvbnNba2V5XTtcbiAgICB9XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBDb25maWc7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogQGNsYXNzICAgICAgIFBvaW50XG4gKiBAZGVzY3JpcHRpb24gQ3JlYXRlIDJEIHBvaW50LiBUaGlzIG9iamVjdCBkb2VzIG5vdCBjb25mb3JtIHRvIHRoZSB1bmRlcnNjb3JlXG4gKiAgICAgICAgICAgICAgcHJlZml4ZWQgcHJpdmF0ZSBwcm9wZXJ0eSBwYXJhZGlnbS5cbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqL1xuXG52YXIgUG9pbnQgPVxuLyoqXG4gKiBpbml0aWFsaXplIGEgcG9pbnQgd2l0aCAwLDAgb3IgZ2l2ZW4gY29vcmRpbmF0ZXNcbiAqIEBwYXJhbSAge0ludGVnZXJ9IHhcbiAqIEBwYXJhbSAge0ludGVnZXJ9IHlcbiAqL1xuZnVuY3Rpb24gUG9pbnQoeCwgeSkge1xuICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUG9pbnQpO1xuXG4gIHRoaXMueCA9IHggfHwgMDtcbiAgdGhpcy55ID0geSB8fCAwO1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gUG9pbnQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9NYWludGFpbk1heCA9IHJlcXVpcmUoJy4vbGliL01haW50YWluTWF4Jyk7XG5cbnZhciBfTWFpbnRhaW5NYXgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfTWFpbnRhaW5NYXgpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIEBjbGFzcyAgICAgICBWaWV3cG9ydFxuICogQGRlc2NyaXB0aW9uIENyZWF0ZXMgYW5kIGhhbmRsZXMgdGhlIGNhbnZhcyBET00gZWxlbWVudFxuICogQGV4dGVuZHMgICAgIEdldFNldFxuICogQHJlcXVpcmVkICAgIE1haW50YWluTWF4XG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cblxudmFyIFZpZXdwb3J0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZGVwc1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBkZXBzLmNvbmZpZ1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbZGVwcy5kb2N1bWVudF1cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW2RlcHMud2luZG93XVxuICAgICAqL1xuXG4gICAgZnVuY3Rpb24gVmlld3BvcnQoZGVwcykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVmlld3BvcnQpO1xuXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGRlcHMuY29uZmlnO1xuICAgICAgICB0aGlzLl9kb2N1bWVudCA9IGRlcHMuZG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gICAgICAgIHRoaXMuX3dpbmRvdyA9IGRlcHMud2luZG93IHx8IHdpbmRvdztcblxuICAgICAgICB0aGlzLl9jYW52YXMgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5fY29udGV4dCA9IHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IHRoaXMuX2NvbmZpZy52aWV3cG9ydFdpZHRoICogdGhpcy5fY29uZmlnLmJsb2NrU2l6ZTtcbiAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IHRoaXMuX2NvbmZpZy52aWV3cG9ydEhlaWdodCAqIHRoaXMuX2NvbmZpZy5ibG9ja1NpemU7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLl9jb25maWcuY2FudmFzQmdDb2xvcjtcblxuICAgICAgICB0aGlzLl9jb25maWcucGFyZW50RWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5fY29uZmlnLnBhcmVudEVsQmdDb2xvcjtcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcmVudEVsLmFwcGVuZENoaWxkKHRoaXMuX2NhbnZhcyk7XG5cbiAgICAgICAgdGhpcy5fd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2hhbmRsZVJlc2l6ZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9oYW5kbGVSZXNpemUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBbX2hhbmRsZVJlc2l6ZSBkZXNjcmlwdGlvbl1cbiAgICAgKi9cblxuICAgIF9jcmVhdGVDbGFzcyhWaWV3cG9ydCwgW3tcbiAgICAgICAga2V5OiAnX2hhbmRsZVJlc2l6ZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlUmVzaXplKCkge1xuICAgICAgICAgICAgdmFyIGNvbmZpZyA9IHRoaXMuX2NvbmZpZztcblxuICAgICAgICAgICAgdmFyIF9NYWludGFpbk1heCRmaXQgPSBfTWFpbnRhaW5NYXgyLmRlZmF1bHQuZml0KGNvbmZpZy52aWV3cG9ydFdpZHRoICogY29uZmlnLmJsb2NrU2l6ZSwgY29uZmlnLnZpZXdwb3J0SGVpZ2h0ICogY29uZmlnLmJsb2NrU2l6ZSk7XG5cbiAgICAgICAgICAgIHZhciB0b3AgPSBfTWFpbnRhaW5NYXgkZml0LnRvcDtcbiAgICAgICAgICAgIHZhciBsZWZ0ID0gX01haW50YWluTWF4JGZpdC5sZWZ0O1xuICAgICAgICAgICAgdmFyIHdpZHRoID0gX01haW50YWluTWF4JGZpdC53aWR0aDtcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSBfTWFpbnRhaW5NYXgkZml0LmhlaWdodDtcblxuICAgICAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLnRvcCA9IE1hdGgucm91bmQodG9wKSArICdweCc7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUubGVmdCA9IE1hdGgucm91bmQobGVmdCkgKyAncHgnO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLndpZHRoID0gTWF0aC5yb3VuZCh3aWR0aCkgKyAncHgnO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLmhlaWdodCA9IE1hdGgucm91bmQoaGVpZ2h0KSArICdweCc7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgY2FudmFzJyAyZCBjb250ZXh0IG9iamVjdFxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0Q29udGV4dCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDb250ZXh0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gVmlld3BvcnQ7XG59KSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBWaWV3cG9ydDsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogQGNsYXNzICAgICAgIGRyYXcuQmxvY2tcbiAqIEBkZXNjcmlwdGlvbiAyRCBwb2ludCB3aXRoIGNvbG9yIGRhdGFcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqL1xuXG52YXIgQmxvY2sgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJsb2NrKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQmxvY2spO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhCbG9jaywgbnVsbCwgW3tcbiAgICAgICAga2V5OiBcIl9nZXRQaXhlbE9mZnNldFwiLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbZ2V0UG9pbnRPZmZzZXQgZGVzY3JpcHRpb25dXG4gICAgICAgICAqIEBwYXJhbSB7SW50ZWdlcn0geCAgICBUaGUgeSBjb29yZFxuICAgICAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IHkgICAgVGhlIHggY29vcmRcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfSBzaXplIFRoZSBibG9jayBzaXplXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gICAgICBUaGUgQmxvY2sgcG9pbnQgb2Zmc2V0XG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2dldFBpeGVsT2Zmc2V0KHgsIHksIHNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgeDogTWF0aC5yb3VuZCh4KSAqIHNpemUgLSBzaXplIC8gMixcbiAgICAgICAgICAgICAgICB5OiBNYXRoLnJvdW5kKHkpICogc2l6ZSAtIHNpemUgLyAyXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbmRlcnMgYSBibG9jayB0byB0aGUgY2FudmFzXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0IFRoZSBjYW52YXMnIDJkIGNvbnRleHQgb2JqZWN0XG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6IFwicmVuZGVyXCIsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoeCwgeSwgY29sb3IsIHNpemUpIHtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSB0aGlzLl9nZXRQaXhlbE9mZnNldCh4LCB5LCBzaXplKTtcblxuICAgICAgICAgICAgQmxvY2suX2NvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgQmxvY2suX2NvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgICAgICBCbG9jay5fY29udGV4dC5maWxsUmVjdChvZmZzZXQueCwgb2Zmc2V0LnksIHNpemUsIHNpemUpO1xuICAgICAgICAgICAgQmxvY2suX2NvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6IFwic2V0Q29udGV4dFwiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2V0Q29udGV4dChjb250ZXh0KSB7XG4gICAgICAgICAgICBCbG9jay5fY29udGV4dCA9IGNvbnRleHQ7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIEJsb2NrO1xufSkoKTtcblxuLyoqXG4gKiBTdGF0aWMgcHJvcGVydGllc1xuICovXG5cbmV4cG9ydHMuZGVmYXVsdCA9IEJsb2NrO1xuQmxvY2suX2NvbnRleHQgPSBudWxsOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfQmxvY2sgPSByZXF1aXJlKCcuL0Jsb2NrJyk7XG5cbnZhciBfQmxvY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQmxvY2spO1xuXG52YXIgX0JyZXNlbmhhbSA9IHJlcXVpcmUoJy4uL2xpYi9CcmVzZW5oYW0nKTtcblxudmFyIF9CcmVzZW5oYW0yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQnJlc2VuaGFtKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyoqXG4gKiBAY2xhc3MgICAgICAgZHJhdy5MaW5lXG4gKiBAZGVzY3JpcHRpb24gUGxvdHMgQmxvY2tzIGJldHdlZW4gKGFuZCBhdCkgdHdvIFBvaW50c1xuICogQHJlcXVpcmVzICAgIEJsb2NrXG4gKiBAcmVxdWlyZXMgICAgQnJlc2VuaGFtXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cblxudmFyIExpbmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICBkZXBzICAgICAgICAgSW5qZWN0ZWQgZGVwZW5kZW5jaWVzXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICBkZXBzLmNvbmZpZyAgQ29uZmlndXJhdGlvblxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgZGVwcy5jb250ZXh0IFRoZSBjYW52YXMnIDJkIGNvbnRleHRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gIFtjb2xvcl0gICAgICBJbml0aWFsIGNvbG9yXG4gICAgICovXG5cbiAgICBmdW5jdGlvbiBMaW5lKGRlcHMsIGNvbG9yKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBMaW5lKTtcblxuICAgICAgICB0aGlzLl9jb25maWcgPSBkZXBzLmNvbmZpZztcblxuICAgICAgICB0aGlzLl9wb2ludHMgPSBbXTtcbiAgICAgICAgdGhpcy5fY29sb3IgPSBjb2xvciB8fCAnIzAwMCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHdyYXBwZXIgbWV0aG9kIHRvIHBhc3MgdG8gQnJlc2VuaGFtLnBsb3RMaW5lXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtbdHlwZV19IHggW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAge1t0eXBlXX0geSBbZGVzY3JpcHRpb25dXG4gICAgICovXG5cbiAgICBfY3JlYXRlQ2xhc3MoTGluZSwgW3tcbiAgICAgICAga2V5OiAnX3Bsb3QnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX3Bsb3QoeCwgeSkge1xuICAgICAgICAgICAgX0Jsb2NrMi5kZWZhdWx0LnJlbmRlcih4LCB5LCB0aGlzLl9jb2xvciwgdGhpcy5fY29uZmlnLmJsb2NrU2l6ZSwgdGhpcy5fY29udGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IHRoZSBsaW5lJ3MgdHdvIHBvaW50c1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1t0eXBlXX0ga2V5IFtkZXNjcmlwdGlvbl1cbiAgICAgICAgICogQHBhcmFtIHtbdHlwZV19IHZhbCBbZGVzY3JpcHRpb25dXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzZXRQb2ludHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2V0UG9pbnRzKHB0QSwgcHRCKSB7XG4gICAgICAgICAgICB0aGlzLl9wb2ludHMgPSBbcHRBLCBwdEJdO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9wb2ludHNbMF0gJiYgdGhpcy5fcG9pbnRzWzFdKSB7XG4gICAgICAgICAgICAgICAgX0JyZXNlbmhhbTIuZGVmYXVsdC5wbG90TGluZSh0aGlzLl9wb2ludHNbMF0sIHRoaXMuX3BvaW50c1sxXSwgdGhpcy5fcGxvdC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdMaW5lIG11c3QgaGF2ZSB0d28gcG9pbnRzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gTGluZTtcbn0pKCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IExpbmU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIEBjbGFzcyAgICAgICBCcmVzZW5oYW1cbiAqIEBkZXNjcmlwdGlvbiBCcmVzZW5oYW0ncyBmb3JtdWxhZSBmb3IgY2FsY3VsYXRpbmcgYmxvY2tzIGZyb20gY3VydmVzLCBiZXR3ZWVuIHBvaW50cyBldGMuXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cblxudmFyIEJyZXNlbmhhbSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQnJlc2VuaGFtKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQnJlc2VuaGFtKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoQnJlc2VuaGFtLCBudWxsLCBbe1xuICAgICAgICBrZXk6IFwicGxvdExpbmVcIixcblxuICAgICAgICAvKipcbiAgICAgICAgICogcGxvdCB0aGUgY29ubmVjdGluZyBibG9ja3MgYmV0d2VlbiB0d28gcG9pbnRzXG4gICAgICAgICAqIEBwYXJhbSB7UG9pbnR9IHB0QVxuICAgICAgICAgKiBAcGFyYW0ge1BvaW50fSBwdEJcbiAgICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSB3aGF0IHRvIGRvIHdoZW4gYSBjb25uZWN0aW9uIHBvaW50IGlzIGNhbGN1bGF0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBwbG90TGluZShwdEEsIHB0QiwgcGxvdCkge1xuICAgICAgICAgICAgdmFyIGR4ID0gTWF0aC5hYnMocHRCLnggLSBwdEEueCk7XG4gICAgICAgICAgICB2YXIgc3ggPSBwdEEueCA8IHB0Qi54ID8gMSA6IC0xO1xuICAgICAgICAgICAgdmFyIGR5ID0gLU1hdGguYWJzKHB0Qi55IC0gcHRBLnkpO1xuICAgICAgICAgICAgdmFyIHN5ID0gcHRBLnkgPCBwdEIueSA/IDEgOiAtMTtcbiAgICAgICAgICAgIHZhciBlcnIgPSBkeCArIGR5LFxuICAgICAgICAgICAgICAgIGUyID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgIHBsb3QocHRBLngsIHB0QS55KTtcblxuICAgICAgICAgICAgICAgIGlmIChwdEEueCA9PSBwdEIueCAmJiBwdEEueSA9PSBwdEIueSkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlMiA9IDIgKiBlcnI7XG5cbiAgICAgICAgICAgICAgICBpZiAoZTIgPj0gZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyICs9IGR5O1xuICAgICAgICAgICAgICAgICAgICBwdEEueCArPSBzeDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZTIgPD0gZHgpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyICs9IGR4O1xuICAgICAgICAgICAgICAgICAgICBwdEEueSArPSBzeTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gQnJlc2VuaGFtO1xufSkoKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQnJlc2VuaGFtOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyoqXG4gKiBAY2xhc3MgICAgICAgTWFpbnRhaW5NYXhcbiAqIEBkZXNjcmlwdGlvbiBLZWVwcyBjYW52YXMgZWxlbWVudCBjZW50ZXJlZCBhbmQgKHdpdGggYXNwZWN0IHJhdGlvIGludGFjdCkgaW4gdGhlIHZpZXdwb3J0XG4gKi9cblxudmFyIE1haW50YWluTWF4ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNYWludGFpbk1heCgpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE1haW50YWluTWF4KTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoTWFpbnRhaW5NYXgsIG51bGwsIFt7XG4gICAgICAgIGtleTogXCJmaXRcIixcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtICB7bnVtYmVyfSB3aWR0aCAtIHRoZSBlbGVtZW50J3Mgd2lkdGhcbiAgICAgICAgICogQHBhcmFtICB7bnVtYmVyfSBoZWlnaHQgLSB0aGUgZWxlbWVudCdzIGhlaWdodFxuICAgICAgICAgKiBAcmV0dXJuIHtvYmplY3R9IHRoZSBuZXcgdG9wLCBsZWZ0LCB3aWR0aCwgJiBoZWlnaHRcbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBmaXQod2lkdGgsIGhlaWdodCkge1xuICAgICAgICAgICAgdmFyIExBTkRTQ0FQRV9SQVRJTyA9IGhlaWdodCAvIHdpZHRoO1xuICAgICAgICAgICAgdmFyIFBPUlRSQUlUX1JBVElPID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgICAgICAgICB2YXIgSVNfTEFORFNDQVBFID0gTEFORFNDQVBFX1JBVElPIDwgUE9SVFJBSVRfUkFUSU8gPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgICAgICAgIHZhciB3aW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICAgICAgdmFyIHdpbkhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgICAgIHZhciB3aW5MYW5kc2NhcGVSYXRpbyA9IHdpbkhlaWdodCAvIHdpbldpZHRoO1xuICAgICAgICAgICAgdmFyIHdpblBvcnRyYWl0UmF0aW8gPSB3aW5XaWR0aCAvIHdpbkhlaWdodDtcbiAgICAgICAgICAgIHZhciBvZmZzZXRMZWZ0ID0gMDtcbiAgICAgICAgICAgIHZhciBvZmZzZXRUb3AgPSAwO1xuICAgICAgICAgICAgdmFyIG9mZnNldFdpZHRoID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdmFyIG9mZnNldEhlaWdodCA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgaWYgKElTX0xBTkRTQ0FQRSkge1xuICAgICAgICAgICAgICAgIGlmIChMQU5EU0NBUEVfUkFUSU8gPCB3aW5MYW5kc2NhcGVSYXRpbykge1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHdpbldpZHRoO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSBvZmZzZXRXaWR0aCAqIExBTkRTQ0FQRV9SQVRJTztcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0VG9wID0gKHdpbkhlaWdodCAtIG9mZnNldEhlaWdodCkgLyAyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IHdpbkhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB3aW5IZWlnaHQgKiBQT1JUUkFJVF9SQVRJTztcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0TGVmdCA9ICh3aW5XaWR0aCAtIG9mZnNldFdpZHRoKSAvIDI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoUE9SVFJBSVRfUkFUSU8gPCB3aW5Qb3J0cmFpdFJhdGlvKSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IHdpbkhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB3aW5IZWlnaHQgKiBQT1JUUkFJVF9SQVRJTztcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0TGVmdCA9ICh3aW5XaWR0aCAtIG9mZnNldFdpZHRoKSAvIDI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB3aW5XaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gb2Zmc2V0V2lkdGggKiBMQU5EU0NBUEVfUkFUSU87XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFRvcCA9ICh3aW5IZWlnaHQgLSBvZmZzZXRIZWlnaHQpIC8gMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IG9mZnNldFdpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodDogb2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgICAgICAgIGxlZnQ6IG9mZnNldExlZnQsXG4gICAgICAgICAgICAgICAgdG9wOiBvZmZzZXRUb3BcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gTWFpbnRhaW5NYXg7XG59KSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBNYWludGFpbk1heDsiXX0=
