(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _config = require('../../src/config');

var _config2 = _interopRequireDefault(_config);

var _Canvas = require('../../src/Canvas');

var _Canvas2 = _interopRequireDefault(_Canvas);

var _Collision = require('../../src/Collision');

var _Collision2 = _interopRequireDefault(_Collision);

var _Collection = require('../../src/lib/Collection');

var _Collection2 = _interopRequireDefault(_Collection);

var _CanvasInput = require('../../src/lib/CanvasInput');

var _CanvasInput2 = _interopRequireDefault(_CanvasInput);

var _Ticker = require('../../src/Ticker');

var _Ticker2 = _interopRequireDefault(_Ticker);

var _Point = require('../../src/Point');

var _Point2 = _interopRequireDefault(_Point);

var _Bitmap = require('../../src/Bitmap');

var _Bitmap2 = _interopRequireDefault(_Bitmap);

var _Line = require('../../src/Line');

var _Line2 = _interopRequireDefault(_Line);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = new _Canvas2.default();
var ticker = new _Ticker2.default().start();

var canvasInput = new _CanvasInput2.default({
    useMouse: _config2.default.useMouse,
    canvas: canvas.getEl(),
    hitTestMethod: _Collision2.default.hitTest,
    canvasFit: true
});

var bitmap = new _Bitmap2.default().addMap([['#43C', '#C34', '#43C'], ['#C34', '#3C4', '#C34'], ['#43C', '#C34', '#43C']]);

var line = new _Line2.default().setPoints(new _Point2.default(2, 4), new _Point2.default(8, 16), new _Point2.default(32, 8));

var pool = new _Collection2.default().addItems(bitmap, line);

canvasInput.setEntityPool(pool.getArray());
canvasInput.press = function (e) {
    return console.log(e);
};

ticker.update = function () {
    canvas.renderPool(pool.getArray());
};

},{"../../src/Bitmap":2,"../../src/Canvas":3,"../../src/Collision":4,"../../src/Line":5,"../../src/Point":7,"../../src/Ticker":9,"../../src/config":10,"../../src/lib/CanvasInput":12,"../../src/lib/Collection":13}],2:[function(require,module,exports){
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
        key: 'getBoundingBox',
        value: function getBoundingBox() {
            return {
                left: this._x,
                top: this._y,
                right: this._x + this._maps[this._frame][0].length,
                bottom: this._y + this._maps[this._frame].length
            };
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

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

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
     * @param {object} [deps]
     * @param {object} [deps.document]
     * @param {object} [deps.window]
     */

    function Canvas(deps) {
        _classCallCheck(this, Canvas);

        deps = deps || {};
        this._document = deps.document || document;
        this._window = deps.window || window;

        this._canvas = this._document.createElement('canvas');
        this._context = this._canvas.getContext('2d');

        this._canvas.width = _config2.default.viewportWidth * _config2.default.ppp;
        this._canvas.height = _config2.default.viewportHeight * _config2.default.ppp;
        this._canvas.style.position = 'absolute';
        this._canvas.style.backgroundColor = _config2.default.canvasBgColor;

        _config2.default.parentEl.style.backgroundColor = _config2.default.parentElBgColor;
        _config2.default.parentEl.appendChild(this._canvas);

        this._window.addEventListener('resize', this._handleResize.bind(this));

        this._handleResize();
    }

    /**
     * adjust canvas MaintainMax to fit canvas to resized window
     */

    _createClass(Canvas, [{
        key: '_handleResize',
        value: function _handleResize() {
            var _MaintainMax$fit = _MaintainMax2.default.fit(_config2.default.viewportWidth * _config2.default.ppp, _config2.default.viewportHeight * _config2.default.ppp);

            var top = _MaintainMax$fit.top;
            var left = _MaintainMax$fit.left;
            var width = _MaintainMax$fit.width;
            var height = _MaintainMax$fit.height;

            this._canvas.style.top = Math.round(top) + 'px';
            this._canvas.style.left = Math.round(left) + 'px';
            this._canvas.style.width = Math.round(width) + 'px';
            this._canvas.style.height = Math.round(height) + 'px';

            this.onResize();
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
            var ppp = _config2.default.ppp;

            this._context.fillStyle = color;
            this._context.fillRect(x * ppp, y * ppp, ppp, ppp);
            this._context.restore();
        }

        /**
         * adjust the canvas based on the Sprite's attrs
         */

    }, {
        key: '_setSpriteContext',
        value: function _setSpriteContext(sprite) {
            var ppp = _config2.default.ppp;

            this._context.translate(sprite.getX() * ppp, sprite.getY() * ppp);

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
         * @return {HTMLEntity} canvas
         */

    }, {
        key: 'getEl',
        value: function getEl() {
            return this._canvas;
        }

        /**
         * window (and subsequently, canvas el) resize callback
         * @return {[type]} [description]
         */

    }, {
        key: 'onResize',
        value: function onResize() {}

        /**
         * collects entity's Picls and renders them to canvas
         *
         * @param {Object} entity Any nbit entity
         */

    }, {
        key: 'render',
        value: function render(entity) {
            var picls = entity.render();

            this._context.save();

            if (entity instanceof _Sprite2.default) {
                this._setSpriteContext(entity);
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
    }, {
        key: 'renderPool',
        value: function renderPool(pool) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = pool[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var entity = _step2.value;

                    this.render(entity);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }]);

    return Canvas;
})();

exports.default = Canvas;

},{"./Sprite":8,"./config":10,"./lib/MaintainMax":15}],4:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Collision = require('./lib/Collision');

var _Collision2 = _interopRequireDefault(_Collision);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       Collision
 * @description Various forms of collision detection
 * @author      Chris Peters
 */

var Collision = (function () {
    function Collision() {
        _classCallCheck(this, Collision);
    }

    _createClass(Collision, null, [{
        key: 'hitTest',

        /**
         * returns true if x/y is inside entity's bounding box
         *
         * @param  {Integer} x      mouse/touch position
         * @param  {Integer} y      mouse/touch position
         * @param  {Sprite}  entity
         * @return {Boolean}
         */
        value: function hitTest(x, y, entity) {
            var ppp = _config2.default.ppp;
            var boundingBox = entity.getBoundingBox();

            for (var prop in boundingBox) {
                boundingBox[prop] *= ppp;
            }

            return _Collision2.default.hitTest(Math.floor(x), Math.floor(y), boundingBox);
        }
    }]);

    return Collision;
})();

exports.default = Collision;

},{"./config":10,"./lib/Collision":14}],5:[function(require,module,exports){
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

},{"./Picl":6,"./lib/Bresenham":11}],6:[function(require,module,exports){
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
        this._isDraggable = true;
    }

    _createClass(Sprite, [{
        key: 'getComposite',

        //
        // getters/setters
        //

        /**
         * @return {String}
         */
        value: function getComposite() {
            return this._composite;
        }
    }, {
        key: 'getIsDraggable',
        value: function getIsDraggable() {
            return this._isDraggable;
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
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       animate.Ticker
 * @description Executes callback and broadcasts event based on requestAnimationFrame
 * @author      Chris Peters
 */

var Ticker = (function () {
    /**
     * @param {Object} [deps] optional document and window dependancy injection for testing
     */

    function Ticker(deps) {
        _classCallCheck(this, Ticker);

        deps = deps || {};
        this._document = deps.document || document;
        this._window = deps.window || window;

        this._paused = false;
        this._ticks = 0;
        this._event = new CustomEvent('ontick', {
            detail: {
                _ticks: this._ticks
            }
        });
    }

    /**
     * [_update description]
     * @return {[type]} [description]
     */

    _createClass(Ticker, [{
        key: '_update',
        value: function _update() {
            if (this._paused) {
                return;
            }

            this.update(this._ticks);
            this._document.dispatchEvent(this._event);
            this._ticks++;

            this._window.requestAnimationFrame(this._update.bind(this));
        }

        /**
         * [pause description]
         * @return {[type]} [description]
         */

    }, {
        key: 'pause',
        value: function pause() {
            this._paused = true;
        }

        /**
         * [resume description]
         * @return {[type]} [description]
         */

    }, {
        key: 'resume',
        value: function resume() {
            this._paused = false;
            this.start();
        }

        /**
         * [start description]
         * @return {[type]} [description]
         */

    }, {
        key: 'start',
        value: function start() {
            this._update();

            return this;
        }

        /**
         * the callback executed on tick
         */

    }, {
        key: 'update',
        value: function update() {}
    }]);

    return Ticker;
})();

exports.default = Ticker;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @class       Config
 * @description The configuration object for nBit. This object does not conform to
 *              the underscore prefixed private property paradigm.
 * @author      Chris Peters
 */
exports.default = {
    // pixels per Picl
    ppp: 8,
    viewportWidth: 40,
    viewportHeight: 30,
    parentEl: document.body,
    parentElBgColor: '#000',
    canvasBgColor: '#FFF',
    useKeyboard: false,
    useMouse: true,
    useTouch: false
};

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       CanvasInteract
 * @description A module for handling keyboard, mouse, and touch events on the
 *              canvas. CanvasInput normalizes mouse/touch events into `press`
 *              and can check pointer events against an entity pool
 * @author      Chris Peters
 */

var CanvasInput = (function () {
    /**
     * @param {Object}     options
     * @param {HTMLEntity} options.canvas        The canvas element to interact with
     * @param {Function}   options.hitTestMethod the method for checking pointer events
     *                                           against entities in the entityPool. Should
     *                                           be a static method as not called in scope
     * @param {Object[]}   options.entityPool    an array of entities
     * @param {Boolean}    options.canvasFit     Set to true if using css to fit the canvas in the viewport
     * @param {Boolean}    options.useKeyboard   whether or not to listen for keyboard events
     * @param {Boolean}    options.useMouse      whether or not to listen for mouse events
     * @param {Boolean}    options.useTouch      whether or not to listen for touch events
     */

    function CanvasInput(options) {
        _classCallCheck(this, CanvasInput);

        this._canvas = options.canvas;
        this._hitTestMethod = options.hitTestMethod;
        this._canvasFit = options.canvasFit || false;
        this._entityPool = options.entityPool;

        this._pressCandidate = null;
        this._dragCandidate = null;
        this._dragCandidateOffsetX = null;
        this._dragCandidateOffsetY = null;
        this._canDrag = false;
        this._isDragging = false;

        if (options.useKeyboard) {
            this._addKeyboardListeners();
        }

        if (options.useMouse) {
            this._addMouseListeners();
        }

        if (options.useTouch) {
            this._addTouchListeners();
        }
    }

    _createClass(CanvasInput, [{
        key: '_addKeyboardListeners',
        value: function _addKeyboardListeners() {}
    }, {
        key: '_addMouseListeners',
        value: function _addMouseListeners() {
            var events = ['click', 'dblclick', 'mousedown', 'mouseup', 'mousemove'];

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var event = _step.value;

                    this._canvas.addEventListener(event, this._handleMouseAndTouch.bind(this), false);
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
    }, {
        key: '_addTouchListeners',
        value: function _addTouchListeners() {
            var events = ['tap', 'dbltap', 'touchstart', 'touchend', 'touchmove'];

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = events[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var event = _step2.value;

                    this._canvas.addEventListener(event, this._handleMouseAndTouch.bind(this), false);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: '_handleKeyboard',
        value: function _handleKeyboard() {}
    }, {
        key: '_handleMouseAndTouch',
        value: function _handleMouseAndTouch(inputEvent) {
            var scaleFactor = this._canvasFit ? 100 / this._getScaleFactor() / 100 : 1;
            var eventData = {
                domEvent: inputEvent
            };
            var eventTypes = [];

            if (inputEvent.hasOwnProperty('touches')) {
                eventData.absX = inputEvent.touches[0].pageX - this._canvas.offsetLeft;
                eventData.absY = inputEvent.touches[0].pageY - this._canvas.offsetTop;
            } else {
                eventData.absX = inputEvent.pageX - this._canvas.offsetLeft;
                eventData.absY = inputEvent.pageY - this._canvas.offsetTop;
            }

            // coordinate positions relative to canvas scaling
            eventData.x = eventData.absX * scaleFactor;
            eventData.y = eventData.absY * scaleFactor;

            eventData.target = this._hitTestMethod ? this._getEventTarget(eventData) : null;

            switch (inputEvent.type) {
                case 'click':
                case 'tap':
                    if (!this._pressCandidate || !eventData.target || this._pressCandidate._uid !== eventData.target._uid) {
                        // remove potential target if it was not pressed AND released on
                        eventData.target = undefined;
                    }
                    this._pressCandidate = null;
                    eventTypes.push('press');
                    break;
                case 'dblclick':
                case 'dbltap':
                    eventTypes.push('dblpress');
                    break;
                case 'mousedown':
                case 'touchstart':
                    this._pressCandidate = eventData.target;
                    this._dragCandidate = eventData.target && eventData.target.getIsDraggable() ? eventData.target : undefined;

                    if (this._dragCandidate) {
                        this._dragCandidateOffsetX = eventData.x - this._dragCandidate.getY();
                        this._dragCandidateOffsetY = eventData.y - this._dragCandidate.getY();
                    }

                    this._canDrag = true;
                    eventTypes.push('pressdown');
                    break;
                case 'mouseup':
                case 'touchend':
                    this._canDrag = false;
                    if (this._isDragging) {
                        this._isDragging = false;
                        this._dragCandidate = null;
                        eventTypes.push('dragend');
                    }
                    eventTypes.push('pressup');
                    break;
                /*
                // TODO decide whether to include...
                case 'touchleave':
                case 'touchcancel':
                    if (this._isDragging) {
                        this._isDragging = false;
                        this._dragCandidate = null;
                        eventTypes.push('dragleave');
                    }
                    eventTypes.push('pressleave');
                break;*/
                case 'mousemove':
                case 'touchmove':
                    if (this._canDrag && this._dragCandidate && this._dragCandidate.getIsDraggable()) {

                        this._dragCandidate.setX(eventData.x - this._dragCandidateOffsetX);
                        this._dragCandidate.setY(eventData.y - this._dragCandidateOffsetY);

                        if (!this._isDragging) {
                            this._isDragging = true;
                            eventTypes.push('dragstart');
                        }

                        eventTypes.push('drag');
                    }
                    break;
            }

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = eventTypes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var event = _step3.value;

                    this[event](eventData);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
        /**
         * get the scale factor of the canvas element
         *
         * @private
         * @return {Float}
         */

    }, {
        key: '_getScaleFactor',
        value: function _getScaleFactor() {
            var factor = 1;
            var canvasWidth = undefined;

            if (this._canvas.style.width) {
                canvasWidth = parseInt(this._canvas.style.width, 10);
                factor = canvasWidth / this._canvas.width;
            }

            return factor;
        }
    }, {
        key: '_getEventTarget',
        value: function _getEventTarget(event) {
            var topmostEntity = undefined;

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this._entityPool[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var entity = _step4.value;

                    if (typeof entity.getBoundingBox === 'function' && this._hitTestMethod(event.x, event.y, entity)) {
                        // continually assign higher sorted entity
                        topmostEntity = entity;
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            return topmostEntity;
        }

        // normalized event callbacks

    }, {
        key: 'dblpress',
        value: function dblpress() {}
    }, {
        key: 'drag',
        value: function drag() {}
    }, {
        key: 'dragend',
        value: function dragend() {}
    }, {
        key: 'dragstart',
        value: function dragstart() {}
    }, {
        key: 'press',
        value: function press() {}
    }, {
        key: 'pressdown',
        value: function pressdown() {}
    }, {
        key: 'pressup',
        value: function pressup() {}

        /**
         * @param {Object[]} pool An array of all entities in the game pool
         * @return {CanvasInput}
         */

    }, {
        key: 'setEntityPool',
        value: function setEntityPool(pool) {
            this._entityPool = pool;

            return this;
        }
    }]);

    return CanvasInput;
})();

exports.default = CanvasInput;

},{}],13:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       Collection
 * @description An array of wrapper items stored with a name and the item's value.
 * @author      Chris Peters
 */

var Collection = (function () {
    /**
     *
     */

    function Collection() {
        _classCallCheck(this, Collection);

        /**
         * @member {Array} SW.Collection.prototype._items - the sorted list
         * @private
         */
        this._items = [];
    }

    /**
     * add an item with optional name
     *
     * @param  {Any}        item    the item to add
     * @param  {String}     [name] the optional name of the item
     * @return {Collection}
     */

    _createClass(Collection, [{
        key: 'addItem',
        value: function addItem(item, name) {
            name = typeof name !== 'undefined' ? name : '';

            this._items.push({
                item: item, name: name
            });

            return this;
        }

        /**
         * add multiple items
         *
         * @param {...Object} items [description]
         */

    }, {
        key: 'addItems',
        value: function addItems() {
            for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
                items[_key] = arguments[_key];
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    if (_typeof(item.item) === 'object' && typeof item.name === 'string') {
                        // if item has item/name structure
                        this.addItem(item.item, item.name);
                    } else {
                        // for convenience allow user to add just item
                        this.addItem(item);
                    }
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

            return this;
        }

        /**
         * iterates the collection's sortedItems. The item, index, and name are supplied to the provided function
         *
         * @param {Function} fn
         * @param {Object}   scope
         */

    }, {
        key: 'each',
        value: function each(fn, scope) {
            var item = undefined;

            fn = scope ? fn.bind(scope) : fn;

            for (var i = 0, len = this._items.length; i < len; i++) {
                item = this._items[i];

                if (fn(item.item, i, item.name) === false) {
                    break;
                }
            }
        }
    }, {
        key: 'getArray',
        value: function getArray() {
            return this._items.map(function (item) {
                return item.item;
            });
        }
    }]);

    return Collection;
})();

exports.default = Collection;

},{}],14:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       Collision
 * @description Various forms of collision detection
 * @author      Chris Peters
 */

var Collision = (function () {
    function Collision() {
        _classCallCheck(this, Collision);
    }

    _createClass(Collision, null, [{
        key: "hitTest",

        /**
         * returns true if x/y is inside entity's bounding box
         *
         * @param  {Integer} x           mouse/touch position
         * @param  {Integer} y           mouse/touch position
         * @param  {Sprite}  boundingBox A bb object with top, left, right, bottom properties
         * @return {Boolean}
         */
        value: function hitTest(x, y, boundingBox) {
            return x >= boundingBox.left && x <= boundingBox.right && y >= boundingBox.top && y <= boundingBox.bottom;
        }
    }]);

    return Collision;
})();

exports.default = Collision;

},{}],15:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       MaintainMax
 * @description Keeps canvas element centered and (with aspect ratio intact) in the viewport
 * @author      Chris Peters
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwbGF5Z3JvdW5kL21haW4uanMiLCIuLi9zcmMvQml0bWFwLmpzIiwiLi4vc3JjL0NhbnZhcy5qcyIsIi4uL3NyYy9Db2xsaXNpb24uanMiLCIuLi9zcmMvTGluZS5qcyIsIi4uL3NyYy9QaWNsLmpzIiwiLi4vc3JjL1BvaW50LmpzIiwiLi4vc3JjL1Nwcml0ZS5qcyIsIi4uL3NyYy9UaWNrZXIuanMiLCIuLi9zcmMvY29uZmlnLmpzIiwiLi4vc3JjL2xpYi9CcmVzZW5oYW0uanMiLCIuLi9zcmMvbGliL0NhbnZhc0lucHV0LmpzIiwiLi4vc3JjL2xpYi9Db2xsZWN0aW9uLmpzIiwiLi4vc3JjL2xpYi9Db2xsaXNpb24uanMiLCIuLi9zcmMvbGliL01haW50YWluTWF4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1VBLElBQUksTUFBTSxHQUFHLHNCQUFZLENBQUM7QUFDMUIsSUFBSSxNQUFNLEdBQUcsc0JBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7QUFFbEMsSUFBSSxXQUFXLEdBQUcsMEJBQWdCO0FBQzlCLFlBQVEsRUFBRSxpQkFBTyxRQUFRO0FBQ3pCLFVBQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFO0FBQ3RCLGlCQUFhLEVBQUUsb0JBQVUsT0FBTztBQUNoQyxhQUFTLEVBQUUsSUFBSTtDQUNsQixDQUFDLENBQUM7O0FBRUgsSUFBSSxNQUFNLEdBQUcsc0JBQVksQ0FBQyxNQUFNLENBQUMsQ0FDN0IsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUN4QixDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQ3hCLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FDM0IsQ0FBQyxDQUFDOztB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WSxZQUFBLENBQUM7O0FBRWpCLGdCQUFJLFlBQVksRUFBRTtBQUNkLG9CQUFJLGVBQWUsR0FBRyxpQkFBaUIsRUFBRTtBQUNyQywrQkFBVyxHQUFHLFFBQVEsQ0FBQztBQUN2QixnQ0FBWSxHQUFHLFdBQVcsR0FBRyxlQUFlLENBQUM7QUFDN0MsNkJBQVMsR0FBRyxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUEsR0FBSSxDQUFDLENBQUM7aUJBQzlDLE1BQU07QUFDSCxnQ0FBWSxHQUFHLFNBQVMsQ0FBQztBQUN6QiwrQkFBVyxHQUFHLFNBQVMsR0FBRyxjQUFjLENBQUM7QUFDekMsOEJBQVUsR0FBRyxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUEsR0FBSSxDQUFDLENBQUM7aUJBQzdDO2FBQ0osTUFBTTtBQUNILG9CQUFJLGNBQWMsR0FBRyxnQkFBZ0IsRUFBRTtBQUNuQyxnQ0FBWSxHQUFHLFNBQVMsQ0FBQztBQUN6QiwrQkFBVyxHQUFHLFNBQVMsR0FBRyxjQUFjLENBQUM7QUFDekMsOEJBQVUsR0FBRyxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUEsR0FBSSxDQUFDLENBQUM7aUJBQzdDLE1BQU07QUFDSCwrQkFBVyxHQUFHLFFBQVEsQ0FBQztBQUN2QixnQ0FBWSxHQUFHLFdBQVcsR0FBRyxlQUFlLENBQUM7QUFDN0MsNkJBQVMsR0FBRyxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUEsR0FBSSxDQUFDLENBQUM7aUJBQzlDO2FBQ0o7O0FBRUQsbUJBQU87QUFDSCxxQkFBSyxFQUFFLFdBQVc7QUFDbEIsc0JBQU0sRUFBRSxZQUFZO0FBQ3BCLG9CQUFJLEVBQUUsVUFBVTtBQUNoQixtQkFBRyxFQUFFLFNBQVM7YUFDakIsQ0FBQztTQUNMOzs7V0FoRGdCLFdBQVc7OztrQkFBWCxXQUFXIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vc3JjL2NvbmZpZyc7XG5pbXBvcnQgQ2FudmFzIGZyb20gJy4uLy4uL3NyYy9DYW52YXMnO1xuaW1wb3J0IENvbGxpc2lvbiBmcm9tICcuLi8uLi9zcmMvQ29sbGlzaW9uJztcbmltcG9ydCBDb2xsZWN0aW9uIGZyb20gJy4uLy4uL3NyYy9saWIvQ29sbGVjdGlvbic7XG5pbXBvcnQgQ2FudmFzSW5wdXQgZnJvbSAnLi4vLi4vc3JjL2xpYi9DYW52YXNJbnB1dCc7XG5pbXBvcnQgVGlja2VyIGZyb20gJy4uLy4uL3NyYy9UaWNrZXInO1xuaW1wb3J0IFBvaW50IGZyb20gJy4uLy4uL3NyYy9Qb2ludCc7XG5pbXBvcnQgQml0bWFwIGZyb20gJy4uLy4uL3NyYy9CaXRtYXAnO1xuaW1wb3J0IExpbmUgZnJvbSAnLi4vLi4vc3JjL0xpbmUnO1xuXG5sZXQgY2FudmFzID0gbmV3IENhbnZhcygpO1xubGV0IHRpY2tlciA9IG5ldyBUaWNrZXIoKS5zdGFydCgpO1xuXG5sZXQgY2FudmFzSW5wdXQgPSBuZXcgQ2FudmFzSW5wdXQoe1xuICAgIHVzZU1vdXNlOiBjb25maWcudXNlTW91c2UsXG4gICAgY2FudmFzOiBjYW52YXMuZ2V0RWwoKSxcbiAgICBoaXRUZXN0TWV0aG9kOiBDb2xsaXNpb24uaGl0VGVzdCxcbiAgICBjYW52YXNGaXQ6IHRydWVcbn0pO1xuXG5sZXQgYml0bWFwID0gbmV3IEJpdG1hcCgpLmFkZE1hcChbXG4gICAgWycjNDNDJywgJyNDMzQnLCAnIzQzQyddLFxuICAgIFsnI0MzNCcsICcjM0M0JywgJyNDMzQnXSxcbiAgICBbJyM0M0MnLCAnI0MzNCcsICcjNDNDJ11cbl0pO1xuXG5sZXQgbGluZSA9IG5ldyBMaW5lKCkuc2V0UG9pbnRzKFxuICAgIG5ldyBQb2ludCgyLCA0KSxcbiAgICBuZXcgUG9pbnQoOCwgMTYpLFxuICAgIG5ldyBQb2ludCgzMiwgOClcbik7XG5cbmxldCBwb29sID0gbmV3IENvbGxlY3Rpb24oKS5hZGRJdGVtcyhcbiAgICBiaXRtYXAsIGxpbmVcbik7XG5cbmNhbnZhc0lucHV0LnNldEVudGl0eVBvb2wocG9vbC5nZXRBcnJheSgpKTtcbmNhbnZhc0lucHV0LnByZXNzID0gKGUpPT4gY29uc29sZS5sb2coZSk7XG5cbnRpY2tlci51cGRhdGUgPSAoKT0+IHtcbiAgICBjYW52YXMucmVuZGVyUG9vbChwb29sLmdldEFycmF5KCkpO1xufTsiLCJpbXBvcnQgU3ByaXRlIGZyb20gJy4vU3ByaXRlJztcbmltcG9ydCBQaWNsIGZyb20gJy4vUGljbCc7XG5cblxuLyoqXG4gKiBAY2xhc3MgICAgICAgQml0bWFwXG4gKiBAZGVzY3JpcHRpb24gTWFwcyAyZCBhcnJheXMgaW50byBibG9ja3NcbiAqIEBleHRlbmRzICAgICBTcHJpdGVcbiAqIEByZXF1aXJlcyAgICBQaWNsXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJpdG1hcCBleHRlbmRzIFNwcml0ZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fbWFwcyA9IFtdO1xuICAgICAgICB0aGlzLl9mcmFtZSA9IDA7XG4gICAgfVxuXG4gICAgYWRkTWFwKG1hcCkge1xuICAgICAgICB0aGlzLl9tYXBzLnB1c2gobWFwKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBnZXRCb3VuZGluZ0JveCgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZnQ6IHRoaXMuX3gsXG4gICAgICAgICAgICB0b3A6IHRoaXMuX3ksXG4gICAgICAgICAgICByaWdodDogdGhpcy5feCArIHRoaXMuX21hcHNbdGhpcy5fZnJhbWVdWzBdLmxlbmd0aCxcbiAgICAgICAgICAgIGJvdHRvbTogdGhpcy5feSArIHRoaXMuX21hcHNbdGhpcy5fZnJhbWVdLmxlbmd0aFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IG1hcCA9IHRoaXMuX21hcHNbdGhpcy5fZnJhbWVdLFxuICAgICAgICAgICAgcGljbHMgPSBbXSxcbiAgICAgICAgICAgIG1hcHksIG1hcHg7XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IDAsIGxlbnkgPSBtYXAubGVuZ3RoOyB5IDwgbGVueTsgeSsrKSB7XG4gICAgICAgICAgICBtYXB5ID0gbWFwW3ldO1xuXG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMCwgbGVueCA9IG1hcHkubGVuZ3RoOyB4IDwgbGVueDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgbWFweCA9IG1hcHlbeF07XG5cbiAgICAgICAgICAgICAgICBwaWNscy5wdXNoKG5ldyBQaWNsKHgsIHksIG1hcHgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwaWNscztcbiAgICB9XG5cbiAgICBzZXRGcmFtZSh2YWwpIHtcbiAgICAgICAgdGhpcy5fZnJhbWUgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuIiwiaW1wb3J0IE1haW50YWluTWF4IGZyb20gJy4vbGliL01haW50YWluTWF4JztcbmltcG9ydCBTcHJpdGUgZnJvbSAnLi9TcHJpdGUnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5cbi8qKlxuICogQGNsYXNzICAgICAgIENhbnZhc1xuICogQGRlc2NyaXB0aW9uIENyZWF0ZXMgYW5kIHJlbmRlcnMgdG8gdGhlIGNhbnZhcyBET00gZWxlbWVudFxuICogQGV4dGVuZHMgICAgIEdldFNldFxuICogQHJlcXVpcmVkICAgIE1haW50YWluTWF4XG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhcyB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtkZXBzXVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbZGVwcy5kb2N1bWVudF1cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW2RlcHMud2luZG93XVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGRlcHMpIHtcbiAgICAgICAgZGVwcyA9IGRlcHMgfHwge307XG4gICAgICAgIHRoaXMuX2RvY3VtZW50ID0gZGVwcy5kb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgICAgICAgdGhpcy5fd2luZG93ID0gZGVwcy53aW5kb3cgfHwgd2luZG93O1xuXG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLl9jb250ZXh0ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gY29uZmlnLnZpZXdwb3J0V2lkdGggKiBjb25maWcucHBwO1xuICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gY29uZmlnLnZpZXdwb3J0SGVpZ2h0ICogY29uZmlnLnBwcDtcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbmZpZy5jYW52YXNCZ0NvbG9yO1xuXG4gICAgICAgIGNvbmZpZy5wYXJlbnRFbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb25maWcucGFyZW50RWxCZ0NvbG9yO1xuICAgICAgICBjb25maWcucGFyZW50RWwuYXBwZW5kQ2hpbGQodGhpcy5fY2FudmFzKTtcblxuICAgICAgICB0aGlzLl93aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5faGFuZGxlUmVzaXplLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuX2hhbmRsZVJlc2l6ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFkanVzdCBjYW52YXMgTWFpbnRhaW5NYXggdG8gZml0IGNhbnZhcyB0byByZXNpemVkIHdpbmRvd1xuICAgICAqL1xuICAgIF9oYW5kbGVSZXNpemUoKSB7XG4gICAgICAgIGxldCB7IHRvcCwgbGVmdCwgd2lkdGgsIGhlaWdodCB9ID0gTWFpbnRhaW5NYXguZml0KFxuICAgICAgICAgICAgY29uZmlnLnZpZXdwb3J0V2lkdGggKiBjb25maWcucHBwLFxuICAgICAgICAgICAgY29uZmlnLnZpZXdwb3J0SGVpZ2h0ICogY29uZmlnLnBwcFxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS50b3AgPSBgJHtNYXRoLnJvdW5kKHRvcCl9cHhgO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUubGVmdCA9IGAke01hdGgucm91bmQobGVmdCl9cHhgO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUud2lkdGggPSBgJHtNYXRoLnJvdW5kKHdpZHRoKX1weGA7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5oZWlnaHQgPSBgJHtNYXRoLnJvdW5kKGhlaWdodCl9cHhgO1xuXG4gICAgICAgIHRoaXMub25SZXNpemUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZW5kZXIgUGljbHMgdG8gdGhlIGNhbnZhc1xuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB4ICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0geSAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gIGNvbG9yIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBfcmVuZGVyUGljbCh4LCB5LCBjb2xvcikge1xuICAgICAgICBsZXQgcHBwID0gY29uZmlnLnBwcDtcblxuICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGxSZWN0KHggKiBwcHAsIHkgKiBwcHAsIHBwcCwgcHBwKTtcbiAgICAgICAgdGhpcy5fY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYWRqdXN0IHRoZSBjYW52YXMgYmFzZWQgb24gdGhlIFNwcml0ZSdzIGF0dHJzXG4gICAgICovXG4gICAgX3NldFNwcml0ZUNvbnRleHQoc3ByaXRlKSB7XG4gICAgICAgIGxldCBwcHAgPSBjb25maWcucHBwO1xuXG4gICAgICAgIHRoaXMuX2NvbnRleHQudHJhbnNsYXRlKHNwcml0ZS5nZXRYKCkgKiBwcHAsIHNwcml0ZS5nZXRZKCkgKiBwcHApO1xuXG4gICAgICAgIHRoaXMuX2NvbnRleHQuc2NhbGUoc3ByaXRlLmdldFNjYWxlWCgpLCBzcHJpdGUuZ2V0U2NhbGVZKCkpO1xuXG4gICAgICAgIHRoaXMuX2NvbnRleHQucm90YXRlKHNwcml0ZS5nZXRSb3RhdGlvbigpKTtcblxuICAgICAgICBpZiAoc3ByaXRlLmdldE9wYWNpdHkoKSAhPT0gMSkge1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5nbG9iYWxBbHBoYSA9IHNwcml0ZS5nZXRPcGFjaXR5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3ByaXRlLmdldENvbXBvc2l0ZSgpICE9PSBTcHJpdGUuZ2V0Q29tcG9zaXRlRGVmYXVsdCgpKSB7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IHNwcml0ZS5nZXRDb21wb3NpdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge0hUTUxFbnRpdHl9IGNhbnZhc1xuICAgICAqL1xuICAgIGdldEVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FudmFzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHdpbmRvdyAoYW5kIHN1YnNlcXVlbnRseSwgY2FudmFzIGVsKSByZXNpemUgY2FsbGJhY2tcbiAgICAgKiBAcmV0dXJuIHtbdHlwZV19IFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBvblJlc2l6ZSgpIHt9XG5cbiAgICAvKipcbiAgICAgKiBjb2xsZWN0cyBlbnRpdHkncyBQaWNscyBhbmQgcmVuZGVycyB0aGVtIHRvIGNhbnZhc1xuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVudGl0eSBBbnkgbmJpdCBlbnRpdHlcbiAgICAgKi9cbiAgICByZW5kZXIoZW50aXR5KSB7XG4gICAgICAgIGxldCBwaWNscyA9IGVudGl0eS5yZW5kZXIoKTtcblxuICAgICAgICB0aGlzLl9jb250ZXh0LnNhdmUoKTtcblxuICAgICAgICBpZiAoZW50aXR5IGluc3RhbmNlb2YgU3ByaXRlKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXRTcHJpdGVDb250ZXh0KGVudGl0eSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBwaWNsIG9mIHBpY2xzKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJQaWNsKHBpY2wueCwgcGljbC55LCBwaWNsLmNvbG9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclBvb2wocG9vbCkge1xuICAgICAgICBmb3IgKGxldCBlbnRpdHkgb2YgcG9vbCkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoZW50aXR5KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBDb2xsaXNpb25MaWIgZnJvbSAnLi9saWIvQ29sbGlzaW9uJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuXG4vKipcbiAqIEBjbGFzcyAgICAgICBDb2xsaXNpb25cbiAqIEBkZXNjcmlwdGlvbiBWYXJpb3VzIGZvcm1zIG9mIGNvbGxpc2lvbiBkZXRlY3Rpb25cbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGlzaW9uIHtcbiAgICAvKipcbiAgICAgKiByZXR1cm5zIHRydWUgaWYgeC95IGlzIGluc2lkZSBlbnRpdHkncyBib3VuZGluZyBib3hcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHggICAgICBtb3VzZS90b3VjaCBwb3NpdGlvblxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHkgICAgICBtb3VzZS90b3VjaCBwb3NpdGlvblxuICAgICAqIEBwYXJhbSAge1Nwcml0ZX0gIGVudGl0eVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgc3RhdGljIGhpdFRlc3QoeCwgeSwgZW50aXR5KSB7XG4gICAgICAgIGxldCBwcHAgPSBjb25maWcucHBwO1xuICAgICAgICBsZXQgYm91bmRpbmdCb3ggPSBlbnRpdHkuZ2V0Qm91bmRpbmdCb3goKTtcblxuICAgICAgICBmb3IgKGxldCBwcm9wIGluIGJvdW5kaW5nQm94KSB7XG4gICAgICAgICAgICBib3VuZGluZ0JveFtwcm9wXSAqPSBwcHA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gQ29sbGlzaW9uTGliLmhpdFRlc3QoTWF0aC5mbG9vcih4KSwgTWF0aC5mbG9vcih5KSwgYm91bmRpbmdCb3gpO1xuICAgIH1cbn1cbiIsImltcG9ydCBCcmVzZW5oYW0gZnJvbSAnLi9saWIvQnJlc2VuaGFtJztcbmltcG9ydCBQaWNsIGZyb20gJy4vUGljbCc7XG5cbi8qKlxuICogQGNsYXNzICAgICAgIGRyYXcuTGluZVxuICogQGRlc2NyaXB0aW9uIFBsb3RzIFBpY2xzIGJldHdlZW4gKGFuZCBhdCkgbiBQb2ludHNcbiAqIEByZXF1aXJlcyAgICBCcmVzZW5oYW1cbiAqIEByZXF1aXJlcyAgICBQaWNsXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmUge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbY29sb3JdIEluaXRpYWwgY29sb3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb2xvciwgLi4ucG9pbnRzKSB7XG4gICAgICAgIHRoaXMuX3BpY2xzID0gW107XG4gICAgICAgIHRoaXMuX3BvaW50cyA9IFtwb2ludHNdO1xuICAgICAgICB0aGlzLl9zdHJva2VDb2xvciA9IGNvbG9yIHx8ICcjMDAwJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB0aGUgUGljbC1wdXNoZXIgdG8gcGFzcyB0byBCcmVzZW5oYW0ucGxvdExpbmVcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtICB7W3R5cGVdfSB4IFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIHtbdHlwZV19IHkgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIF9hZGRQaWNscyh4LCB5KSB7XG4gICAgICAgIHRoaXMuX3BpY2xzLnB1c2gobmV3IFBpY2woeCwgeSwgdGhpcy5fc3Ryb2tlQ29sb3IpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGxpbmUncyBwb2ludHNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UG9pbnR9IC4uLnBvaW50c1xuICAgICAqL1xuICAgIHNldFBvaW50cyguLi5wb2ludHMpIHtcbiAgICAgICAgaWYgKHBvaW50cy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xpbmUgbXVzdCBoYXZlIGF0IGxlYXN0IHR3byBwb2ludHMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3BvaW50cyA9IHBvaW50cztcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIC8vIGVtcHR5IHBpY2wgYXJyYXlcbiAgICAgICAgdGhpcy5fcGljbHMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5fcG9pbnRzLmxlbmd0aCAtIDE7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgQnJlc2VuaGFtLnBsb3RMaW5lKHRoaXMuX3BvaW50c1tpXSwgdGhpcy5fcG9pbnRzW2kgKyAxXSwgdGhpcy5fYWRkUGljbHMuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fcGljbHM7XG4gICAgfVxufVxuIiwiaW1wb3J0IFBvaW50IGZyb20gJy4vUG9pbnQnO1xuXG4vKipcbiAqIEBjbGFzcyAgICAgICBQaWNsXG4gKiBAZGVzY3JpcHRpb24gQmFzZSBkcmF3aW5nIG9iamVjdCBmb3IgYWxsIG5iaXQgY29tcG9uZW50cy4gVGhpcyBvYmplY3QgZG9lcyBub3RcbiAqICAgICAgICAgICAgICBjb25mb3JtIHRvIHRoZSB1bmRlcnNjb3JlLXByZWZpeGVkIHByaXZhdGUgcHJvcGVydHkgcGFyYWRpZ20uXG4gKiBAZXh0ZW5kcyAgICAgUG9pbnRcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGljbCBleHRlbmRzIFBvaW50IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IFt4XSAgICAgMmQgY29vcmRpbmF0ZVxuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gW3ldICAgICAyZCBjb29yZGluYXRlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICBbY29sb3JdIEluaXRpYWwgY29sb3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBjb2xvcikge1xuICAgICAgICBzdXBlcih4LCB5KTtcblxuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3IgfHwgJyMwMDAnO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGNsYXNzICAgICAgIFBvaW50XG4gKiBAZGVzY3JpcHRpb24gQ3JlYXRlIDJEIHBvaW50LiBUaGlzIG9iamVjdCBkb2VzIG5vdCBjb25mb3JtIHRvIHRoZVxuICogICAgICAgICAgICAgIHVuZGVyc2NvcmUtcHJlZml4ZWQgcHJpdmF0ZSBwcm9wZXJ0eSBwYXJhZGlnbS5cbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9pbnQge1xuICAgIC8qKlxuICAgICAqIGluaXRpYWxpemUgYSBwb2ludCB3aXRoIDAsMCBvciBnaXZlbiBjb29yZGluYXRlc1xuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHhcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICB0aGlzLnggPSB4IHx8IDA7XG4gICAgICAgIHRoaXMueSA9IHkgfHwgMDtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBTcHJpdGVcbiAqIEBkZXNjcmlwdGlvbiBCYXNlIGNsYXNzIGZvciBwb3NpdGlvbiBiYXNlZCBvYmplY3RzXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcml0ZSB7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHRoaXMuX3ggPSB4IHx8IDA7XG4gICAgICAgIHRoaXMuX3kgPSB5IHx8IDA7XG4gICAgICAgIHRoaXMuX3NjYWxlWCA9IDE7XG4gICAgICAgIHRoaXMuX3NjYWxlWSA9IDE7XG4gICAgICAgIHRoaXMuX3JvdGF0aW9uID0gMDtcbiAgICAgICAgdGhpcy5fY29tcG9zaXRlID0gU3ByaXRlLl9jb21wb3NpdGVEZWZhdWx0O1xuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gMTtcbiAgICAgICAgdGhpcy5faXNEcmFnZ2FibGUgPSB0cnVlO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRDb21wb3NpdGVEZWZhdWx0KCkge1xuICAgICAgICByZXR1cm4gU3ByaXRlLl9jb21wb3NpdGVEZWZhdWx0O1xuICAgIH1cblxuICAgIC8vXG4gICAgLy8gZ2V0dGVycy9zZXR0ZXJzXG4gICAgLy9cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRDb21wb3NpdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wb3NpdGU7XG4gICAgfVxuXG4gICAgZ2V0SXNEcmFnZ2FibGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0RyYWdnYWJsZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtGbG9hdH1cbiAgICAgKi9cbiAgICBnZXRPcGFjaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3BhY2l0eTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtGbG9hdH1cbiAgICAgKi9cbiAgICBnZXRSb3RhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JvdGF0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0U2NhbGVYKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh0aGlzLl9zY2FsZVgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0U2NhbGVZKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh0aGlzLl9zY2FsZVkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WCgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQodGhpcy5feCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRZKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh0aGlzLl95KTtcbiAgICB9XG5cbiAgICBzZXRDb21wb3NpdGUodmFsKSB7XG4gICAgICAgIHRoaXMuX2NvbXBvc2l0ZSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRPcGFjaXR5KHZhbCkge1xuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFJvdGF0aW9uKHZhbCkge1xuICAgICAgICB0aGlzLl9yb3RhdGlvbiA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRTY2FsZVgodmFsKSB7XG4gICAgICAgIHRoaXMuX3NjYWxlWCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRTY2FsZVkodmFsKSB7XG4gICAgICAgIHRoaXMuX3NjYWxlWSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRYKHZhbCkge1xuICAgICAgICB0aGlzLl94ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFkodmFsKSB7XG4gICAgICAgIHRoaXMuX3kgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5TcHJpdGUuX2NvbXBvc2l0ZURlZmF1bHQgPSAnc291cmNlLW92ZXInO1xuXG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBhbmltYXRlLlRpY2tlclxuICogQGRlc2NyaXB0aW9uIEV4ZWN1dGVzIGNhbGxiYWNrIGFuZCBicm9hZGNhc3RzIGV2ZW50IGJhc2VkIG9uIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaWNrZXIge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbZGVwc10gb3B0aW9uYWwgZG9jdW1lbnQgYW5kIHdpbmRvdyBkZXBlbmRhbmN5IGluamVjdGlvbiBmb3IgdGVzdGluZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGRlcHMpIHtcbiAgICAgICAgZGVwcyA9IGRlcHMgfHwge307XG4gICAgICAgIHRoaXMuX2RvY3VtZW50ID0gZGVwcy5kb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgICAgICAgdGhpcy5fd2luZG93ID0gZGVwcy53aW5kb3cgfHwgd2luZG93O1xuXG4gICAgICAgIHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl90aWNrcyA9IDA7XG4gICAgICAgIHRoaXMuX2V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdvbnRpY2snLCB7XG4gICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICBfdGlja3M6IHRoaXMuX3RpY2tzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFtfdXBkYXRlIGRlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4ge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIF91cGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLl9wYXVzZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlKHRoaXMuX3RpY2tzKTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCh0aGlzLl9ldmVudCk7XG4gICAgICAgIHRoaXMuX3RpY2tzKys7XG5cbiAgICAgICAgdGhpcy5fd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl91cGRhdGUuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogW3BhdXNlIGRlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4ge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIHBhdXNlKCkge1xuICAgICAgICB0aGlzLl9wYXVzZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFtyZXN1bWUgZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiB7W3R5cGVdfSBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgcmVzdW1lKCkge1xuICAgICAgICB0aGlzLl9wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFtzdGFydCBkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuIHtbdHlwZV19IFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdGhlIGNhbGxiYWNrIGV4ZWN1dGVkIG9uIHRpY2tcbiAgICAgKi9cbiAgICB1cGRhdGUoKSB7fVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgQ29uZmlnXG4gKiBAZGVzY3JpcHRpb24gVGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGZvciBuQml0LiBUaGlzIG9iamVjdCBkb2VzIG5vdCBjb25mb3JtIHRvXG4gKiAgICAgICAgICAgICAgdGhlIHVuZGVyc2NvcmUgcHJlZml4ZWQgcHJpdmF0ZSBwcm9wZXJ0eSBwYXJhZGlnbS5cbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICAgIC8vIHBpeGVscyBwZXIgUGljbFxuICAgIHBwcDogOCxcbiAgICB2aWV3cG9ydFdpZHRoOiA0MCxcbiAgICB2aWV3cG9ydEhlaWdodDogMzAsXG4gICAgcGFyZW50RWw6IGRvY3VtZW50LmJvZHksXG4gICAgcGFyZW50RWxCZ0NvbG9yOiAnIzAwMCcsXG4gICAgY2FudmFzQmdDb2xvcjogJyNGRkYnLFxuICAgIHVzZUtleWJvYXJkOiBmYWxzZSxcbiAgICB1c2VNb3VzZTogdHJ1ZSxcbiAgICB1c2VUb3VjaDogZmFsc2Vcbn07XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBCcmVzZW5oYW1cbiAqIEBkZXNjcmlwdGlvbiBCcmVzZW5oYW0ncyBmb3JtdWxhZSBmb3IgY2FsY3VsYXRpbmcgYmxvY2tzIGZyb20gY3VydmVzLCBiZXR3ZWVuIHBvaW50cyBldGMuXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKiBAcmVmZXJlbmNlICAgaHR0cDovL3Jvc2V0dGFjb2RlLm9yZy93aWtpL0JpdG1hcC9CcmVzZW5oYW0nc19saW5lX2FsZ29yaXRobVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCcmVzZW5oYW0ge1xuICAgIC8qKlxuICAgICAqIHBsb3QgdGhlIGNvbm5lY3RpbmcgYmxvY2tzIGJldHdlZW4gdHdvIHBvaW50c1xuICAgICAqIEBwYXJhbSB7UG9pbnR9IHB0QVxuICAgICAqIEBwYXJhbSB7UG9pbnR9IHB0QlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gd2hhdCB0byBkbyB3aGVuIGEgY29ubmVjdGlvbiBwb2ludCBpcyBjYWxjdWxhdGVkXG4gICAgICovXG4gICAgc3RhdGljIHBsb3RMaW5lKHB0QSwgcHRCLCBwbG90KSB7XG4gICAgICAgIGxldCBkeCA9IE1hdGguYWJzKHB0Qi54IC0gcHRBLngpO1xuICAgICAgICBsZXQgc3ggPSBwdEEueCA8IHB0Qi54ID8gMSA6IC0xO1xuICAgICAgICBsZXQgZHkgPSAtTWF0aC5hYnMocHRCLnkgLSBwdEEueSk7XG4gICAgICAgIGxldCBzeSA9IHB0QS55IDwgcHRCLnkgPyAxIDogLTE7XG4gICAgICAgIGxldCBlcnIgPSBkeCArIGR5LCBlMjtcblxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgcGxvdChwdEEueCwgcHRBLnkpO1xuXG4gICAgICAgICAgICBpZiAocHRBLnggPT0gcHRCLnggJiYgcHRBLnkgPT0gcHRCLnkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZTIgPSAyICogZXJyO1xuXG4gICAgICAgICAgICBpZiAoZTIgPj0gZHkpIHtcbiAgICAgICAgICAgICAgICBlcnIgKz0gZHk7XG4gICAgICAgICAgICAgICAgcHRBLnggKz0gc3g7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlMiA8PSBkeCkge1xuICAgICAgICAgICAgICAgIGVyciArPSBkeDtcbiAgICAgICAgICAgICAgICBwdEEueSArPSBzeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFtwbG90RWxsaXBzZSBkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuIHtbdHlwZV19IFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBzdGF0aWMgcGxvdEVsbGlwc2UoKSB7XG5cbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBDYW52YXNJbnRlcmFjdFxuICogQGRlc2NyaXB0aW9uIEEgbW9kdWxlIGZvciBoYW5kbGluZyBrZXlib2FyZCwgbW91c2UsIGFuZCB0b3VjaCBldmVudHMgb24gdGhlXG4gKiAgICAgICAgICAgICAgY2FudmFzLiBDYW52YXNJbnB1dCBub3JtYWxpemVzIG1vdXNlL3RvdWNoIGV2ZW50cyBpbnRvIGBwcmVzc2BcbiAqICAgICAgICAgICAgICBhbmQgY2FuIGNoZWNrIHBvaW50ZXIgZXZlbnRzIGFnYWluc3QgYW4gZW50aXR5IHBvb2xcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzSW5wdXQge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7SFRNTEVudGl0eX0gb3B0aW9ucy5jYW52YXMgICAgICAgIFRoZSBjYW52YXMgZWxlbWVudCB0byBpbnRlcmFjdCB3aXRoXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gICBvcHRpb25zLmhpdFRlc3RNZXRob2QgdGhlIG1ldGhvZCBmb3IgY2hlY2tpbmcgcG9pbnRlciBldmVudHNcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZ2FpbnN0IGVudGl0aWVzIGluIHRoZSBlbnRpdHlQb29sLiBTaG91bGRcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZSBhIHN0YXRpYyBtZXRob2QgYXMgbm90IGNhbGxlZCBpbiBzY29wZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0W119ICAgb3B0aW9ucy5lbnRpdHlQb29sICAgIGFuIGFycmF5IG9mIGVudGl0aWVzXG4gICAgICogQHBhcmFtIHtCb29sZWFufSAgICBvcHRpb25zLmNhbnZhc0ZpdCAgICAgU2V0IHRvIHRydWUgaWYgdXNpbmcgY3NzIHRvIGZpdCB0aGUgY2FudmFzIGluIHRoZSB2aWV3cG9ydFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgb3B0aW9ucy51c2VLZXlib2FyZCAgIHdoZXRoZXIgb3Igbm90IHRvIGxpc3RlbiBmb3Iga2V5Ym9hcmQgZXZlbnRzXG4gICAgICogQHBhcmFtIHtCb29sZWFufSAgICBvcHRpb25zLnVzZU1vdXNlICAgICAgd2hldGhlciBvciBub3QgdG8gbGlzdGVuIGZvciBtb3VzZSBldmVudHNcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59ICAgIG9wdGlvbnMudXNlVG91Y2ggICAgICB3aGV0aGVyIG9yIG5vdCB0byBsaXN0ZW4gZm9yIHRvdWNoIGV2ZW50c1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fY2FudmFzID0gb3B0aW9ucy5jYW52YXM7XG4gICAgICAgIHRoaXMuX2hpdFRlc3RNZXRob2QgPSBvcHRpb25zLmhpdFRlc3RNZXRob2Q7XG4gICAgICAgIHRoaXMuX2NhbnZhc0ZpdCA9IG9wdGlvbnMuY2FudmFzRml0IHx8IGZhbHNlO1xuICAgICAgICB0aGlzLl9lbnRpdHlQb29sID0gb3B0aW9ucy5lbnRpdHlQb29sO1xuXG4gICAgICAgIHRoaXMuX3ByZXNzQ2FuZGlkYXRlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fZHJhZ0NhbmRpZGF0ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2RyYWdDYW5kaWRhdGVPZmZzZXRYID0gbnVsbDtcbiAgICAgICAgdGhpcy5fZHJhZ0NhbmRpZGF0ZU9mZnNldFkgPSBudWxsO1xuICAgICAgICB0aGlzLl9jYW5EcmFnID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzRHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgICAgICBpZiAob3B0aW9ucy51c2VLZXlib2FyZCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkS2V5Ym9hcmRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLnVzZU1vdXNlKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRNb3VzZUxpc3RlbmVycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMudXNlVG91Y2gpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZFRvdWNoTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfYWRkS2V5Ym9hcmRMaXN0ZW5lcnMoKSB7XG5cbiAgICB9XG5cbiAgICBfYWRkTW91c2VMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGxldCBldmVudHMgPSBbJ2NsaWNrJywgJ2RibGNsaWNrJywgJ21vdXNlZG93bicsICdtb3VzZXVwJywgJ21vdXNlbW92ZSddO1xuXG4gICAgICAgIGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMuX2hhbmRsZU1vdXNlQW5kVG91Y2guYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2FkZFRvdWNoTGlzdGVuZXJzKCkge1xuICAgICAgICBsZXQgZXZlbnRzID0gWyd0YXAnLCAnZGJsdGFwJywgJ3RvdWNoc3RhcnQnLCAndG91Y2hlbmQnLCAndG91Y2htb3ZlJ107XG5cbiAgICAgICAgZm9yIChsZXQgZXZlbnQgb2YgZXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy5faGFuZGxlTW91c2VBbmRUb3VjaC5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfaGFuZGxlS2V5Ym9hcmQoKSB7XG5cbiAgICB9XG5cbiAgICBfaGFuZGxlTW91c2VBbmRUb3VjaChpbnB1dEV2ZW50KSB7XG4gICAgICAgIGxldCBzY2FsZUZhY3RvciA9IHRoaXMuX2NhbnZhc0ZpdCA/IDEwMCAvIHRoaXMuX2dldFNjYWxlRmFjdG9yKCkgLyAxMDAgOiAxO1xuICAgICAgICBsZXQgZXZlbnREYXRhID0ge1xuICAgICAgICAgICAgZG9tRXZlbnQ6IGlucHV0RXZlbnRcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGV2ZW50VHlwZXMgPSBbXTtcblxuICAgICAgICBpZiAoaW5wdXRFdmVudC5oYXNPd25Qcm9wZXJ0eSgndG91Y2hlcycpKSB7XG4gICAgICAgICAgICBldmVudERhdGEuYWJzWCA9IGlucHV0RXZlbnQudG91Y2hlc1swXS5wYWdlWCAtIHRoaXMuX2NhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgZXZlbnREYXRhLmFic1kgPSBpbnB1dEV2ZW50LnRvdWNoZXNbMF0ucGFnZVkgLSB0aGlzLl9jYW52YXMub2Zmc2V0VG9wO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXZlbnREYXRhLmFic1ggPSBpbnB1dEV2ZW50LnBhZ2VYIC0gdGhpcy5fY2FudmFzLm9mZnNldExlZnQ7XG4gICAgICAgICAgICBldmVudERhdGEuYWJzWSA9IGlucHV0RXZlbnQucGFnZVkgLSB0aGlzLl9jYW52YXMub2Zmc2V0VG9wO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29vcmRpbmF0ZSBwb3NpdGlvbnMgcmVsYXRpdmUgdG8gY2FudmFzIHNjYWxpbmdcbiAgICAgICAgZXZlbnREYXRhLnggPSBldmVudERhdGEuYWJzWCAqIHNjYWxlRmFjdG9yO1xuICAgICAgICBldmVudERhdGEueSA9IGV2ZW50RGF0YS5hYnNZICogc2NhbGVGYWN0b3I7XG5cbiAgICAgICAgZXZlbnREYXRhLnRhcmdldCA9IHRoaXMuX2hpdFRlc3RNZXRob2QgPyB0aGlzLl9nZXRFdmVudFRhcmdldChldmVudERhdGEpIDogbnVsbDtcblxuICAgICAgICBzd2l0Y2goaW5wdXRFdmVudC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdjbGljayc6XG4gICAgICAgICAgICBjYXNlICd0YXAnOlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fcHJlc3NDYW5kaWRhdGUgfHwgIWV2ZW50RGF0YS50YXJnZXQgfHwgdGhpcy5fcHJlc3NDYW5kaWRhdGUuX3VpZCAhPT0gZXZlbnREYXRhLnRhcmdldC5fdWlkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBwb3RlbnRpYWwgdGFyZ2V0IGlmIGl0IHdhcyBub3QgcHJlc3NlZCBBTkQgcmVsZWFzZWQgb25cbiAgICAgICAgICAgICAgICAgICAgZXZlbnREYXRhLnRhcmdldCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJlc3NDYW5kaWRhdGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIGV2ZW50VHlwZXMucHVzaCgncHJlc3MnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZGJsY2xpY2snOlxuICAgICAgICAgICAgY2FzZSAnZGJsdGFwJzpcbiAgICAgICAgICAgICAgICBldmVudFR5cGVzLnB1c2goJ2RibHByZXNzJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21vdXNlZG93bic6XG4gICAgICAgICAgICBjYXNlICd0b3VjaHN0YXJ0JzpcbiAgICAgICAgICAgICAgICB0aGlzLl9wcmVzc0NhbmRpZGF0ZSA9IGV2ZW50RGF0YS50YXJnZXQ7XG4gICAgICAgICAgICAgICAgdGhpcy5fZHJhZ0NhbmRpZGF0ZSA9IGV2ZW50RGF0YS50YXJnZXQgJiYgZXZlbnREYXRhLnRhcmdldC5nZXRJc0RyYWdnYWJsZSgpID8gZXZlbnREYXRhLnRhcmdldCA6IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kcmFnQ2FuZGlkYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RyYWdDYW5kaWRhdGVPZmZzZXRYID0gZXZlbnREYXRhLnggLSB0aGlzLl9kcmFnQ2FuZGlkYXRlLmdldFkoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZHJhZ0NhbmRpZGF0ZU9mZnNldFkgPSBldmVudERhdGEueSAtIHRoaXMuX2RyYWdDYW5kaWRhdGUuZ2V0WSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbkRyYWcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGV2ZW50VHlwZXMucHVzaCgncHJlc3Nkb3duJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21vdXNldXAnOlxuICAgICAgICAgICAgY2FzZSAndG91Y2hlbmQnOlxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbkRyYWcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RyYWdDYW5kaWRhdGUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBldmVudFR5cGVzLnB1c2goJ2RyYWdlbmQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXZlbnRUeXBlcy5wdXNoKCdwcmVzc3VwJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAvLyBUT0RPIGRlY2lkZSB3aGV0aGVyIHRvIGluY2x1ZGUuLi5cbiAgICAgICAgICAgIGNhc2UgJ3RvdWNobGVhdmUnOlxuICAgICAgICAgICAgY2FzZSAndG91Y2hjYW5jZWwnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZHJhZ0NhbmRpZGF0ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50VHlwZXMucHVzaCgnZHJhZ2xlYXZlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV2ZW50VHlwZXMucHVzaCgncHJlc3NsZWF2ZScpO1xuICAgICAgICAgICAgYnJlYWs7Ki9cbiAgICAgICAgICAgIGNhc2UgJ21vdXNlbW92ZSc6XG4gICAgICAgICAgICBjYXNlICd0b3VjaG1vdmUnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jYW5EcmFnICYmIHRoaXMuX2RyYWdDYW5kaWRhdGUgJiYgdGhpcy5fZHJhZ0NhbmRpZGF0ZS5nZXRJc0RyYWdnYWJsZSgpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZHJhZ0NhbmRpZGF0ZS5zZXRYKGV2ZW50RGF0YS54IC0gdGhpcy5fZHJhZ0NhbmRpZGF0ZU9mZnNldFgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kcmFnQ2FuZGlkYXRlLnNldFkoZXZlbnREYXRhLnkgLSB0aGlzLl9kcmFnQ2FuZGlkYXRlT2Zmc2V0WSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50VHlwZXMucHVzaCgnZHJhZ3N0YXJ0Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBldmVudFR5cGVzLnB1c2goJ2RyYWcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGV2ZW50IG9mIGV2ZW50VHlwZXMpIHtcbiAgICAgICAgICAgIHRoaXNbZXZlbnRdKGV2ZW50RGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogZ2V0IHRoZSBzY2FsZSBmYWN0b3Igb2YgdGhlIGNhbnZhcyBlbGVtZW50XG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEByZXR1cm4ge0Zsb2F0fVxuICAgICAqL1xuICAgIF9nZXRTY2FsZUZhY3RvcigpIHtcbiAgICAgICAgbGV0IGZhY3RvciA9IDE7XG4gICAgICAgIGxldCBjYW52YXNXaWR0aDtcblxuICAgICAgICBpZiAodGhpcy5fY2FudmFzLnN0eWxlLndpZHRoKSB7XG4gICAgICAgICAgICBjYW52YXNXaWR0aCA9IHBhcnNlSW50KHRoaXMuX2NhbnZhcy5zdHlsZS53aWR0aCwgMTApO1xuICAgICAgICAgICAgZmFjdG9yID0gY2FudmFzV2lkdGggLyB0aGlzLl9jYW52YXMud2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFjdG9yO1xuICAgIH1cblxuICAgIF9nZXRFdmVudFRhcmdldChldmVudCkge1xuICAgICAgICBsZXQgdG9wbW9zdEVudGl0eTtcblxuICAgICAgICBmb3IgKGxldCBlbnRpdHkgb2YgdGhpcy5fZW50aXR5UG9vbCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBlbnRpdHkuZ2V0Qm91bmRpbmdCb3ggPT09ICdmdW5jdGlvbicgJiZcbiAgICAgICAgICAgICAgICB0aGlzLl9oaXRUZXN0TWV0aG9kKGV2ZW50LngsIGV2ZW50LnksIGVudGl0eSkpIHtcbiAgICAgICAgICAgICAgICAvLyBjb250aW51YWxseSBhc3NpZ24gaGlnaGVyIHNvcnRlZCBlbnRpdHlcbiAgICAgICAgICAgICAgICB0b3Btb3N0RW50aXR5ID0gZW50aXR5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRvcG1vc3RFbnRpdHk7XG4gICAgfVxuXG4gICAgLy8gbm9ybWFsaXplZCBldmVudCBjYWxsYmFja3NcbiAgICBkYmxwcmVzcygpIHt9XG4gICAgZHJhZygpIHt9XG4gICAgZHJhZ2VuZCgpIHt9XG4gICAgZHJhZ3N0YXJ0KCkge31cbiAgICBwcmVzcygpIHt9XG4gICAgcHJlc3Nkb3duKCkge31cbiAgICBwcmVzc3VwKCkge31cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0W119IHBvb2wgQW4gYXJyYXkgb2YgYWxsIGVudGl0aWVzIGluIHRoZSBnYW1lIHBvb2xcbiAgICAgKiBAcmV0dXJuIHtDYW52YXNJbnB1dH1cbiAgICAgKi9cbiAgICBzZXRFbnRpdHlQb29sKHBvb2wpIHtcbiAgICAgICAgdGhpcy5fZW50aXR5UG9vbCA9IHBvb2w7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgQ29sbGVjdGlvblxuICogQGRlc2NyaXB0aW9uIEFuIGFycmF5IG9mIHdyYXBwZXIgaXRlbXMgc3RvcmVkIHdpdGggYSBuYW1lIGFuZCB0aGUgaXRlbSdzIHZhbHVlLlxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsZWN0aW9uIHtcbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7QXJyYXl9IFNXLkNvbGxlY3Rpb24ucHJvdG90eXBlLl9pdGVtcyAtIHRoZSBzb3J0ZWQgbGlzdFxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5faXRlbXMgPSBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBhZGQgYW4gaXRlbSB3aXRoIG9wdGlvbmFsIG5hbWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0FueX0gICAgICAgIGl0ZW0gICAgdGhlIGl0ZW0gdG8gYWRkXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgICAgW25hbWVdIHRoZSBvcHRpb25hbCBuYW1lIG9mIHRoZSBpdGVtXG4gICAgICogQHJldHVybiB7Q29sbGVjdGlvbn1cbiAgICAgKi9cbiAgICBhZGRJdGVtKGl0ZW0sIG5hbWUpIHtcbiAgICAgICAgbmFtZSA9IHR5cGVvZiBuYW1lICE9PSAndW5kZWZpbmVkJyA/IG5hbWUgOiAnJztcblxuICAgICAgICB0aGlzLl9pdGVtcy5wdXNoKHtcbiAgICAgICAgICAgIGl0ZW0sIG5hbWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYWRkIG11bHRpcGxlIGl0ZW1zXG4gICAgICpcbiAgICAgKiBAcGFyYW0gey4uLk9iamVjdH0gaXRlbXMgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIGFkZEl0ZW1zKC4uLml0ZW1zKSB7XG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbS5pdGVtID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgaXRlbS5uYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIC8vIGlmIGl0ZW0gaGFzIGl0ZW0vbmFtZSBzdHJ1Y3R1cmVcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEl0ZW0oaXRlbS5pdGVtLCBpdGVtLm5hbWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBmb3IgY29udmVuaWVuY2UgYWxsb3cgdXNlciB0byBhZGQganVzdCBpdGVtXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaXRlcmF0ZXMgdGhlIGNvbGxlY3Rpb24ncyBzb3J0ZWRJdGVtcy4gVGhlIGl0ZW0sIGluZGV4LCBhbmQgbmFtZSBhcmUgc3VwcGxpZWQgdG8gdGhlIHByb3ZpZGVkIGZ1bmN0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgIHNjb3BlXG4gICAgICovXG4gICAgZWFjaChmbiwgc2NvcGUpIHtcbiAgICAgICAgbGV0IGl0ZW07XG5cbiAgICAgICAgZm4gPSBzY29wZSA/IGZuLmJpbmQoc2NvcGUpIDogZm47XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMuX2l0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpdGVtID0gdGhpcy5faXRlbXNbaV07XG5cbiAgICAgICAgICAgIGlmIChmbihpdGVtLml0ZW0sIGksIGl0ZW0ubmFtZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRBcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaXRlbTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgQ29sbGlzaW9uXG4gKiBAZGVzY3JpcHRpb24gVmFyaW91cyBmb3JtcyBvZiBjb2xsaXNpb24gZGV0ZWN0aW9uXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxpc2lvbiB7XG4gICAgLyoqXG4gICAgICogcmV0dXJucyB0cnVlIGlmIHgveSBpcyBpbnNpZGUgZW50aXR5J3MgYm91bmRpbmcgYm94XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB4ICAgICAgICAgICBtb3VzZS90b3VjaCBwb3NpdGlvblxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHkgICAgICAgICAgIG1vdXNlL3RvdWNoIHBvc2l0aW9uXG4gICAgICogQHBhcmFtICB7U3ByaXRlfSAgYm91bmRpbmdCb3ggQSBiYiBvYmplY3Qgd2l0aCB0b3AsIGxlZnQsIHJpZ2h0LCBib3R0b20gcHJvcGVydGllc1xuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgc3RhdGljIGhpdFRlc3QoeCwgeSwgYm91bmRpbmdCb3gpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHggPj0gYm91bmRpbmdCb3gubGVmdCAgJiZcbiAgICAgICAgICAgIHggPD0gYm91bmRpbmdCb3gucmlnaHQgJiZcbiAgICAgICAgICAgIHkgPj0gYm91bmRpbmdCb3gudG9wICAgJiZcbiAgICAgICAgICAgIHkgPD0gYm91bmRpbmdCb3guYm90dG9tXG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgTWFpbnRhaW5NYXhcbiAqIEBkZXNjcmlwdGlvbiBLZWVwcyBjYW52YXMgZWxlbWVudCBjZW50ZXJlZCBhbmQgKHdpdGggYXNwZWN0IHJhdGlvIGludGFjdCkgaW4gdGhlIHZpZXdwb3J0XG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW50YWluTWF4IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtudW1iZXJ9IHdpZHRoIC0gdGhlIGVsZW1lbnQncyB3aWR0aFxuICAgICAqIEBwYXJhbSAge251bWJlcn0gaGVpZ2h0IC0gdGhlIGVsZW1lbnQncyBoZWlnaHRcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IHRoZSBuZXcgdG9wLCBsZWZ0LCB3aWR0aCwgJiBoZWlnaHRcbiAgICAgKi9cbiAgICBzdGF0aWMgZml0KHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgY29uc3QgTEFORFNDQVBFX1JBVElPID0gaGVpZ2h0IC8gd2lkdGg7XG4gICAgICAgIGNvbnN0IFBPUlRSQUlUX1JBVElPICA9IHdpZHRoIC8gaGVpZ2h0O1xuICAgICAgICBjb25zdCBJU19MQU5EU0NBUEUgICAgPSBMQU5EU0NBUEVfUkFUSU8gPCBQT1JUUkFJVF9SQVRJTyA/IHRydWUgOiBmYWxzZTtcblxuICAgICAgICBsZXQgd2luV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgbGV0IHdpbkhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgbGV0IHdpbkxhbmRzY2FwZVJhdGlvID0gd2luSGVpZ2h0IC8gd2luV2lkdGg7XG4gICAgICAgIGxldCB3aW5Qb3J0cmFpdFJhdGlvICA9IHdpbldpZHRoIC8gd2luSGVpZ2h0O1xuICAgICAgICBsZXQgb2Zmc2V0TGVmdCA9IDA7XG4gICAgICAgIGxldCBvZmZzZXRUb3AgID0gMDtcbiAgICAgICAgbGV0IG9mZnNldFdpZHRoO1xuICAgICAgICBsZXQgb2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgIGlmIChJU19MQU5EU0NBUEUpIHtcbiAgICAgICAgICAgIGlmIChMQU5EU0NBUEVfUkFUSU8gPCB3aW5MYW5kc2NhcGVSYXRpbykge1xuICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoID0gd2luV2lkdGg7XG4gICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gb2Zmc2V0V2lkdGggKiBMQU5EU0NBUEVfUkFUSU87XG4gICAgICAgICAgICAgICAgb2Zmc2V0VG9wID0gKHdpbkhlaWdodCAtIG9mZnNldEhlaWdodCkgLyAyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSB3aW5IZWlnaHQ7XG4gICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB3aW5IZWlnaHQgKiBQT1JUUkFJVF9SQVRJTztcbiAgICAgICAgICAgICAgICBvZmZzZXRMZWZ0ID0gKHdpbldpZHRoIC0gb2Zmc2V0V2lkdGgpIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChQT1JUUkFJVF9SQVRJTyA8IHdpblBvcnRyYWl0UmF0aW8pIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSB3aW5IZWlnaHQ7XG4gICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB3aW5IZWlnaHQgKiBQT1JUUkFJVF9SQVRJTztcbiAgICAgICAgICAgICAgICBvZmZzZXRMZWZ0ID0gKHdpbldpZHRoIC0gb2Zmc2V0V2lkdGgpIC8gMjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB3aW5XaWR0aDtcbiAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSBvZmZzZXRXaWR0aCAqIExBTkRTQ0FQRV9SQVRJTztcbiAgICAgICAgICAgICAgICBvZmZzZXRUb3AgPSAod2luSGVpZ2h0IC0gb2Zmc2V0SGVpZ2h0KSAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IG9mZnNldFdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBvZmZzZXRIZWlnaHQsXG4gICAgICAgICAgICBsZWZ0OiBvZmZzZXRMZWZ0LFxuICAgICAgICAgICAgdG9wOiBvZmZzZXRUb3BcbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=
