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

var _Bitmap = require('../../../nbit/draw/Bitmap');

var _Bitmap2 = _interopRequireDefault(_Bitmap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = new _Config2.default();
var viewport = new _Viewport2.default({ config: config });
var bitmap = new _Bitmap2.default();

_Block2.default.setContext(viewport.getContext()).setBlockSize(config.blockSize);

bitmap.setMap([['#C33', '#C33', '#C33'], ['#C33', '#3CC', '#C33'], ['#C33', '#C33', '#C33']]).render();

},{"../../../nbit/Config":2,"../../../nbit/Point":3,"../../../nbit/Viewport":4,"../../../nbit/draw/Bitmap":5,"../../../nbit/draw/Block":6}],2:[function(require,module,exports){
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

},{"./lib/MaintainMax":7}],5:[function(require,module,exports){
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

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/**
 *
 */

var Bitmap = (function () {
    function Bitmap() {
        _classCallCheck(this, Bitmap);

        this._map = null;
    }

    _createClass(Bitmap, [{
        key: '_getMapOffset',
        value: function _getMapOffset(map) {
            var leny = map.length;
            var lenx = map[0].length;

            return {
                x: lenx / 2,
                y: leny / 2
            };
        }
    }, {
        key: 'setMap',
        value: function setMap(map) {
            this._map = map;

            return this;
        }
    }, {
        key: 'render',
        value: function render() {
            var offset = this._getMapOffset(this._map),
                mapy = undefined,
                mapx = undefined;

            for (var y = 0, leny = this._map.length; y < leny; y++) {
                mapy = this._map[y];

                for (var x = 0, lenx = mapy.length; x < lenx; x++) {
                    mapx = mapy[x];

                    _Block2.default.render(x - offset.x, y - offset.y, mapx);
                }
            }
        }
    }]);

    return Bitmap;
})();

exports.default = Bitmap;

},{"./Block":6}],6:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlcy9iaXRtYXAvc3JjL21haW4uanMiLCJuYml0L0NvbmZpZy5qcyIsIm5iaXQvUG9pbnQuanMiLCJuYml0L1ZpZXdwb3J0LmpzIiwibmJpdC9kcmF3L0JpdG1hcC5qcyIsIm5iaXQvZHJhdy9CbG9jay5qcyIsIm5iaXQvbGliL01haW50YWluTWF4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTUEsSUFBSSxNQUFNLEdBQUcsc0JBQVksQ0FBQztBQUMxQixJQUFJLFFBQVEsR0FBRyx1QkFBYSxFQUFDLE1BQU0sRUFBTixNQUFNLEVBQUMsQ0FBQyxDQUFDO0FBQ3RDLElBQUksTUFBTSxHQUFHLHNCQUFZLENBQUM7O0FBRTFCLGdCQUNLLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FDakMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUNWLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFDeEIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUN4QixDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQzNCLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7O0FDbEJaLFlBQVksQ0FBQzs7QUFFYixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7QUFDekMsU0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDLENBQUM7O0FBRUgsU0FBUyxlQUFlLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRTtBQUFFLFFBQUksRUFBRSxRQUFRLFlBQVksV0FBVyxDQUFBLEFBQUMsRUFBRTtBQUFFLGNBQU0sSUFBSSxTQUFTLENBQUMsbUNB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LEVBQUU7QUFDbkMsZ0NBQVksR0FBRyxTQUFTLENBQUM7QUFDekIsK0JBQVcsR0FBRyxTQUFTLEdBQUcsY0FBYyxDQUFDO0FBQ3pDLDhCQUFVLEdBQUcsQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFBLEdBQUksQ0FBQyxDQUFDO2lCQUM3QyxNQUFNO0FBQ0gsK0JBQVcsR0FBRyxRQUFRLENBQUM7QUFDdkIsZ0NBQVksR0FBRyxXQUFXLEdBQUcsZUFBZSxDQUFDO0FBQzdDLDZCQUFTLEdBQUcsQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFBLEdBQUksQ0FBQyxDQUFDO2lCQUM5QzthQUNKOztBQUVELG1CQUFPO0FBQ0gscUJBQUssRUFBRSxXQUFXO0FBQ2xCLHNCQUFNLEVBQUUsWUFBWTtBQUNwQixvQkFBSSxFQUFFLFVBQVU7QUFDaEIsbUJBQUcsRUFBRSxTQUFTO2FBQ2pCLENBQUM7U0FDTDtLQUNKLENBQUMsQ0FBQyxDQUFDOztBQUVKLFdBQU8sV0FBVyxDQUFDO0NBQ3RCLENBQUEsRUFBRyxDQUFDOztBQUVMLE9BQU8sQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBDb25maWcgZnJvbSAnLi4vLi4vLi4vbmJpdC9Db25maWcnXG5pbXBvcnQgVmlld3BvcnQgZnJvbSAnLi4vLi4vLi4vbmJpdC9WaWV3cG9ydCc7XG5pbXBvcnQgUG9pbnQgZnJvbSAnLi4vLi4vLi4vbmJpdC9Qb2ludCc7XG5pbXBvcnQgQmxvY2sgZnJvbSAnLi4vLi4vLi4vbmJpdC9kcmF3L0Jsb2NrJztcbmltcG9ydCBCaXRtYXAgZnJvbSAnLi4vLi4vLi4vbmJpdC9kcmF3L0JpdG1hcCc7XG5cbmxldCBjb25maWcgPSBuZXcgQ29uZmlnKCk7XG5sZXQgdmlld3BvcnQgPSBuZXcgVmlld3BvcnQoe2NvbmZpZ30pO1xubGV0IGJpdG1hcCA9IG5ldyBCaXRtYXAoKTtcblxuQmxvY2tcbiAgICAuc2V0Q29udGV4dCh2aWV3cG9ydC5nZXRDb250ZXh0KCkpXG4gICAgLnNldEJsb2NrU2l6ZShjb25maWcuYmxvY2tTaXplKTtcblxuYml0bWFwLnNldE1hcChbXG4gICAgWycjQzMzJywgJyNDMzMnLCAnI0MzMyddLFxuICAgIFsnI0MzMycsICcjM0NDJywgJyNDMzMnXSxcbiAgICBbJyNDMzMnLCAnI0MzMycsICcjQzMzJ11cbl0pLnJlbmRlcigpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogQGNsYXNzICAgICAgIENvbmZpZ1xuICogQGRlc2NyaXB0aW9uIFRoZSBjb25maWd1cmF0aW9uIG9iamVjdCBmb3IgbkJpdC4gVGhpcyBvYmplY3QgZG9lcyBub3QgY29uZm9ybSB0b1xuICogICAgICAgICAgICAgIHRoZSB1bmRlcnNjb3JlIHByZWZpeGVkIHByaXZhdGUgcHJvcGVydHkgcGFyYWRpZ20uXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cblxudmFyIENvbmZpZyA9XG4vKipcbiAqIFtjb25zdHJ1Y3RvciBkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBDb25maWcob3B0aW9ucykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb25maWcpO1xuXG4gICAgdGhpcy5ibG9ja1NpemUgPSA4O1xuICAgIHRoaXMudmlld3BvcnRXaWR0aCA9IDEwMDtcbiAgICB0aGlzLnZpZXdwb3J0SGVpZ2h0ID0gNzU7XG4gICAgdGhpcy5wYXJlbnRFbCA9IGRvY3VtZW50LmJvZHk7XG4gICAgdGhpcy5wYXJlbnRFbEJnQ29sb3IgPSAnIzAwMCc7XG4gICAgdGhpcy5jYW52YXNCZ0NvbG9yID0gJyNGRkYnO1xuXG4gICAgZm9yICh2YXIga2V5IGluIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpc1trZXldID0gb3B0aW9uc1trZXldO1xuICAgIH1cbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IENvbmZpZzsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyoqXG4gKiBAY2xhc3MgICAgICAgUG9pbnRcbiAqIEBkZXNjcmlwdGlvbiBDcmVhdGUgMkQgcG9pbnQuIFRoaXMgb2JqZWN0IGRvZXMgbm90IGNvbmZvcm0gdG8gdGhlIHVuZGVyc2NvcmVcbiAqICAgICAgICAgICAgICBwcmVmaXhlZCBwcml2YXRlIHByb3BlcnR5IHBhcmFkaWdtLlxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5cbnZhciBQb2ludCA9XG4vKipcbiAqIGluaXRpYWxpemUgYSBwb2ludCB3aXRoIDAsMCBvciBnaXZlbiBjb29yZGluYXRlc1xuICogQHBhcmFtICB7SW50ZWdlcn0geFxuICogQHBhcmFtICB7SW50ZWdlcn0geVxuICovXG5mdW5jdGlvbiBQb2ludCh4LCB5KSB7XG4gIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQb2ludCk7XG5cbiAgdGhpcy54ID0geCB8fCAwO1xuICB0aGlzLnkgPSB5IHx8IDA7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBQb2ludDsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX01haW50YWluTWF4ID0gcmVxdWlyZSgnLi9saWIvTWFpbnRhaW5NYXgnKTtcblxudmFyIF9NYWludGFpbk1heDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9NYWludGFpbk1heCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogQGNsYXNzICAgICAgIFZpZXdwb3J0XG4gKiBAZGVzY3JpcHRpb24gQ3JlYXRlcyBhbmQgaGFuZGxlcyB0aGUgY2FudmFzIERPTSBlbGVtZW50XG4gKiBAZXh0ZW5kcyAgICAgR2V0U2V0XG4gKiBAcmVxdWlyZWQgICAgTWFpbnRhaW5NYXhcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqL1xuXG52YXIgVmlld3BvcnQgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBkZXBzXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGRlcHMuY29uZmlnXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtkZXBzLmRvY3VtZW50XVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbZGVwcy53aW5kb3ddXG4gICAgICovXG5cbiAgICBmdW5jdGlvbiBWaWV3cG9ydChkZXBzKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBWaWV3cG9ydCk7XG5cbiAgICAgICAgdGhpcy5fY29uZmlnID0gZGVwcy5jb25maWc7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50ID0gZGVwcy5kb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgICAgICAgdGhpcy5fd2luZG93ID0gZGVwcy53aW5kb3cgfHwgd2luZG93O1xuXG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLl9jb250ZXh0ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gdGhpcy5fY29uZmlnLnZpZXdwb3J0V2lkdGggKiB0aGlzLl9jb25maWcuYmxvY2tTaXplO1xuICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gdGhpcy5fY29uZmlnLnZpZXdwb3J0SGVpZ2h0ICogdGhpcy5fY29uZmlnLmJsb2NrU2l6ZTtcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuX2NvbmZpZy5jYW52YXNCZ0NvbG9yO1xuXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJlbnRFbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLl9jb25maWcucGFyZW50RWxCZ0NvbG9yO1xuICAgICAgICB0aGlzLl9jb25maWcucGFyZW50RWwuYXBwZW5kQ2hpbGQodGhpcy5fY2FudmFzKTtcblxuICAgICAgICB0aGlzLl93aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5faGFuZGxlUmVzaXplLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuX2hhbmRsZVJlc2l6ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFtfaGFuZGxlUmVzaXplIGRlc2NyaXB0aW9uXVxuICAgICAqL1xuXG4gICAgX2NyZWF0ZUNsYXNzKFZpZXdwb3J0LCBbe1xuICAgICAgICBrZXk6ICdfaGFuZGxlUmVzaXplJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVSZXNpemUoKSB7XG4gICAgICAgICAgICB2YXIgY29uZmlnID0gdGhpcy5fY29uZmlnO1xuXG4gICAgICAgICAgICB2YXIgX01haW50YWluTWF4JGZpdCA9IF9NYWludGFpbk1heDIuZGVmYXVsdC5maXQoY29uZmlnLnZpZXdwb3J0V2lkdGggKiBjb25maWcuYmxvY2tTaXplLCBjb25maWcudmlld3BvcnRIZWlnaHQgKiBjb25maWcuYmxvY2tTaXplKTtcblxuICAgICAgICAgICAgdmFyIHRvcCA9IF9NYWludGFpbk1heCRmaXQudG9wO1xuICAgICAgICAgICAgdmFyIGxlZnQgPSBfTWFpbnRhaW5NYXgkZml0LmxlZnQ7XG4gICAgICAgICAgICB2YXIgd2lkdGggPSBfTWFpbnRhaW5NYXgkZml0LndpZHRoO1xuICAgICAgICAgICAgdmFyIGhlaWdodCA9IF9NYWludGFpbk1heCRmaXQuaGVpZ2h0O1xuXG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUudG9wID0gTWF0aC5yb3VuZCh0b3ApICsgJ3B4JztcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5sZWZ0ID0gTWF0aC5yb3VuZChsZWZ0KSArICdweCc7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUud2lkdGggPSBNYXRoLnJvdW5kKHdpZHRoKSArICdweCc7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUuaGVpZ2h0ID0gTWF0aC5yb3VuZChoZWlnaHQpICsgJ3B4JztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBjYW52YXMnIDJkIGNvbnRleHQgb2JqZWN0XG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRDb250ZXh0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldENvbnRleHQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBWaWV3cG9ydDtcbn0pKCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFZpZXdwb3J0OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfQmxvY2sgPSByZXF1aXJlKCcuL0Jsb2NrJyk7XG5cbnZhciBfQmxvY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQmxvY2spO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqXG4gKi9cblxudmFyIEJpdG1hcCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQml0bWFwKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQml0bWFwKTtcblxuICAgICAgICB0aGlzLl9tYXAgPSBudWxsO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhCaXRtYXAsIFt7XG4gICAgICAgIGtleTogJ19nZXRNYXBPZmZzZXQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2dldE1hcE9mZnNldChtYXApIHtcbiAgICAgICAgICAgIHZhciBsZW55ID0gbWFwLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBsZW54ID0gbWFwWzBdLmxlbmd0aDtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB4OiBsZW54IC8gMixcbiAgICAgICAgICAgICAgICB5OiBsZW55IC8gMlxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2V0TWFwJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNldE1hcChtYXApIHtcbiAgICAgICAgICAgIHRoaXMuX21hcCA9IG1hcDtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5fZ2V0TWFwT2Zmc2V0KHRoaXMuX21hcCksXG4gICAgICAgICAgICAgICAgbWFweSA9IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBtYXB4ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICBmb3IgKHZhciB5ID0gMCwgbGVueSA9IHRoaXMuX21hcC5sZW5ndGg7IHkgPCBsZW55OyB5KyspIHtcbiAgICAgICAgICAgICAgICBtYXB5ID0gdGhpcy5fbWFwW3ldO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDAsIGxlbnggPSBtYXB5Lmxlbmd0aDsgeCA8IGxlbng7IHgrKykge1xuICAgICAgICAgICAgICAgICAgICBtYXB4ID0gbWFweVt4XTtcblxuICAgICAgICAgICAgICAgICAgICBfQmxvY2syLmRlZmF1bHQucmVuZGVyKHggLSBvZmZzZXQueCwgeSAtIG9mZnNldC55LCBtYXB4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gQml0bWFwO1xufSkoKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQml0bWFwOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogQGNsYXNzICAgICAgIGRyYXcuQmxvY2tcbiAqIEBkZXNjcmlwdGlvbiAyRCBwb2ludCB3aXRoIGNvbG9yIGRhdGEuIFVzZWQgdG8gcmVuZGVyIGFsbCBuYml0IGRpc3BsYXkgb2JqZWN0c1xuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5cbnZhciBCbG9jayA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmxvY2soKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCbG9jayk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKEJsb2NrLCBudWxsLCBbe1xuICAgICAgICBrZXk6ICdfZ2V0UGl4ZWxPZmZzZXQnLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbZ2V0UG9pbnRPZmZzZXQgZGVzY3JpcHRpb25dXG4gICAgICAgICAqIEBwYXJhbSB7SW50ZWdlcn0geCAgICBUaGUgeSBjb29yZFxuICAgICAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IHkgICAgVGhlIHggY29vcmRcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfSBzaXplIFRoZSBibG9jayBzaXplXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gICAgICBUaGUgQmxvY2sgcG9pbnQgb2Zmc2V0XG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2dldFBpeGVsT2Zmc2V0KHgsIHksIHNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgeDogTWF0aC5yb3VuZCh4KSAqIHNpemUgLSBzaXplIC8gMixcbiAgICAgICAgICAgICAgICB5OiBNYXRoLnJvdW5kKHkpICogc2l6ZSAtIHNpemUgLyAyXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbmRlcnMgYSBibG9jayB0byB0aGUgY2FudmFzXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0IFRoZSBjYW52YXMnIDJkIGNvbnRleHQgb2JqZWN0XG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKHgsIHksIGNvbG9yKSB7XG4gICAgICAgICAgICBpZiAoIUJsb2NrLl9jb250ZXh0IHx8ICFCbG9jay5fYmxvY2tTaXplKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCbG9jayByZXF1aXJlcyBhIGNvbnRleHQgYW5kIHNpemUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG9mZnNldCA9IHRoaXMuX2dldFBpeGVsT2Zmc2V0KHgsIHksIHRoaXMuX2Jsb2NrU2l6ZSk7XG5cbiAgICAgICAgICAgIEJsb2NrLl9jb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgIEJsb2NrLl9jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICAgICAgQmxvY2suX2NvbnRleHQuZmlsbFJlY3Qob2Zmc2V0LngsIG9mZnNldC55LCB0aGlzLl9ibG9ja1NpemUsIHRoaXMuX2Jsb2NrU2l6ZSk7XG4gICAgICAgICAgICBCbG9jay5fY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3NldENvbnRleHQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2V0Q29udGV4dChjb250ZXh0KSB7XG4gICAgICAgICAgICBCbG9jay5fY29udGV4dCA9IGNvbnRleHQ7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzZXRCbG9ja1NpemUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2V0QmxvY2tTaXplKHNpemUpIHtcbiAgICAgICAgICAgIEJsb2NrLl9ibG9ja1NpemUgPSBzaXplO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBCbG9jaztcbn0pKCk7XG5cbi8qKlxuICogU3RhdGljIHByb3BlcnRpZXNcbiAqL1xuXG5leHBvcnRzLmRlZmF1bHQgPSBCbG9jaztcbkJsb2NrLl9jb250ZXh0ID0gbnVsbDtcbkJsb2NrLl9ibG9ja1NpemUgPSBudWxsOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyoqXG4gKiBAY2xhc3MgICAgICAgTWFpbnRhaW5NYXhcbiAqIEBkZXNjcmlwdGlvbiBLZWVwcyBjYW52YXMgZWxlbWVudCBjZW50ZXJlZCBhbmQgKHdpdGggYXNwZWN0IHJhdGlvIGludGFjdCkgaW4gdGhlIHZpZXdwb3J0XG4gKi9cblxudmFyIE1haW50YWluTWF4ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNYWludGFpbk1heCgpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE1haW50YWluTWF4KTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoTWFpbnRhaW5NYXgsIG51bGwsIFt7XG4gICAgICAgIGtleTogXCJmaXRcIixcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtICB7bnVtYmVyfSB3aWR0aCAtIHRoZSBlbGVtZW50J3Mgd2lkdGhcbiAgICAgICAgICogQHBhcmFtICB7bnVtYmVyfSBoZWlnaHQgLSB0aGUgZWxlbWVudCdzIGhlaWdodFxuICAgICAgICAgKiBAcmV0dXJuIHtvYmplY3R9IHRoZSBuZXcgdG9wLCBsZWZ0LCB3aWR0aCwgJiBoZWlnaHRcbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBmaXQod2lkdGgsIGhlaWdodCkge1xuICAgICAgICAgICAgdmFyIExBTkRTQ0FQRV9SQVRJTyA9IGhlaWdodCAvIHdpZHRoO1xuICAgICAgICAgICAgdmFyIFBPUlRSQUlUX1JBVElPID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgICAgICAgICB2YXIgSVNfTEFORFNDQVBFID0gTEFORFNDQVBFX1JBVElPIDwgUE9SVFJBSVRfUkFUSU8gPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgICAgICAgIHZhciB3aW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICAgICAgdmFyIHdpbkhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgICAgIHZhciB3aW5MYW5kc2NhcGVSYXRpbyA9IHdpbkhlaWdodCAvIHdpbldpZHRoO1xuICAgICAgICAgICAgdmFyIHdpblBvcnRyYWl0UmF0aW8gPSB3aW5XaWR0aCAvIHdpbkhlaWdodDtcbiAgICAgICAgICAgIHZhciBvZmZzZXRMZWZ0ID0gMDtcbiAgICAgICAgICAgIHZhciBvZmZzZXRUb3AgPSAwO1xuICAgICAgICAgICAgdmFyIG9mZnNldFdpZHRoID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdmFyIG9mZnNldEhlaWdodCA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgaWYgKElTX0xBTkRTQ0FQRSkge1xuICAgICAgICAgICAgICAgIGlmIChMQU5EU0NBUEVfUkFUSU8gPCB3aW5MYW5kc2NhcGVSYXRpbykge1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHdpbldpZHRoO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSBvZmZzZXRXaWR0aCAqIExBTkRTQ0FQRV9SQVRJTztcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0VG9wID0gKHdpbkhlaWdodCAtIG9mZnNldEhlaWdodCkgLyAyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IHdpbkhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB3aW5IZWlnaHQgKiBQT1JUUkFJVF9SQVRJTztcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0TGVmdCA9ICh3aW5XaWR0aCAtIG9mZnNldFdpZHRoKSAvIDI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoUE9SVFJBSVRfUkFUSU8gPCB3aW5Qb3J0cmFpdFJhdGlvKSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IHdpbkhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB3aW5IZWlnaHQgKiBQT1JUUkFJVF9SQVRJTztcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0TGVmdCA9ICh3aW5XaWR0aCAtIG9mZnNldFdpZHRoKSAvIDI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB3aW5XaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gb2Zmc2V0V2lkdGggKiBMQU5EU0NBUEVfUkFUSU87XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFRvcCA9ICh3aW5IZWlnaHQgLSBvZmZzZXRIZWlnaHQpIC8gMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IG9mZnNldFdpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodDogb2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgICAgICAgIGxlZnQ6IG9mZnNldExlZnQsXG4gICAgICAgICAgICAgICAgdG9wOiBvZmZzZXRUb3BcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gTWFpbnRhaW5NYXg7XG59KSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBNYWludGFpbk1heDsiXX0=
