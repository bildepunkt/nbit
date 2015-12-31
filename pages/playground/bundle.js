(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Config = require('../../src/Config');

var _Config2 = _interopRequireDefault(_Config);

var _Canvas = require('../../src/Canvas');

var _Canvas2 = _interopRequireDefault(_Canvas);

var _Point = require('../../src/Point');

var _Point2 = _interopRequireDefault(_Point);

var _Bitmap = require('../../src/Bitmap');

var _Bitmap2 = _interopRequireDefault(_Bitmap);

var _Line = require('../../src/Line');

var _Line2 = _interopRequireDefault(_Line);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = new _Config2.default({
    ppp: 32,
    viewportWidth: 40,
    viewportHeight: 30
});

var canvas = new _Canvas2.default({ config: config });
var bitmap = new _Bitmap2.default().addMap([['#43C', '#C34', '#43C'], ['#C34', '#3C4', '#C34'], ['#43C', '#C34', '#43C']]);
var line = new _Line2.default().setPoints(new _Point2.default(2, 2), new _Point2.default(4, 8), new _Point2.default(12, 16));

canvas.render(line);
canvas.render(bitmap);

},{"../../src/Bitmap":2,"../../src/Canvas":3,"../../src/Config":4,"../../src/Line":5,"../../src/Point":7}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Sprite2 = require('./Sprite');

var _Sprite3 = _interopRequireDefault(_Sprite2);

var _Picl = require('./Picl');

var _Picl2 = _interopRequireDefault(_Picl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class       Bitmap
 * @description Maps 2d arrays into blocks
 * @extends     Sprite
 * @requires    Picl
 * @author      Chris Peters
 */

var Bitmap = (function (_Sprite) {
    _inherits(Bitmap, _Sprite);

    function Bitmap() {
        _classCallCheck(this, Bitmap);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Bitmap).call(this));

        _this._maps = [];
        _this._frame = 0;
        return _this;
    }

    _createClass(Bitmap, [{
        key: 'addMap',
        value: function addMap(map) {
            this._maps.push(map);

            return this;
        }
    }, {
        key: 'render',
        value: function render() {
            var map = this._maps[this._frame],
                picls = [],
                mapy = undefined,
                mapx = undefined;

            for (var y = 0, leny = map.length; y < leny; y++) {
                mapy = map[y];

                for (var x = 0, lenx = mapy.length; x < lenx; x++) {
                    mapx = mapy[x];

                    picls.push(new _Picl2.default(x, y, mapx));
                }
            }

            return picls;
        }
    }, {
        key: 'setFrame',
        value: function setFrame(val) {
            this._frame = val;

            return this;
        }
    }]);

    return Bitmap;
})(_Sprite3.default);

exports.default = Bitmap;

},{"./Picl":6,"./Sprite":8}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _MaintainMax = require('./lib/MaintainMax');

var _MaintainMax2 = _interopRequireDefault(_MaintainMax);

var _Sprite = require('./Sprite');

var _Sprite2 = _interopRequireDefault(_Sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       Canvas
 * @description Creates and renders to the canvas DOM element
 * @extends     GetSet
 * @required    MaintainMax
 * @author      Chris Peters
 */

var Canvas = (function () {
    /**
     * @param {object} deps
     * @param {object} deps.config
     * @param {object} [deps.document]
     * @param {object} [deps.window]
     */

    function Canvas(deps) {
        _classCallCheck(this, Canvas);

        this._config = deps.config;
        this._document = deps.document || document;
        this._window = deps.window || window;

        this._canvas = this._document.createElement('canvas');
        this._context = this._canvas.getContext('2d');

        this._canvas.width = this._config.viewportWidth * this._config.ppp;
        this._canvas.height = this._config.viewportHeight * this._config.ppp;
        this._canvas.style.position = 'absolute';
        this._canvas.style.backgroundColor = this._config.canvasBgColor;

        this._config.parentEl.style.backgroundColor = this._config.parentElBgColor;
        this._config.parentEl.appendChild(this._canvas);

        this._window.addEventListener('resize', this._handleResize.bind(this));

        this._handleResize();
    }

    /**
     * adjust canvas MaintainMax to fit canvas to resized window
     */

    _createClass(Canvas, [{
        key: '_handleResize',
        value: function _handleResize() {
            var config = this._config;

            var _MaintainMax$fit = _MaintainMax2.default.fit(config.viewportWidth * config.ppp, config.viewportHeight * config.ppp);

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
         * render Picls to the canvas
         *
         * @private
         * @param  {Integer} x     [description]
         * @param  {Integer} y     [description]
         * @param  {String}  color [description]
         */

    }, {
        key: '_renderPicl',
        value: function _renderPicl(x, y, color) {
            var size = this._config.ppp;

            this._context.fillStyle = color;
            this._context.fillRect(x * size, y * size, size, size);
            this._context.restore();
        }

        /**
         * adjust the canvas based on the Sprite's attrs
         */

    }, {
        key: '_setSpriteContext',
        value: function _setSpriteContext(sprite) {
            var size = this._config.ppp;

            this._context.translate(sprite.getX() * size, sprite.getY() * size);

            this._context.scale(sprite.getScaleX(), sprite.getScaleY());

            this._context.rotate(sprite.getRotation());

            if (sprite.getOpacity() !== 1) {
                this._context.globalAlpha = sprite.getOpacity();
            }

            if (sprite.getComposite() !== _Sprite2.default.getCompositeDefault()) {
                this._context.globalCompositeOperation = sprite.getComposite();
            }
        }

        /**
         * collects object's Picls and renders them to canvas
         *
         * @param {Object} object Any nbit object
         */

    }, {
        key: 'render',
        value: function render(object) {
            var picls = object.render();

            this._context.save();

            if (object instanceof _Sprite2.default) {
                this._setSpriteContext(object);
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = picls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var picl = _step.value;

                    this._renderPicl(picl.x, picl.y, picl.color);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }]);

    return Canvas;
})();

exports.default = Canvas;

},{"./Sprite":8,"./lib/MaintainMax":10}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

    // pixels per Picl
    this.ppp = 8;
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

},{}],5:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Bresenham = require('./lib/Bresenham');

var _Bresenham2 = _interopRequireDefault(_Bresenham);

var _Picl = require('./Picl');

var _Picl2 = _interopRequireDefault(_Picl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       draw.Line
 * @description Plots Picls between (and at) n Points
 * @requires    Bresenham
 * @requires    Picl
 * @author      Chris Peters
 */

var Line = (function () {
    /**
     * @param {String} [color] Initial color
     */

    function Line(color) {
        _classCallCheck(this, Line);

        this._picls = [];

        for (var _len = arguments.length, points = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            points[_key - 1] = arguments[_key];
        }

        this._points = [points];
        this._strokeColor = color || '#000';
    }

    /**
     * the Picl-pusher to pass to Bresenham.plotLine
     *
     * @private
     * @param  {[type]} x [description]
     * @param  {[type]} y [description]
     */

    _createClass(Line, [{
        key: '_addPicls',
        value: function _addPicls(x, y) {
            this._picls.push(new _Picl2.default(x, y, this._strokeColor));
        }

        /**
         * Set the line's points
         *
         * @param {Point} ...points
         */

    }, {
        key: 'setPoints',
        value: function setPoints() {
            for (var _len2 = arguments.length, points = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                points[_key2] = arguments[_key2];
            }

            if (points.length < 2) {
                throw new Error('Line must have at least two points');
            }

            this._points = points;

            return this;
        }
    }, {
        key: 'render',
        value: function render() {
            // empty picl array
            this._picls = [];

            for (var i = 0, len = this._points.length - 1; i < len; i++) {
                _Bresenham2.default.plotLine(this._points[i], this._points[i + 1], this._addPicls.bind(this));
            }

            return this._picls;
        }
    }]);

    return Line;
})();

exports.default = Line;

},{"./Picl":6,"./lib/Bresenham":9}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Point2 = require('./Point');

var _Point3 = _interopRequireDefault(_Point2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class       Picl
 * @description Base drawing object for all nbit components. This object does not
 *              conform to the underscore-prefixed private property paradigm.
 * @extends     Point
 * @author      Chris Peters
 */

var Picl = (function (_Point) {
  _inherits(Picl, _Point);

  /**
   * @param {Integer} [x]     2d coordinate
   * @param {Integer} [y]     2d coordinate
   * @param {String}  [color] Initial color
   */

  function Picl(x, y, color) {
    _classCallCheck(this, Picl);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Picl).call(this, x, y));

    _this.color = color || '#000';
    return _this;
  }

  return Picl;
})(_Point3.default);

exports.default = Picl;

},{"./Point":7}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       Point
 * @description Create 2D point. This object does not conform to the
 *              underscore-prefixed private property paradigm.
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

},{}],8:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       Sprite
 * @description Base class for position based objects
 * @author      Chris Peters
 */

var Sprite = (function () {
    /**
     *
     */

    function Sprite(x, y) {
        _classCallCheck(this, Sprite);

        this._x = x || 0;
        this._y = y || 0;
        this._scaleX = 1;
        this._scaleY = 1;
        this._rotation = 0;
        this._composite = Sprite._compositeDefault;
        this._opacity = 1;
    }

    _createClass(Sprite, [{
        key: 'getComposite',

        /**
         * @return {String}
         */
        value: function getComposite() {
            return this._composite;
        }

        /**
         * @return {Float}
         */

    }, {
        key: 'getOpacity',
        value: function getOpacity() {
            return this._opacity;
        }

        /**
         * @return {Float}
         */

    }, {
        key: 'getRotation',
        value: function getRotation() {
            return this._rotation;
        }

        /**
         * @return {Integer}
         */

    }, {
        key: 'getScaleX',
        value: function getScaleX() {
            return Math.round(this._scaleX);
        }

        /**
         * @return {Integer}
         */

    }, {
        key: 'getScaleY',
        value: function getScaleY() {
            return Math.round(this._scaleY);
        }

        /**
         * @return {Integer}
         */

    }, {
        key: 'getX',
        value: function getX() {
            return Math.round(this._x);
        }

        /**
         * @return {Integer}
         */

    }, {
        key: 'getY',
        value: function getY() {
            return Math.round(this._y);
        }
    }, {
        key: 'setComposite',
        value: function setComposite(val) {
            this._composite = val;

            return this;
        }
    }, {
        key: 'setOpacity',
        value: function setOpacity(val) {
            this._opacity = val;

            return this;
        }
    }, {
        key: 'setRotation',
        value: function setRotation(val) {
            this._rotation = val;

            return this;
        }
    }, {
        key: 'setScaleX',
        value: function setScaleX(val) {
            this._scaleX = val;

            return this;
        }
    }, {
        key: 'setScaleY',
        value: function setScaleY(val) {
            this._scaleY = val;

            return this;
        }
    }, {
        key: 'setX',
        value: function setX(val) {
            this._x = val;

            return this;
        }
    }, {
        key: 'setY',
        value: function setY(val) {
            this._y = val;

            return this;
        }
    }], [{
        key: 'getCompositeDefault',
        value: function getCompositeDefault() {
            return Sprite._compositeDefault;
        }
    }]);

    return Sprite;
})();

exports.default = Sprite;

Sprite._compositeDefault = 'source-over';

},{}],9:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

},{}],10:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwbGF5Z3JvdW5kL21haW4uanMiLCIuLi9zcmMvQml0bWFwLmpzIiwiLi4vc3JjL0NhbnZhcy5qcyIsIi4uL3NyYy9Db25maWcuanMiLCIuLi9zcmMvTGluZS5qcyIsIi4uL3NyYy9QaWNsLmpzIiwiLi4vc3JjL1BvaW50LmpzIiwiLi4vc3JjL1Nwcml0ZS5qcyIsIi4uL3NyYy9saWIvQnJlc2VuaGFtLmpzIiwiLi4vc3JjL2xpYi9NYWludGFpbk1heC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ01BLElBQUksTUFBTSxHQUFHLHFCQUFXO0FBQ3BCLE9BQUcsRUFBRSxFQUFFO0FBQ1AsaUJBQWEsRUFBRSxFQUFFO0FBQ2pCLGtCQUFjLEVBQUUsRUFBRTtDQUNyQixDQUFDLENBQUM7O0FBRUgsSUFBSSxNQUFNLEdBQUcscUJBQVcsRUFBQyxNQUFNLEVBQU4sTUFBTSxFQUFDLENBQUMsQ0FBQztBQUNsQyxJQUFJLE1BQU0sR0FBRyxzQkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUM3QixDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQ3hCLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFDeEIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUMzQixDQUFDLENBQUM7QUFDSCxJQUFJLElBQUksR0FBRyxvQkFBVSxDQUFDLFNBQVMsQ0FDM0Isb0JBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNmLG9CQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDZixvQkFBVSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQ3BCLENBQUM7O0FBRUYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixNQUFNLENBQUMsTUFBTSxDQUFD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VSxHQUFHLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQSxHQUFJLENBQUMsQ0FBQztpQkFDN0M7YUFDSixNQUFNO0FBQ0gsb0JBQUksY0FBYyxHQUFHLGdCQUFnQixFQUFFO0FBQ25DLGdDQUFZLEdBQUcsU0FBUyxDQUFDO0FBQ3pCLCtCQUFXLEdBQUcsU0FBUyxHQUFHLGNBQWMsQ0FBQztBQUN6Qyw4QkFBVSxHQUFHLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQSxHQUFJLENBQUMsQ0FBQztpQkFDN0MsTUFBTTtBQUNILCtCQUFXLEdBQUcsUUFBUSxDQUFDO0FBQ3ZCLGdDQUFZLEdBQUcsV0FBVyxHQUFHLGVBQWUsQ0FBQztBQUM3Qyw2QkFBUyxHQUFHLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQSxHQUFJLENBQUMsQ0FBQztpQkFDOUM7YUFDSjs7QUFFRCxtQkFBTztBQUNILHFCQUFLLEVBQUUsV0FBVztBQUNsQixzQkFBTSxFQUFFLFlBQVk7QUFDcEIsb0JBQUksRUFBRSxVQUFVO0FBQ2hCLG1CQUFHLEVBQUUsU0FBUzthQUNqQixDQUFDO1NBQ0w7OztXQWhEZ0IsV0FBVzs7O2tCQUFYLFdBQVciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9zcmMvQ29uZmlnJztcbmltcG9ydCBDYW52YXMgZnJvbSAnLi4vLi4vc3JjL0NhbnZhcyc7XG5pbXBvcnQgUG9pbnQgZnJvbSAnLi4vLi4vc3JjL1BvaW50JztcbmltcG9ydCBCaXRtYXAgZnJvbSAnLi4vLi4vc3JjL0JpdG1hcCc7XG5pbXBvcnQgTGluZSBmcm9tICcuLi8uLi9zcmMvTGluZSc7XG5cbmxldCBjb25maWcgPSBuZXcgQ29uZmlnKHtcbiAgICBwcHA6IDMyLFxuICAgIHZpZXdwb3J0V2lkdGg6IDQwLFxuICAgIHZpZXdwb3J0SGVpZ2h0OiAzMFxufSk7XG5cbmxldCBjYW52YXMgPSBuZXcgQ2FudmFzKHtjb25maWd9KTtcbmxldCBiaXRtYXAgPSBuZXcgQml0bWFwKCkuYWRkTWFwKFtcbiAgICBbJyM0M0MnLCAnI0MzNCcsICcjNDNDJ10sXG4gICAgWycjQzM0JywgJyMzQzQnLCAnI0MzNCddLFxuICAgIFsnIzQzQycsICcjQzM0JywgJyM0M0MnXVxuXSk7XG5sZXQgbGluZSA9IG5ldyBMaW5lKCkuc2V0UG9pbnRzKFxuICAgIG5ldyBQb2ludCgyLCAyKSxcbiAgICBuZXcgUG9pbnQoNCwgOCksXG4gICAgbmV3IFBvaW50KDEyLCAxNilcbik7XG5cbmNhbnZhcy5yZW5kZXIobGluZSk7XG5jYW52YXMucmVuZGVyKGJpdG1hcCk7XG4iLCJpbXBvcnQgU3ByaXRlIGZyb20gJy4vU3ByaXRlJztcbmltcG9ydCBQaWNsIGZyb20gJy4vUGljbCc7XG5cblxuLyoqXG4gKiBAY2xhc3MgICAgICAgQml0bWFwXG4gKiBAZGVzY3JpcHRpb24gTWFwcyAyZCBhcnJheXMgaW50byBibG9ja3NcbiAqIEBleHRlbmRzICAgICBTcHJpdGVcbiAqIEByZXF1aXJlcyAgICBQaWNsXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJpdG1hcCBleHRlbmRzIFNwcml0ZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fbWFwcyA9IFtdO1xuICAgICAgICB0aGlzLl9mcmFtZSA9IDA7XG4gICAgfVxuXG4gICAgYWRkTWFwKG1hcCkge1xuICAgICAgICB0aGlzLl9tYXBzLnB1c2gobWFwKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBtYXAgPSB0aGlzLl9tYXBzW3RoaXMuX2ZyYW1lXSxcbiAgICAgICAgICAgIHBpY2xzID0gW10sXG4gICAgICAgICAgICBtYXB5LCBtYXB4O1xuXG4gICAgICAgIGZvciAobGV0IHkgPSAwLCBsZW55ID0gbWFwLmxlbmd0aDsgeSA8IGxlbnk7IHkrKykge1xuICAgICAgICAgICAgbWFweSA9IG1hcFt5XTtcblxuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDAsIGxlbnggPSBtYXB5Lmxlbmd0aDsgeCA8IGxlbng7IHgrKykge1xuICAgICAgICAgICAgICAgIG1hcHggPSBtYXB5W3hdO1xuXG4gICAgICAgICAgICAgICAgcGljbHMucHVzaChuZXcgUGljbCh4LCB5LCBtYXB4KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGljbHM7XG4gICAgfVxuXG4gICAgc2V0RnJhbWUodmFsKSB7XG4gICAgICAgIHRoaXMuX2ZyYW1lID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImltcG9ydCBNYWludGFpbk1heCBmcm9tICcuL2xpYi9NYWludGFpbk1heCc7XG5pbXBvcnQgU3ByaXRlIGZyb20gJy4vU3ByaXRlJztcblxuLyoqXG4gKiBAY2xhc3MgICAgICAgQ2FudmFzXG4gKiBAZGVzY3JpcHRpb24gQ3JlYXRlcyBhbmQgcmVuZGVycyB0byB0aGUgY2FudmFzIERPTSBlbGVtZW50XG4gKiBAZXh0ZW5kcyAgICAgR2V0U2V0XG4gKiBAcmVxdWlyZWQgICAgTWFpbnRhaW5NYXhcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZGVwc1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBkZXBzLmNvbmZpZ1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbZGVwcy5kb2N1bWVudF1cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW2RlcHMud2luZG93XVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGRlcHMpIHtcbiAgICAgICAgdGhpcy5fY29uZmlnID0gZGVwcy5jb25maWc7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50ID0gZGVwcy5kb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgICAgICAgdGhpcy5fd2luZG93ID0gZGVwcy53aW5kb3cgfHwgd2luZG93O1xuXG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLl9jb250ZXh0ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gdGhpcy5fY29uZmlnLnZpZXdwb3J0V2lkdGggKiB0aGlzLl9jb25maWcucHBwO1xuICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gdGhpcy5fY29uZmlnLnZpZXdwb3J0SGVpZ2h0ICogdGhpcy5fY29uZmlnLnBwcDtcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuX2NvbmZpZy5jYW52YXNCZ0NvbG9yO1xuXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJlbnRFbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLl9jb25maWcucGFyZW50RWxCZ0NvbG9yO1xuICAgICAgICB0aGlzLl9jb25maWcucGFyZW50RWwuYXBwZW5kQ2hpbGQodGhpcy5fY2FudmFzKTtcblxuICAgICAgICB0aGlzLl93aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5faGFuZGxlUmVzaXplLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuX2hhbmRsZVJlc2l6ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFkanVzdCBjYW52YXMgTWFpbnRhaW5NYXggdG8gZml0IGNhbnZhcyB0byByZXNpemVkIHdpbmRvd1xuICAgICAqL1xuICAgIF9oYW5kbGVSZXNpemUoKSB7XG4gICAgICAgIGxldCBjb25maWcgPSB0aGlzLl9jb25maWc7XG4gICAgICAgIGxldCB7IHRvcCwgbGVmdCwgd2lkdGgsIGhlaWdodCB9ID0gTWFpbnRhaW5NYXguZml0KFxuICAgICAgICAgICAgY29uZmlnLnZpZXdwb3J0V2lkdGggKiBjb25maWcucHBwLFxuICAgICAgICAgICAgY29uZmlnLnZpZXdwb3J0SGVpZ2h0ICogY29uZmlnLnBwcFxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS50b3AgPSBgJHtNYXRoLnJvdW5kKHRvcCl9cHhgO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUubGVmdCA9IGAke01hdGgucm91bmQobGVmdCl9cHhgO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUud2lkdGggPSBgJHtNYXRoLnJvdW5kKHdpZHRoKX1weGA7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5oZWlnaHQgPSBgJHtNYXRoLnJvdW5kKGhlaWdodCl9cHhgO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlbmRlciBQaWNscyB0byB0aGUgY2FudmFzXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHggICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB5ICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgY29sb3IgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIF9yZW5kZXJQaWNsKHgsIHksIGNvbG9yKSB7XG4gICAgICAgIGxldCBzaXplID0gdGhpcy5fY29uZmlnLnBwcDtcblxuICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGxSZWN0KHggKiBzaXplLCB5ICogc2l6ZSwgc2l6ZSwgc2l6ZSk7XG4gICAgICAgIHRoaXMuX2NvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFkanVzdCB0aGUgY2FudmFzIGJhc2VkIG9uIHRoZSBTcHJpdGUncyBhdHRyc1xuICAgICAqL1xuICAgIF9zZXRTcHJpdGVDb250ZXh0KHNwcml0ZSkge1xuICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuX2NvbmZpZy5wcHA7XG5cbiAgICAgICAgdGhpcy5fY29udGV4dC50cmFuc2xhdGUoc3ByaXRlLmdldFgoKSAqIHNpemUsIHNwcml0ZS5nZXRZKCkgKiBzaXplKTtcblxuICAgICAgICB0aGlzLl9jb250ZXh0LnNjYWxlKHNwcml0ZS5nZXRTY2FsZVgoKSwgc3ByaXRlLmdldFNjYWxlWSgpKTtcblxuICAgICAgICB0aGlzLl9jb250ZXh0LnJvdGF0ZShzcHJpdGUuZ2V0Um90YXRpb24oKSk7XG5cbiAgICAgICAgaWYgKHNwcml0ZS5nZXRPcGFjaXR5KCkgIT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuZ2xvYmFsQWxwaGEgPSBzcHJpdGUuZ2V0T3BhY2l0eSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNwcml0ZS5nZXRDb21wb3NpdGUoKSAhPT0gU3ByaXRlLmdldENvbXBvc2l0ZURlZmF1bHQoKSkge1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBzcHJpdGUuZ2V0Q29tcG9zaXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjb2xsZWN0cyBvYmplY3QncyBQaWNscyBhbmQgcmVuZGVycyB0aGVtIHRvIGNhbnZhc1xuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBBbnkgbmJpdCBvYmplY3RcbiAgICAgKi9cbiAgICByZW5kZXIob2JqZWN0KSB7XG4gICAgICAgIGxldCBwaWNscyA9IG9iamVjdC5yZW5kZXIoKTtcblxuICAgICAgICB0aGlzLl9jb250ZXh0LnNhdmUoKTtcblxuICAgICAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgU3ByaXRlKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXRTcHJpdGVDb250ZXh0KG9iamVjdCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBwaWNsIG9mIHBpY2xzKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJQaWNsKHBpY2wueCwgcGljbC55LCBwaWNsLmNvbG9yKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qKlxuICogQGNsYXNzICAgICAgIENvbmZpZ1xuICogQGRlc2NyaXB0aW9uIFRoZSBjb25maWd1cmF0aW9uIG9iamVjdCBmb3IgbkJpdC4gVGhpcyBvYmplY3QgZG9lcyBub3QgY29uZm9ybSB0b1xuICogICAgICAgICAgICAgIHRoZSB1bmRlcnNjb3JlIHByZWZpeGVkIHByaXZhdGUgcHJvcGVydHkgcGFyYWRpZ20uXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbmZpZyB7XG4gICAgLyoqXG4gICAgICogW2NvbnN0cnVjdG9yIGRlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4ge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgLy8gcGl4ZWxzIHBlciBQaWNsXG4gICAgICAgIHRoaXMucHBwID0gODtcbiAgICAgICAgdGhpcy52aWV3cG9ydFdpZHRoID0gMTAwO1xuICAgICAgICB0aGlzLnZpZXdwb3J0SGVpZ2h0ID0gNzU7XG4gICAgICAgIHRoaXMucGFyZW50RWwgPSBkb2N1bWVudC5ib2R5O1xuICAgICAgICB0aGlzLnBhcmVudEVsQmdDb2xvciA9ICcjMDAwJztcbiAgICAgICAgdGhpcy5jYW52YXNCZ0NvbG9yID0gJyNGRkYnO1xuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzW2tleV0gPSBvcHRpb25zW2tleV07XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgQnJlc2VuaGFtIGZyb20gJy4vbGliL0JyZXNlbmhhbSc7XG5pbXBvcnQgUGljbCBmcm9tICcuL1BpY2wnO1xuXG4vKipcbiAqIEBjbGFzcyAgICAgICBkcmF3LkxpbmVcbiAqIEBkZXNjcmlwdGlvbiBQbG90cyBQaWNscyBiZXR3ZWVuIChhbmQgYXQpIG4gUG9pbnRzXG4gKiBAcmVxdWlyZXMgICAgQnJlc2VuaGFtXG4gKiBAcmVxdWlyZXMgICAgUGljbFxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5lIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW2NvbG9yXSBJbml0aWFsIGNvbG9yXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29sb3IsIC4uLnBvaW50cykge1xuICAgICAgICB0aGlzLl9waWNscyA9IFtdO1xuICAgICAgICB0aGlzLl9wb2ludHMgPSBbcG9pbnRzXTtcbiAgICAgICAgdGhpcy5fc3Ryb2tlQ29sb3IgPSBjb2xvciB8fCAnIzAwMCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdGhlIFBpY2wtcHVzaGVyIHRvIHBhc3MgdG8gQnJlc2VuaGFtLnBsb3RMaW5lXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSAge1t0eXBlXX0geCBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICB7W3R5cGVdfSB5IFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBfYWRkUGljbHMoeCwgeSkge1xuICAgICAgICB0aGlzLl9waWNscy5wdXNoKG5ldyBQaWNsKHgsIHksIHRoaXMuX3N0cm9rZUNvbG9yKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBsaW5lJ3MgcG9pbnRzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1BvaW50fSAuLi5wb2ludHNcbiAgICAgKi9cbiAgICBzZXRQb2ludHMoLi4ucG9pbnRzKSB7XG4gICAgICAgIGlmIChwb2ludHMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdMaW5lIG11c3QgaGF2ZSBhdCBsZWFzdCB0d28gcG9pbnRzJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9wb2ludHMgPSBwb2ludHM7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICAvLyBlbXB0eSBwaWNsIGFycmF5XG4gICAgICAgIHRoaXMuX3BpY2xzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuX3BvaW50cy5sZW5ndGggLSAxOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIEJyZXNlbmhhbS5wbG90TGluZSh0aGlzLl9wb2ludHNbaV0sIHRoaXMuX3BvaW50c1tpICsgMV0sIHRoaXMuX2FkZFBpY2xzLmJpbmQodGhpcykpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3BpY2xzO1xuICAgIH1cbn1cbiIsImltcG9ydCBQb2ludCBmcm9tICcuL1BvaW50JztcblxuLyoqXG4gKiBAY2xhc3MgICAgICAgUGljbFxuICogQGRlc2NyaXB0aW9uIEJhc2UgZHJhd2luZyBvYmplY3QgZm9yIGFsbCBuYml0IGNvbXBvbmVudHMuIFRoaXMgb2JqZWN0IGRvZXMgbm90XG4gKiAgICAgICAgICAgICAgY29uZm9ybSB0byB0aGUgdW5kZXJzY29yZS1wcmVmaXhlZCBwcml2YXRlIHByb3BlcnR5IHBhcmFkaWdtLlxuICogQGV4dGVuZHMgICAgIFBvaW50XG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBpY2wgZXh0ZW5kcyBQb2ludCB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSBbeF0gICAgIDJkIGNvb3JkaW5hdGVcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IFt5XSAgICAgMmQgY29vcmRpbmF0ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgW2NvbG9yXSBJbml0aWFsIGNvbG9yXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoeCwgeSwgY29sb3IpIHtcbiAgICAgICAgc3VwZXIoeCwgeSk7XG5cbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yIHx8ICcjMDAwJztcbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBQb2ludFxuICogQGRlc2NyaXB0aW9uIENyZWF0ZSAyRCBwb2ludC4gVGhpcyBvYmplY3QgZG9lcyBub3QgY29uZm9ybSB0byB0aGVcbiAqICAgICAgICAgICAgICB1bmRlcnNjb3JlLXByZWZpeGVkIHByaXZhdGUgcHJvcGVydHkgcGFyYWRpZ20uXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvaW50IHtcbiAgICAvKipcbiAgICAgKiBpbml0aWFsaXplIGEgcG9pbnQgd2l0aCAwLDAgb3IgZ2l2ZW4gY29vcmRpbmF0ZXNcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB4XG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0geVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgdGhpcy54ID0geCB8fCAwO1xuICAgICAgICB0aGlzLnkgPSB5IHx8IDA7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgU3ByaXRlXG4gKiBAZGVzY3JpcHRpb24gQmFzZSBjbGFzcyBmb3IgcG9zaXRpb24gYmFzZWQgb2JqZWN0c1xuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcHJpdGUge1xuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICB0aGlzLl94ID0geCB8fCAwO1xuICAgICAgICB0aGlzLl95ID0geSB8fCAwO1xuICAgICAgICB0aGlzLl9zY2FsZVggPSAxO1xuICAgICAgICB0aGlzLl9zY2FsZVkgPSAxO1xuICAgICAgICB0aGlzLl9yb3RhdGlvbiA9IDA7XG4gICAgICAgIHRoaXMuX2NvbXBvc2l0ZSA9IFNwcml0ZS5fY29tcG9zaXRlRGVmYXVsdDtcbiAgICAgICAgdGhpcy5fb3BhY2l0eSA9IDE7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldENvbXBvc2l0ZURlZmF1bHQoKSB7XG4gICAgICAgIHJldHVybiBTcHJpdGUuX2NvbXBvc2l0ZURlZmF1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIGdldENvbXBvc2l0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvc2l0ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtGbG9hdH1cbiAgICAgKi9cbiAgICBnZXRPcGFjaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3BhY2l0eTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtGbG9hdH1cbiAgICAgKi9cbiAgICBnZXRSb3RhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JvdGF0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0U2NhbGVYKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh0aGlzLl9zY2FsZVgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0U2NhbGVZKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh0aGlzLl9zY2FsZVkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WCgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQodGhpcy5feCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRZKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh0aGlzLl95KTtcbiAgICB9XG5cbiAgICBzZXRDb21wb3NpdGUodmFsKSB7XG4gICAgICAgIHRoaXMuX2NvbXBvc2l0ZSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRPcGFjaXR5KHZhbCkge1xuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFJvdGF0aW9uKHZhbCkge1xuICAgICAgICB0aGlzLl9yb3RhdGlvbiA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRTY2FsZVgodmFsKSB7XG4gICAgICAgIHRoaXMuX3NjYWxlWCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRTY2FsZVkodmFsKSB7XG4gICAgICAgIHRoaXMuX3NjYWxlWSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRYKHZhbCkge1xuICAgICAgICB0aGlzLl94ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFkodmFsKSB7XG4gICAgICAgIHRoaXMuX3kgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5TcHJpdGUuX2NvbXBvc2l0ZURlZmF1bHQgPSAnc291cmNlLW92ZXInO1xuXG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBCcmVzZW5oYW1cbiAqIEBkZXNjcmlwdGlvbiBCcmVzZW5oYW0ncyBmb3JtdWxhZSBmb3IgY2FsY3VsYXRpbmcgYmxvY2tzIGZyb20gY3VydmVzLCBiZXR3ZWVuIHBvaW50cyBldGMuXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKiBAcmVmZXJlbmNlICAgaHR0cDovL3Jvc2V0dGFjb2RlLm9yZy93aWtpL0JpdG1hcC9CcmVzZW5oYW0nc19saW5lX2FsZ29yaXRobVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCcmVzZW5oYW0ge1xuICAgIC8qKlxuICAgICAqIHBsb3QgdGhlIGNvbm5lY3RpbmcgYmxvY2tzIGJldHdlZW4gdHdvIHBvaW50c1xuICAgICAqIEBwYXJhbSB7UG9pbnR9IHB0QVxuICAgICAqIEBwYXJhbSB7UG9pbnR9IHB0QlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gd2hhdCB0byBkbyB3aGVuIGEgY29ubmVjdGlvbiBwb2ludCBpcyBjYWxjdWxhdGVkXG4gICAgICovXG4gICAgc3RhdGljIHBsb3RMaW5lKHB0QSwgcHRCLCBwbG90KSB7XG4gICAgICAgIGxldCBkeCA9IE1hdGguYWJzKHB0Qi54IC0gcHRBLngpO1xuICAgICAgICBsZXQgc3ggPSBwdEEueCA8IHB0Qi54ID8gMSA6IC0xO1xuICAgICAgICBsZXQgZHkgPSAtTWF0aC5hYnMocHRCLnkgLSBwdEEueSk7XG4gICAgICAgIGxldCBzeSA9IHB0QS55IDwgcHRCLnkgPyAxIDogLTE7XG4gICAgICAgIGxldCBlcnIgPSBkeCArIGR5LCBlMjtcblxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgcGxvdChwdEEueCwgcHRBLnkpO1xuXG4gICAgICAgICAgICBpZiAocHRBLnggPT0gcHRCLnggJiYgcHRBLnkgPT0gcHRCLnkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZTIgPSAyICogZXJyO1xuXG4gICAgICAgICAgICBpZiAoZTIgPj0gZHkpIHtcbiAgICAgICAgICAgICAgICBlcnIgKz0gZHk7XG4gICAgICAgICAgICAgICAgcHRBLnggKz0gc3g7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlMiA8PSBkeCkge1xuICAgICAgICAgICAgICAgIGVyciArPSBkeDtcbiAgICAgICAgICAgICAgICBwdEEueSArPSBzeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFtwbG90RWxsaXBzZSBkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuIHtbdHlwZV19IFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBzdGF0aWMgcGxvdEVsbGlwc2UoKSB7XG5cbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBNYWludGFpbk1heFxuICogQGRlc2NyaXB0aW9uIEtlZXBzIGNhbnZhcyBlbGVtZW50IGNlbnRlcmVkIGFuZCAod2l0aCBhc3BlY3QgcmF0aW8gaW50YWN0KSBpbiB0aGUgdmlld3BvcnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbnRhaW5NYXgge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge251bWJlcn0gd2lkdGggLSB0aGUgZWxlbWVudCdzIHdpZHRoXG4gICAgICogQHBhcmFtICB7bnVtYmVyfSBoZWlnaHQgLSB0aGUgZWxlbWVudCdzIGhlaWdodFxuICAgICAqIEByZXR1cm4ge29iamVjdH0gdGhlIG5ldyB0b3AsIGxlZnQsIHdpZHRoLCAmIGhlaWdodFxuICAgICAqL1xuICAgIHN0YXRpYyBmaXQod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBjb25zdCBMQU5EU0NBUEVfUkFUSU8gPSBoZWlnaHQgLyB3aWR0aDtcbiAgICAgICAgY29uc3QgUE9SVFJBSVRfUkFUSU8gID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgICAgIGNvbnN0IElTX0xBTkRTQ0FQRSAgICA9IExBTkRTQ0FQRV9SQVRJTyA8IFBPUlRSQUlUX1JBVElPID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgICAgIGxldCB3aW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBsZXQgd2luSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICBsZXQgd2luTGFuZHNjYXBlUmF0aW8gPSB3aW5IZWlnaHQgLyB3aW5XaWR0aDtcbiAgICAgICAgbGV0IHdpblBvcnRyYWl0UmF0aW8gID0gd2luV2lkdGggLyB3aW5IZWlnaHQ7XG4gICAgICAgIGxldCBvZmZzZXRMZWZ0ID0gMDtcbiAgICAgICAgbGV0IG9mZnNldFRvcCAgPSAwO1xuICAgICAgICBsZXQgb2Zmc2V0V2lkdGg7XG4gICAgICAgIGxldCBvZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgaWYgKElTX0xBTkRTQ0FQRSkge1xuICAgICAgICAgICAgaWYgKExBTkRTQ0FQRV9SQVRJTyA8IHdpbkxhbmRzY2FwZVJhdGlvKSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB3aW5XaWR0aDtcbiAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSBvZmZzZXRXaWR0aCAqIExBTkRTQ0FQRV9SQVRJTztcbiAgICAgICAgICAgICAgICBvZmZzZXRUb3AgPSAod2luSGVpZ2h0IC0gb2Zmc2V0SGVpZ2h0KSAvIDI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IHdpbkhlaWdodDtcbiAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHdpbkhlaWdodCAqIFBPUlRSQUlUX1JBVElPO1xuICAgICAgICAgICAgICAgIG9mZnNldExlZnQgPSAod2luV2lkdGggLSBvZmZzZXRXaWR0aCkgLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKFBPUlRSQUlUX1JBVElPIDwgd2luUG9ydHJhaXRSYXRpbykge1xuICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IHdpbkhlaWdodDtcbiAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHdpbkhlaWdodCAqIFBPUlRSQUlUX1JBVElPO1xuICAgICAgICAgICAgICAgIG9mZnNldExlZnQgPSAod2luV2lkdGggLSBvZmZzZXRXaWR0aCkgLyAyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHdpbldpZHRoO1xuICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IG9mZnNldFdpZHRoICogTEFORFNDQVBFX1JBVElPO1xuICAgICAgICAgICAgICAgIG9mZnNldFRvcCA9ICh3aW5IZWlnaHQgLSBvZmZzZXRIZWlnaHQpIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogb2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG9mZnNldEhlaWdodCxcbiAgICAgICAgICAgIGxlZnQ6IG9mZnNldExlZnQsXG4gICAgICAgICAgICB0b3A6IG9mZnNldFRvcFxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==
