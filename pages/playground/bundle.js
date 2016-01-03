(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _config = require('../../src/config');

var _config2 = _interopRequireDefault(_config);

var _Canvas = require('../../src/Canvas');

var _Canvas2 = _interopRequireDefault(_Canvas);

var _Point = require('../../src/Point');

var _Point2 = _interopRequireDefault(_Point);

var _Bitmap = require('../../src/Bitmap');

var _Bitmap2 = _interopRequireDefault(_Bitmap);

var _Collision = require('../../src/Collision');

var _Collision2 = _interopRequireDefault(_Collision);

var _Collection = require('../../src/lib/Collection');

var _Collection2 = _interopRequireDefault(_Collection);

var _CanvasInput = require('../../src/lib/CanvasInput');

var _CanvasInput2 = _interopRequireDefault(_CanvasInput);

var _Line = require('../../src/Line');

var _Line2 = _interopRequireDefault(_Line);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = new _Canvas2.default();

var canvasInput = new _CanvasInput2.default({
    useMouse: _config2.default.useMouse,
    canvas: canvas.getEl(),
    hitTestMethod: _Collision2.default.hitTest,
    canvasFit: true
});

var bitmap = new _Bitmap2.default().addMap([['#43C', '#C34', '#43C'], ['#C34', '#3C4', '#C34'], ['#43C', '#C34', '#43C']]);

var line = new _Line2.default().setPoints(new _Point2.default(2, 4), new _Point2.default(8, 16), new _Point2.default(32, 8));

var pool = new _Collection2.default().addItems(bitmap);

canvasInput.setEntityPool(pool);

canvas.render(line);
canvas.render(bitmap);

canvasInput.press = function (e) {
    return console.log(e);
};

},{"../../src/Bitmap":2,"../../src/Canvas":3,"../../src/Collision":4,"../../src/Line":5,"../../src/Point":7,"../../src/config":9,"../../src/lib/CanvasInput":11,"../../src/lib/Collection":12}],2:[function(require,module,exports){
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

},{"./Sprite":8,"./config":9,"./lib/MaintainMax":14}],4:[function(require,module,exports){
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

},{"./config":9,"./lib/Collision":13}],5:[function(require,module,exports){
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

},{"./Picl":6,"./lib/Bresenham":10}],6:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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
     * @param {Object[]}   options.entityPool    an array of entities (currently only supports type Collection)
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
                    this._dragCandidate = eventData.target && eventData.target.draggable() ? eventData.target : undefined;

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
                    if (this._canDrag && this._dragCandidate && this._dragCandidate.isDraggable()) {

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

            // check if entityPool exists and is of type Collection
            if (this._entityPool && this._entityPool.each) {
                this._entityPool.each(function (entity) {
                    if (this._hitTestMethod(event.x, event.y, entity)) {
                        // continually assign higher sorted entity
                        topmostEntity = entity;
                    }
                }, this);
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

},{}],12:[function(require,module,exports){
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
    }]);

    return Collection;
})();

exports.default = Collection;

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwbGF5Z3JvdW5kL21haW4uanMiLCIuLi9zcmMvQml0bWFwLmpzIiwiLi4vc3JjL0NhbnZhcy5qcyIsIi4uL3NyYy9Db2xsaXNpb24uanMiLCIuLi9zcmMvTGluZS5qcyIsIi4uL3NyYy9QaWNsLmpzIiwiLi4vc3JjL1BvaW50LmpzIiwiLi4vc3JjL1Nwcml0ZS5qcyIsIi4uL3NyYy9jb25maWcuanMiLCIuLi9zcmMvbGliL0JyZXNlbmhhbS5qcyIsIi4uL3NyYy9saWIvQ2FudmFzSW5wdXQuanMiLCIuLi9zcmMvbGliL0NvbGxlY3Rpb24uanMiLCIuLi9zcmMvbGliL0NvbGxpc2lvbi5qcyIsIi4uL3NyYy9saWIvTWFpbnRhaW5NYXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNTQSxJQUFJLE1BQU0sR0FBRyxzQkFBWSxDQUFDOztBQUUxQixJQUFJLFdBQVcsR0FBRywwQkFBZ0I7QUFDOUIsWUFBUSxFQUFFLGlCQUFPLFFBQVE7QUFDekIsVUFBTSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUU7QUFDdEIsaUJBQWEsRUFBRSxvQkFBVSxPQUFPO0FBQ2hDLGFBQVMsRUFBRSxJQUFJO0NBQ2xCLENBQUMsQ0FBQzs7QUFFSCxJQUFJLE1BQU0sR0FBRyxzQkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUM3QixDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQ3hCLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFDeEIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUMzQixDQUFDLENBQUM7O0FBRUgsSUFBSSxJQUFJLEdBQUcsb0JBQVUsQ0FBQyxTQUFTLENBQzNCLG9CQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsRUFD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QU07QUFDSCwrQkFBVyxHQUFHLFFBQVEsQ0FBQztBQUN2QixnQ0FBWSxHQUFHLFdBQVcsR0FBRyxlQUFlLENBQUM7QUFDN0MsNkJBQVMsR0FBRyxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUEsR0FBSSxDQUFDLENBQUM7aUJBQzlDO2FBQ0o7O0FBRUQsbUJBQU87QUFDSCxxQkFBSyxFQUFFLFdBQVc7QUFDbEIsc0JBQU0sRUFBRSxZQUFZO0FBQ3BCLG9CQUFJLEVBQUUsVUFBVTtBQUNoQixtQkFBRyxFQUFFLFNBQVM7YUFDakIsQ0FBQztTQUNMOzs7V0FoRGdCLFdBQVc7OztrQkFBWCxXQUFXIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vc3JjL2NvbmZpZyc7XG5pbXBvcnQgQ2FudmFzIGZyb20gJy4uLy4uL3NyYy9DYW52YXMnO1xuaW1wb3J0IFBvaW50IGZyb20gJy4uLy4uL3NyYy9Qb2ludCc7XG5pbXBvcnQgQml0bWFwIGZyb20gJy4uLy4uL3NyYy9CaXRtYXAnO1xuaW1wb3J0IENvbGxpc2lvbiBmcm9tICcuLi8uLi9zcmMvQ29sbGlzaW9uJztcbmltcG9ydCBDb2xsZWN0aW9uIGZyb20gJy4uLy4uL3NyYy9saWIvQ29sbGVjdGlvbic7XG5pbXBvcnQgQ2FudmFzSW5wdXQgZnJvbSAnLi4vLi4vc3JjL2xpYi9DYW52YXNJbnB1dCc7XG5pbXBvcnQgTGluZSBmcm9tICcuLi8uLi9zcmMvTGluZSc7XG5cbmxldCBjYW52YXMgPSBuZXcgQ2FudmFzKCk7XG5cbmxldCBjYW52YXNJbnB1dCA9IG5ldyBDYW52YXNJbnB1dCh7XG4gICAgdXNlTW91c2U6IGNvbmZpZy51c2VNb3VzZSxcbiAgICBjYW52YXM6IGNhbnZhcy5nZXRFbCgpLFxuICAgIGhpdFRlc3RNZXRob2Q6IENvbGxpc2lvbi5oaXRUZXN0LFxuICAgIGNhbnZhc0ZpdDogdHJ1ZVxufSk7XG5cbmxldCBiaXRtYXAgPSBuZXcgQml0bWFwKCkuYWRkTWFwKFtcbiAgICBbJyM0M0MnLCAnI0MzNCcsICcjNDNDJ10sXG4gICAgWycjQzM0JywgJyMzQzQnLCAnI0MzNCddLFxuICAgIFsnIzQzQycsICcjQzM0JywgJyM0M0MnXVxuXSk7XG5cbmxldCBsaW5lID0gbmV3IExpbmUoKS5zZXRQb2ludHMoXG4gICAgbmV3IFBvaW50KDIsIDQpLFxuICAgIG5ldyBQb2ludCg4LCAxNiksXG4gICAgbmV3IFBvaW50KDMyLCA4KVxuKTtcblxubGV0IHBvb2wgPSBuZXcgQ29sbGVjdGlvbigpLmFkZEl0ZW1zKFxuICAgIGJpdG1hcFxuKTtcblxuY2FudmFzSW5wdXQuc2V0RW50aXR5UG9vbChwb29sKTtcblxuY2FudmFzLnJlbmRlcihsaW5lKTtcbmNhbnZhcy5yZW5kZXIoYml0bWFwKTtcblxuY2FudmFzSW5wdXQucHJlc3MgPSAoZSkgPT4gY29uc29sZS5sb2coZSk7IiwiaW1wb3J0IFNwcml0ZSBmcm9tICcuL1Nwcml0ZSc7XG5pbXBvcnQgUGljbCBmcm9tICcuL1BpY2wnO1xuXG5cbi8qKlxuICogQGNsYXNzICAgICAgIEJpdG1hcFxuICogQGRlc2NyaXB0aW9uIE1hcHMgMmQgYXJyYXlzIGludG8gYmxvY2tzXG4gKiBAZXh0ZW5kcyAgICAgU3ByaXRlXG4gKiBAcmVxdWlyZXMgICAgUGljbFxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCaXRtYXAgZXh0ZW5kcyBTcHJpdGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX21hcHMgPSBbXTtcbiAgICAgICAgdGhpcy5fZnJhbWUgPSAwO1xuICAgIH1cblxuICAgIGFkZE1hcChtYXApIHtcbiAgICAgICAgdGhpcy5fbWFwcy5wdXNoKG1hcCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZ2V0Qm91bmRpbmdCb3goKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsZWZ0OiB0aGlzLl94LFxuICAgICAgICAgICAgdG9wOiB0aGlzLl95LFxuICAgICAgICAgICAgcmlnaHQ6IHRoaXMuX3ggKyB0aGlzLl9tYXBzW3RoaXMuX2ZyYW1lXVswXS5sZW5ndGgsXG4gICAgICAgICAgICBib3R0b206IHRoaXMuX3kgKyB0aGlzLl9tYXBzW3RoaXMuX2ZyYW1lXS5sZW5ndGhcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBtYXAgPSB0aGlzLl9tYXBzW3RoaXMuX2ZyYW1lXSxcbiAgICAgICAgICAgIHBpY2xzID0gW10sXG4gICAgICAgICAgICBtYXB5LCBtYXB4O1xuXG4gICAgICAgIGZvciAobGV0IHkgPSAwLCBsZW55ID0gbWFwLmxlbmd0aDsgeSA8IGxlbnk7IHkrKykge1xuICAgICAgICAgICAgbWFweSA9IG1hcFt5XTtcblxuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDAsIGxlbnggPSBtYXB5Lmxlbmd0aDsgeCA8IGxlbng7IHgrKykge1xuICAgICAgICAgICAgICAgIG1hcHggPSBtYXB5W3hdO1xuXG4gICAgICAgICAgICAgICAgcGljbHMucHVzaChuZXcgUGljbCh4LCB5LCBtYXB4KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGljbHM7XG4gICAgfVxuXG4gICAgc2V0RnJhbWUodmFsKSB7XG4gICAgICAgIHRoaXMuX2ZyYW1lID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImltcG9ydCBNYWludGFpbk1heCBmcm9tICcuL2xpYi9NYWludGFpbk1heCc7XG5pbXBvcnQgU3ByaXRlIGZyb20gJy4vU3ByaXRlJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuXG4vKipcbiAqIEBjbGFzcyAgICAgICBDYW52YXNcbiAqIEBkZXNjcmlwdGlvbiBDcmVhdGVzIGFuZCByZW5kZXJzIHRvIHRoZSBjYW52YXMgRE9NIGVsZW1lbnRcbiAqIEBleHRlbmRzICAgICBHZXRTZXRcbiAqIEByZXF1aXJlZCAgICBNYWludGFpbk1heFxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXMge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbZGVwc11cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW2RlcHMuZG9jdW1lbnRdXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtkZXBzLndpbmRvd11cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihkZXBzKSB7XG4gICAgICAgIGRlcHMgPSBkZXBzIHx8IHt9O1xuICAgICAgICB0aGlzLl9kb2N1bWVudCA9IGRlcHMuZG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gICAgICAgIHRoaXMuX3dpbmRvdyA9IGRlcHMud2luZG93IHx8IHdpbmRvdztcblxuICAgICAgICB0aGlzLl9jYW52YXMgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5fY29udGV4dCA9IHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IGNvbmZpZy52aWV3cG9ydFdpZHRoICogY29uZmlnLnBwcDtcbiAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IGNvbmZpZy52aWV3cG9ydEhlaWdodCAqIGNvbmZpZy5wcHA7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb25maWcuY2FudmFzQmdDb2xvcjtcblxuICAgICAgICBjb25maWcucGFyZW50RWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29uZmlnLnBhcmVudEVsQmdDb2xvcjtcbiAgICAgICAgY29uZmlnLnBhcmVudEVsLmFwcGVuZENoaWxkKHRoaXMuX2NhbnZhcyk7XG5cbiAgICAgICAgdGhpcy5fd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2hhbmRsZVJlc2l6ZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9oYW5kbGVSZXNpemUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBhZGp1c3QgY2FudmFzIE1haW50YWluTWF4IHRvIGZpdCBjYW52YXMgdG8gcmVzaXplZCB3aW5kb3dcbiAgICAgKi9cbiAgICBfaGFuZGxlUmVzaXplKCkge1xuICAgICAgICBsZXQgeyB0b3AsIGxlZnQsIHdpZHRoLCBoZWlnaHQgfSA9IE1haW50YWluTWF4LmZpdChcbiAgICAgICAgICAgIGNvbmZpZy52aWV3cG9ydFdpZHRoICogY29uZmlnLnBwcCxcbiAgICAgICAgICAgIGNvbmZpZy52aWV3cG9ydEhlaWdodCAqIGNvbmZpZy5wcHBcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUudG9wID0gYCR7TWF0aC5yb3VuZCh0b3ApfXB4YDtcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLmxlZnQgPSBgJHtNYXRoLnJvdW5kKGxlZnQpfXB4YDtcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLndpZHRoID0gYCR7TWF0aC5yb3VuZCh3aWR0aCl9cHhgO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUuaGVpZ2h0ID0gYCR7TWF0aC5yb3VuZChoZWlnaHQpfXB4YDtcblxuICAgICAgICB0aGlzLm9uUmVzaXplKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVuZGVyIFBpY2xzIHRvIHRoZSBjYW52YXNcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0geCAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHkgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICBjb2xvciBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgX3JlbmRlclBpY2woeCwgeSwgY29sb3IpIHtcbiAgICAgICAgbGV0IHBwcCA9IGNvbmZpZy5wcHA7XG5cbiAgICAgICAgdGhpcy5fY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5fY29udGV4dC5maWxsUmVjdCh4ICogcHBwLCB5ICogcHBwLCBwcHAsIHBwcCk7XG4gICAgICAgIHRoaXMuX2NvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFkanVzdCB0aGUgY2FudmFzIGJhc2VkIG9uIHRoZSBTcHJpdGUncyBhdHRyc1xuICAgICAqL1xuICAgIF9zZXRTcHJpdGVDb250ZXh0KHNwcml0ZSkge1xuICAgICAgICBsZXQgcHBwID0gY29uZmlnLnBwcDtcblxuICAgICAgICB0aGlzLl9jb250ZXh0LnRyYW5zbGF0ZShzcHJpdGUuZ2V0WCgpICogcHBwLCBzcHJpdGUuZ2V0WSgpICogcHBwKTtcblxuICAgICAgICB0aGlzLl9jb250ZXh0LnNjYWxlKHNwcml0ZS5nZXRTY2FsZVgoKSwgc3ByaXRlLmdldFNjYWxlWSgpKTtcblxuICAgICAgICB0aGlzLl9jb250ZXh0LnJvdGF0ZShzcHJpdGUuZ2V0Um90YXRpb24oKSk7XG5cbiAgICAgICAgaWYgKHNwcml0ZS5nZXRPcGFjaXR5KCkgIT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuZ2xvYmFsQWxwaGEgPSBzcHJpdGUuZ2V0T3BhY2l0eSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNwcml0ZS5nZXRDb21wb3NpdGUoKSAhPT0gU3ByaXRlLmdldENvbXBvc2l0ZURlZmF1bHQoKSkge1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBzcHJpdGUuZ2V0Q29tcG9zaXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtIVE1MRW50aXR5fSBjYW52YXNcbiAgICAgKi9cbiAgICBnZXRFbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbnZhcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB3aW5kb3cgKGFuZCBzdWJzZXF1ZW50bHksIGNhbnZhcyBlbCkgcmVzaXplIGNhbGxiYWNrXG4gICAgICogQHJldHVybiB7W3R5cGVdfSBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgb25SZXNpemUoKSB7fVxuXG4gICAgLyoqXG4gICAgICogY29sbGVjdHMgb2JqZWN0J3MgUGljbHMgYW5kIHJlbmRlcnMgdGhlbSB0byBjYW52YXNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgQW55IG5iaXQgb2JqZWN0XG4gICAgICovXG4gICAgcmVuZGVyKG9iamVjdCkge1xuICAgICAgICBsZXQgcGljbHMgPSBvYmplY3QucmVuZGVyKCk7XG5cbiAgICAgICAgdGhpcy5fY29udGV4dC5zYXZlKCk7XG5cbiAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIFNwcml0ZSkge1xuICAgICAgICAgICAgdGhpcy5fc2V0U3ByaXRlQ29udGV4dChvYmplY3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgcGljbCBvZiBwaWNscykge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyUGljbChwaWNsLngsIHBpY2wueSwgcGljbC5jb2xvcik7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgQ29sbGlzaW9uTGliIGZyb20gJy4vbGliL0NvbGxpc2lvbic7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJztcblxuLyoqXG4gKiBAY2xhc3MgICAgICAgQ29sbGlzaW9uXG4gKiBAZGVzY3JpcHRpb24gVmFyaW91cyBmb3JtcyBvZiBjb2xsaXNpb24gZGV0ZWN0aW9uXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxpc2lvbiB7XG4gICAgLyoqXG4gICAgICogcmV0dXJucyB0cnVlIGlmIHgveSBpcyBpbnNpZGUgZW50aXR5J3MgYm91bmRpbmcgYm94XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB4ICAgICAgbW91c2UvdG91Y2ggcG9zaXRpb25cbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB5ICAgICAgbW91c2UvdG91Y2ggcG9zaXRpb25cbiAgICAgKiBAcGFyYW0gIHtTcHJpdGV9ICBlbnRpdHlcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBoaXRUZXN0KHgsIHksIGVudGl0eSkge1xuICAgICAgICBsZXQgcHBwID0gY29uZmlnLnBwcDtcbiAgICAgICAgbGV0IGJvdW5kaW5nQm94ID0gZW50aXR5LmdldEJvdW5kaW5nQm94KCk7XG5cbiAgICAgICAgZm9yIChsZXQgcHJvcCBpbiBib3VuZGluZ0JveCkge1xuICAgICAgICAgICAgYm91bmRpbmdCb3hbcHJvcF0gKj0gcHBwO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIENvbGxpc2lvbkxpYi5oaXRUZXN0KE1hdGguZmxvb3IoeCksIE1hdGguZmxvb3IoeSksIGJvdW5kaW5nQm94KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQnJlc2VuaGFtIGZyb20gJy4vbGliL0JyZXNlbmhhbSc7XG5pbXBvcnQgUGljbCBmcm9tICcuL1BpY2wnO1xuXG4vKipcbiAqIEBjbGFzcyAgICAgICBkcmF3LkxpbmVcbiAqIEBkZXNjcmlwdGlvbiBQbG90cyBQaWNscyBiZXR3ZWVuIChhbmQgYXQpIG4gUG9pbnRzXG4gKiBAcmVxdWlyZXMgICAgQnJlc2VuaGFtXG4gKiBAcmVxdWlyZXMgICAgUGljbFxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5lIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW2NvbG9yXSBJbml0aWFsIGNvbG9yXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29sb3IsIC4uLnBvaW50cykge1xuICAgICAgICB0aGlzLl9waWNscyA9IFtdO1xuICAgICAgICB0aGlzLl9wb2ludHMgPSBbcG9pbnRzXTtcbiAgICAgICAgdGhpcy5fc3Ryb2tlQ29sb3IgPSBjb2xvciB8fCAnIzAwMCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdGhlIFBpY2wtcHVzaGVyIHRvIHBhc3MgdG8gQnJlc2VuaGFtLnBsb3RMaW5lXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSAge1t0eXBlXX0geCBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICB7W3R5cGVdfSB5IFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBfYWRkUGljbHMoeCwgeSkge1xuICAgICAgICB0aGlzLl9waWNscy5wdXNoKG5ldyBQaWNsKHgsIHksIHRoaXMuX3N0cm9rZUNvbG9yKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBsaW5lJ3MgcG9pbnRzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1BvaW50fSAuLi5wb2ludHNcbiAgICAgKi9cbiAgICBzZXRQb2ludHMoLi4ucG9pbnRzKSB7XG4gICAgICAgIGlmIChwb2ludHMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdMaW5lIG11c3QgaGF2ZSBhdCBsZWFzdCB0d28gcG9pbnRzJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9wb2ludHMgPSBwb2ludHM7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICAvLyBlbXB0eSBwaWNsIGFycmF5XG4gICAgICAgIHRoaXMuX3BpY2xzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuX3BvaW50cy5sZW5ndGggLSAxOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIEJyZXNlbmhhbS5wbG90TGluZSh0aGlzLl9wb2ludHNbaV0sIHRoaXMuX3BvaW50c1tpICsgMV0sIHRoaXMuX2FkZFBpY2xzLmJpbmQodGhpcykpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3BpY2xzO1xuICAgIH1cbn1cbiIsImltcG9ydCBQb2ludCBmcm9tICcuL1BvaW50JztcblxuLyoqXG4gKiBAY2xhc3MgICAgICAgUGljbFxuICogQGRlc2NyaXB0aW9uIEJhc2UgZHJhd2luZyBvYmplY3QgZm9yIGFsbCBuYml0IGNvbXBvbmVudHMuIFRoaXMgb2JqZWN0IGRvZXMgbm90XG4gKiAgICAgICAgICAgICAgY29uZm9ybSB0byB0aGUgdW5kZXJzY29yZS1wcmVmaXhlZCBwcml2YXRlIHByb3BlcnR5IHBhcmFkaWdtLlxuICogQGV4dGVuZHMgICAgIFBvaW50XG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBpY2wgZXh0ZW5kcyBQb2ludCB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSBbeF0gICAgIDJkIGNvb3JkaW5hdGVcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IFt5XSAgICAgMmQgY29vcmRpbmF0ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgW2NvbG9yXSBJbml0aWFsIGNvbG9yXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoeCwgeSwgY29sb3IpIHtcbiAgICAgICAgc3VwZXIoeCwgeSk7XG5cbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yIHx8ICcjMDAwJztcbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBQb2ludFxuICogQGRlc2NyaXB0aW9uIENyZWF0ZSAyRCBwb2ludC4gVGhpcyBvYmplY3QgZG9lcyBub3QgY29uZm9ybSB0byB0aGVcbiAqICAgICAgICAgICAgICB1bmRlcnNjb3JlLXByZWZpeGVkIHByaXZhdGUgcHJvcGVydHkgcGFyYWRpZ20uXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvaW50IHtcbiAgICAvKipcbiAgICAgKiBpbml0aWFsaXplIGEgcG9pbnQgd2l0aCAwLDAgb3IgZ2l2ZW4gY29vcmRpbmF0ZXNcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB4XG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0geVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgdGhpcy54ID0geCB8fCAwO1xuICAgICAgICB0aGlzLnkgPSB5IHx8IDA7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgU3ByaXRlXG4gKiBAZGVzY3JpcHRpb24gQmFzZSBjbGFzcyBmb3IgcG9zaXRpb24gYmFzZWQgb2JqZWN0c1xuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcHJpdGUge1xuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICB0aGlzLl94ID0geCB8fCAwO1xuICAgICAgICB0aGlzLl95ID0geSB8fCAwO1xuICAgICAgICB0aGlzLl9zY2FsZVggPSAxO1xuICAgICAgICB0aGlzLl9zY2FsZVkgPSAxO1xuICAgICAgICB0aGlzLl9yb3RhdGlvbiA9IDA7XG4gICAgICAgIHRoaXMuX2NvbXBvc2l0ZSA9IFNwcml0ZS5fY29tcG9zaXRlRGVmYXVsdDtcbiAgICAgICAgdGhpcy5fb3BhY2l0eSA9IDE7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldENvbXBvc2l0ZURlZmF1bHQoKSB7XG4gICAgICAgIHJldHVybiBTcHJpdGUuX2NvbXBvc2l0ZURlZmF1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIGdldENvbXBvc2l0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvc2l0ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtGbG9hdH1cbiAgICAgKi9cbiAgICBnZXRPcGFjaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3BhY2l0eTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtGbG9hdH1cbiAgICAgKi9cbiAgICBnZXRSb3RhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JvdGF0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0U2NhbGVYKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh0aGlzLl9zY2FsZVgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0U2NhbGVZKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh0aGlzLl9zY2FsZVkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WCgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQodGhpcy5feCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRZKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh0aGlzLl95KTtcbiAgICB9XG5cbiAgICBzZXRDb21wb3NpdGUodmFsKSB7XG4gICAgICAgIHRoaXMuX2NvbXBvc2l0ZSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRPcGFjaXR5KHZhbCkge1xuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFJvdGF0aW9uKHZhbCkge1xuICAgICAgICB0aGlzLl9yb3RhdGlvbiA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRTY2FsZVgodmFsKSB7XG4gICAgICAgIHRoaXMuX3NjYWxlWCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRTY2FsZVkodmFsKSB7XG4gICAgICAgIHRoaXMuX3NjYWxlWSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRYKHZhbCkge1xuICAgICAgICB0aGlzLl94ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFkodmFsKSB7XG4gICAgICAgIHRoaXMuX3kgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5TcHJpdGUuX2NvbXBvc2l0ZURlZmF1bHQgPSAnc291cmNlLW92ZXInO1xuXG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBDb25maWdcbiAqIEBkZXNjcmlwdGlvbiBUaGUgY29uZmlndXJhdGlvbiBvYmplY3QgZm9yIG5CaXQuIFRoaXMgb2JqZWN0IGRvZXMgbm90IGNvbmZvcm0gdG9cbiAqICAgICAgICAgICAgICB0aGUgdW5kZXJzY29yZSBwcmVmaXhlZCBwcml2YXRlIHByb3BlcnR5IHBhcmFkaWdtLlxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgLy8gcGl4ZWxzIHBlciBQaWNsXG4gICAgcHBwOiA4LFxuICAgIHZpZXdwb3J0V2lkdGg6IDQwLFxuICAgIHZpZXdwb3J0SGVpZ2h0OiAzMCxcbiAgICBwYXJlbnRFbDogZG9jdW1lbnQuYm9keSxcbiAgICBwYXJlbnRFbEJnQ29sb3I6ICcjMDAwJyxcbiAgICBjYW52YXNCZ0NvbG9yOiAnI0ZGRicsXG4gICAgdXNlS2V5Ym9hcmQ6IGZhbHNlLFxuICAgIHVzZU1vdXNlOiB0cnVlLFxuICAgIHVzZVRvdWNoOiBmYWxzZVxufTtcbiIsIi8qKlxuICogQGNsYXNzICAgICAgIEJyZXNlbmhhbVxuICogQGRlc2NyaXB0aW9uIEJyZXNlbmhhbSdzIGZvcm11bGFlIGZvciBjYWxjdWxhdGluZyBibG9ja3MgZnJvbSBjdXJ2ZXMsIGJldHdlZW4gcG9pbnRzIGV0Yy5cbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqIEByZWZlcmVuY2UgICBodHRwOi8vcm9zZXR0YWNvZGUub3JnL3dpa2kvQml0bWFwL0JyZXNlbmhhbSdzX2xpbmVfYWxnb3JpdGhtXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJyZXNlbmhhbSB7XG4gICAgLyoqXG4gICAgICogcGxvdCB0aGUgY29ubmVjdGluZyBibG9ja3MgYmV0d2VlbiB0d28gcG9pbnRzXG4gICAgICogQHBhcmFtIHtQb2ludH0gcHRBXG4gICAgICogQHBhcmFtIHtQb2ludH0gcHRCXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSB3aGF0IHRvIGRvIHdoZW4gYSBjb25uZWN0aW9uIHBvaW50IGlzIGNhbGN1bGF0ZWRcbiAgICAgKi9cbiAgICBzdGF0aWMgcGxvdExpbmUocHRBLCBwdEIsIHBsb3QpIHtcbiAgICAgICAgbGV0IGR4ID0gTWF0aC5hYnMocHRCLnggLSBwdEEueCk7XG4gICAgICAgIGxldCBzeCA9IHB0QS54IDwgcHRCLnggPyAxIDogLTE7XG4gICAgICAgIGxldCBkeSA9IC1NYXRoLmFicyhwdEIueSAtIHB0QS55KTtcbiAgICAgICAgbGV0IHN5ID0gcHRBLnkgPCBwdEIueSA/IDEgOiAtMTtcbiAgICAgICAgbGV0IGVyciA9IGR4ICsgZHksIGUyO1xuXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBwbG90KHB0QS54LCBwdEEueSk7XG5cbiAgICAgICAgICAgIGlmIChwdEEueCA9PSBwdEIueCAmJiBwdEEueSA9PSBwdEIueSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlMiA9IDIgKiBlcnI7XG5cbiAgICAgICAgICAgIGlmIChlMiA+PSBkeSkge1xuICAgICAgICAgICAgICAgIGVyciArPSBkeTtcbiAgICAgICAgICAgICAgICBwdEEueCArPSBzeDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGUyIDw9IGR4KSB7XG4gICAgICAgICAgICAgICAgZXJyICs9IGR4O1xuICAgICAgICAgICAgICAgIHB0QS55ICs9IHN5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogW3Bsb3RFbGxpcHNlIGRlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4ge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIHN0YXRpYyBwbG90RWxsaXBzZSgpIHtcblxuICAgIH1cbn1cbiIsIi8qKlxuICogQGNsYXNzICAgICAgIENhbnZhc0ludGVyYWN0XG4gKiBAZGVzY3JpcHRpb24gQSBtb2R1bGUgZm9yIGhhbmRsaW5nIGtleWJvYXJkLCBtb3VzZSwgYW5kIHRvdWNoIGV2ZW50cyBvbiB0aGVcbiAqICAgICAgICAgICAgICBjYW52YXMuIENhbnZhc0lucHV0IG5vcm1hbGl6ZXMgbW91c2UvdG91Y2ggZXZlbnRzIGludG8gYHByZXNzYFxuICogICAgICAgICAgICAgIGFuZCBjYW4gY2hlY2sgcG9pbnRlciBldmVudHMgYWdhaW5zdCBhbiBlbnRpdHkgcG9vbFxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXNJbnB1dCB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICAgICBvcHRpb25zXG4gICAgICogQHBhcmFtIHtIVE1MRW50aXR5fSBvcHRpb25zLmNhbnZhcyAgICAgICAgVGhlIGNhbnZhcyBlbGVtZW50IHRvIGludGVyYWN0IHdpdGhcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSAgIG9wdGlvbnMuaGl0VGVzdE1ldGhvZCB0aGUgbWV0aG9kIGZvciBjaGVja2luZyBwb2ludGVyIGV2ZW50c1xuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFnYWluc3QgZW50aXRpZXMgaW4gdGhlIGVudGl0eVBvb2wuIFNob3VsZFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlIGEgc3RhdGljIG1ldGhvZCBhcyBub3QgY2FsbGVkIGluIHNjb3BlXG4gICAgICogQHBhcmFtIHtPYmplY3RbXX0gICBvcHRpb25zLmVudGl0eVBvb2wgICAgYW4gYXJyYXkgb2YgZW50aXRpZXMgKGN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIHR5cGUgQ29sbGVjdGlvbilcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59ICAgIG9wdGlvbnMuY2FudmFzRml0ICAgICBTZXQgdG8gdHJ1ZSBpZiB1c2luZyBjc3MgdG8gZml0IHRoZSBjYW52YXMgaW4gdGhlIHZpZXdwb3J0XG4gICAgICogQHBhcmFtIHtCb29sZWFufSAgICBvcHRpb25zLnVzZUtleWJvYXJkICAgd2hldGhlciBvciBub3QgdG8gbGlzdGVuIGZvciBrZXlib2FyZCBldmVudHNcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59ICAgIG9wdGlvbnMudXNlTW91c2UgICAgICB3aGV0aGVyIG9yIG5vdCB0byBsaXN0ZW4gZm9yIG1vdXNlIGV2ZW50c1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgb3B0aW9ucy51c2VUb3VjaCAgICAgIHdoZXRoZXIgb3Igbm90IHRvIGxpc3RlbiBmb3IgdG91Y2ggZXZlbnRzXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLl9jYW52YXMgPSBvcHRpb25zLmNhbnZhcztcbiAgICAgICAgdGhpcy5faGl0VGVzdE1ldGhvZCA9IG9wdGlvbnMuaGl0VGVzdE1ldGhvZDtcbiAgICAgICAgdGhpcy5fY2FudmFzRml0ID0gb3B0aW9ucy5jYW52YXNGaXQgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuX2VudGl0eVBvb2wgPSBvcHRpb25zLmVudGl0eVBvb2w7XG5cbiAgICAgICAgdGhpcy5fcHJlc3NDYW5kaWRhdGUgPSBudWxsO1xuICAgICAgICB0aGlzLl9kcmFnQ2FuZGlkYXRlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fZHJhZ0NhbmRpZGF0ZU9mZnNldFggPSBudWxsO1xuICAgICAgICB0aGlzLl9kcmFnQ2FuZGlkYXRlT2Zmc2V0WSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2NhbkRyYWcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faXNEcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChvcHRpb25zLnVzZUtleWJvYXJkKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRLZXlib2FyZExpc3RlbmVycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMudXNlTW91c2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZE1vdXNlTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy51c2VUb3VjaCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkVG91Y2hMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9hZGRLZXlib2FyZExpc3RlbmVycygpIHtcblxuICAgIH1cblxuICAgIF9hZGRNb3VzZUxpc3RlbmVycygpIHtcbiAgICAgICAgbGV0IGV2ZW50cyA9IFsnY2xpY2snLCAnZGJsY2xpY2snLCAnbW91c2Vkb3duJywgJ21vdXNldXAnLCAnbW91c2Vtb3ZlJ107XG5cbiAgICAgICAgZm9yIChsZXQgZXZlbnQgb2YgZXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy5faGFuZGxlTW91c2VBbmRUb3VjaC5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfYWRkVG91Y2hMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGxldCBldmVudHMgPSBbJ3RhcCcsICdkYmx0YXAnLCAndG91Y2hzdGFydCcsICd0b3VjaGVuZCcsICd0b3VjaG1vdmUnXTtcblxuICAgICAgICBmb3IgKGxldCBldmVudCBvZiBldmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLl9oYW5kbGVNb3VzZUFuZFRvdWNoLmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9oYW5kbGVLZXlib2FyZCgpIHtcblxuICAgIH1cblxuICAgIF9oYW5kbGVNb3VzZUFuZFRvdWNoKGlucHV0RXZlbnQpIHtcbiAgICAgICAgbGV0IHNjYWxlRmFjdG9yID0gdGhpcy5fY2FudmFzRml0ID8gMTAwIC8gdGhpcy5fZ2V0U2NhbGVGYWN0b3IoKSAvIDEwMCA6IDE7XG4gICAgICAgIGxldCBldmVudERhdGEgPSB7XG4gICAgICAgICAgICBkb21FdmVudDogaW5wdXRFdmVudFxuICAgICAgICB9O1xuICAgICAgICBsZXQgZXZlbnRUeXBlcyA9IFtdO1xuXG4gICAgICAgIGlmIChpbnB1dEV2ZW50Lmhhc093blByb3BlcnR5KCd0b3VjaGVzJykpIHtcbiAgICAgICAgICAgIGV2ZW50RGF0YS5hYnNYID0gaW5wdXRFdmVudC50b3VjaGVzWzBdLnBhZ2VYIC0gdGhpcy5fY2FudmFzLm9mZnNldExlZnQ7XG4gICAgICAgICAgICBldmVudERhdGEuYWJzWSA9IGlucHV0RXZlbnQudG91Y2hlc1swXS5wYWdlWSAtIHRoaXMuX2NhbnZhcy5vZmZzZXRUb3A7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBldmVudERhdGEuYWJzWCA9IGlucHV0RXZlbnQucGFnZVggLSB0aGlzLl9jYW52YXMub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIGV2ZW50RGF0YS5hYnNZID0gaW5wdXRFdmVudC5wYWdlWSAtIHRoaXMuX2NhbnZhcy5vZmZzZXRUb3A7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb29yZGluYXRlIHBvc2l0aW9ucyByZWxhdGl2ZSB0byBjYW52YXMgc2NhbGluZ1xuICAgICAgICBldmVudERhdGEueCA9IGV2ZW50RGF0YS5hYnNYICogc2NhbGVGYWN0b3I7XG4gICAgICAgIGV2ZW50RGF0YS55ID0gZXZlbnREYXRhLmFic1kgKiBzY2FsZUZhY3RvcjtcblxuICAgICAgICBldmVudERhdGEudGFyZ2V0ID0gdGhpcy5faGl0VGVzdE1ldGhvZCA/IHRoaXMuX2dldEV2ZW50VGFyZ2V0KGV2ZW50RGF0YSkgOiBudWxsO1xuXG4gICAgICAgIHN3aXRjaChpbnB1dEV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2NsaWNrJzpcbiAgICAgICAgICAgIGNhc2UgJ3RhcCc6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9wcmVzc0NhbmRpZGF0ZSB8fCAhZXZlbnREYXRhLnRhcmdldCB8fCB0aGlzLl9wcmVzc0NhbmRpZGF0ZS5fdWlkICE9PSBldmVudERhdGEudGFyZ2V0Ll91aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHBvdGVudGlhbCB0YXJnZXQgaWYgaXQgd2FzIG5vdCBwcmVzc2VkIEFORCByZWxlYXNlZCBvblxuICAgICAgICAgICAgICAgICAgICBldmVudERhdGEudGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9wcmVzc0NhbmRpZGF0ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgZXZlbnRUeXBlcy5wdXNoKCdwcmVzcycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkYmxjbGljayc6XG4gICAgICAgICAgICBjYXNlICdkYmx0YXAnOlxuICAgICAgICAgICAgICAgIGV2ZW50VHlwZXMucHVzaCgnZGJscHJlc3MnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbW91c2Vkb3duJzpcbiAgICAgICAgICAgIGNhc2UgJ3RvdWNoc3RhcnQnOlxuICAgICAgICAgICAgICAgIHRoaXMuX3ByZXNzQ2FuZGlkYXRlID0gZXZlbnREYXRhLnRhcmdldDtcbiAgICAgICAgICAgICAgICB0aGlzLl9kcmFnQ2FuZGlkYXRlID0gZXZlbnREYXRhLnRhcmdldCAmJiBldmVudERhdGEudGFyZ2V0LmRyYWdnYWJsZSgpID8gZXZlbnREYXRhLnRhcmdldCA6IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kcmFnQ2FuZGlkYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RyYWdDYW5kaWRhdGVPZmZzZXRYID0gZXZlbnREYXRhLnggLSB0aGlzLl9kcmFnQ2FuZGlkYXRlLmdldFkoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZHJhZ0NhbmRpZGF0ZU9mZnNldFkgPSBldmVudERhdGEueSAtIHRoaXMuX2RyYWdDYW5kaWRhdGUuZ2V0WSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbkRyYWcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGV2ZW50VHlwZXMucHVzaCgncHJlc3Nkb3duJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21vdXNldXAnOlxuICAgICAgICAgICAgY2FzZSAndG91Y2hlbmQnOlxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbkRyYWcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RyYWdDYW5kaWRhdGUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBldmVudFR5cGVzLnB1c2goJ2RyYWdlbmQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXZlbnRUeXBlcy5wdXNoKCdwcmVzc3VwJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAvLyBUT0RPIGRlY2lkZSB3aGV0aGVyIHRvIGluY2x1ZGUuLi5cbiAgICAgICAgICAgIGNhc2UgJ3RvdWNobGVhdmUnOlxuICAgICAgICAgICAgY2FzZSAndG91Y2hjYW5jZWwnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZHJhZ0NhbmRpZGF0ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50VHlwZXMucHVzaCgnZHJhZ2xlYXZlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV2ZW50VHlwZXMucHVzaCgncHJlc3NsZWF2ZScpO1xuICAgICAgICAgICAgYnJlYWs7Ki9cbiAgICAgICAgICAgIGNhc2UgJ21vdXNlbW92ZSc6XG4gICAgICAgICAgICBjYXNlICd0b3VjaG1vdmUnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jYW5EcmFnICYmIHRoaXMuX2RyYWdDYW5kaWRhdGUgJiYgdGhpcy5fZHJhZ0NhbmRpZGF0ZS5pc0RyYWdnYWJsZSgpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZHJhZ0NhbmRpZGF0ZS5zZXRYKGV2ZW50RGF0YS54IC0gdGhpcy5fZHJhZ0NhbmRpZGF0ZU9mZnNldFgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kcmFnQ2FuZGlkYXRlLnNldFkoZXZlbnREYXRhLnkgLSB0aGlzLl9kcmFnQ2FuZGlkYXRlT2Zmc2V0WSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50VHlwZXMucHVzaCgnZHJhZ3N0YXJ0Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBldmVudFR5cGVzLnB1c2goJ2RyYWcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGV2ZW50IG9mIGV2ZW50VHlwZXMpIHtcbiAgICAgICAgICAgIHRoaXNbZXZlbnRdKGV2ZW50RGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogZ2V0IHRoZSBzY2FsZSBmYWN0b3Igb2YgdGhlIGNhbnZhcyBlbGVtZW50XG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEByZXR1cm4ge0Zsb2F0fVxuICAgICAqL1xuICAgIF9nZXRTY2FsZUZhY3RvcigpIHtcbiAgICAgICAgbGV0IGZhY3RvciA9IDE7XG4gICAgICAgIGxldCBjYW52YXNXaWR0aDtcblxuICAgICAgICBpZiAodGhpcy5fY2FudmFzLnN0eWxlLndpZHRoKSB7XG4gICAgICAgICAgICBjYW52YXNXaWR0aCA9IHBhcnNlSW50KHRoaXMuX2NhbnZhcy5zdHlsZS53aWR0aCwgMTApO1xuICAgICAgICAgICAgZmFjdG9yID0gY2FudmFzV2lkdGggLyB0aGlzLl9jYW52YXMud2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFjdG9yO1xuICAgIH1cblxuICAgIF9nZXRFdmVudFRhcmdldChldmVudCkge1xuICAgICAgICBsZXQgdG9wbW9zdEVudGl0eTtcblxuICAgICAgICAvLyBjaGVjayBpZiBlbnRpdHlQb29sIGV4aXN0cyBhbmQgaXMgb2YgdHlwZSBDb2xsZWN0aW9uXG4gICAgICAgIGlmICh0aGlzLl9lbnRpdHlQb29sICYmIHRoaXMuX2VudGl0eVBvb2wuZWFjaCkge1xuICAgICAgICAgICAgdGhpcy5fZW50aXR5UG9vbC5lYWNoKGZ1bmN0aW9uKGVudGl0eSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9oaXRUZXN0TWV0aG9kKGV2ZW50LngsIGV2ZW50LnksIGVudGl0eSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29udGludWFsbHkgYXNzaWduIGhpZ2hlciBzb3J0ZWQgZW50aXR5XG4gICAgICAgICAgICAgICAgICAgIHRvcG1vc3RFbnRpdHkgPSBlbnRpdHk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG9wbW9zdEVudGl0eTtcbiAgICB9XG5cbiAgICAvLyBub3JtYWxpemVkIGV2ZW50IGNhbGxiYWNrc1xuICAgIGRibHByZXNzKCkge31cbiAgICBkcmFnKCkge31cbiAgICBkcmFnZW5kKCkge31cbiAgICBkcmFnc3RhcnQoKSB7fVxuICAgIHByZXNzKCkge31cbiAgICBwcmVzc2Rvd24oKSB7fVxuICAgIHByZXNzdXAoKSB7fVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3RbXX0gcG9vbCBBbiBhcnJheSBvZiBhbGwgZW50aXRpZXMgaW4gdGhlIGdhbWUgcG9vbFxuICAgICAqIEByZXR1cm4ge0NhbnZhc0lucHV0fVxuICAgICAqL1xuICAgIHNldEVudGl0eVBvb2wocG9vbCkge1xuICAgICAgICB0aGlzLl9lbnRpdHlQb29sID0gcG9vbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBDb2xsZWN0aW9uXG4gKiBAZGVzY3JpcHRpb24gQW4gYXJyYXkgb2Ygd3JhcHBlciBpdGVtcyBzdG9yZWQgd2l0aCBhIG5hbWUgYW5kIHRoZSBpdGVtJ3MgdmFsdWUuXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxlY3Rpb24ge1xuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtBcnJheX0gU1cuQ29sbGVjdGlvbi5wcm90b3R5cGUuX2l0ZW1zIC0gdGhlIHNvcnRlZCBsaXN0XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9pdGVtcyA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFkZCBhbiBpdGVtIHdpdGggb3B0aW9uYWwgbmFtZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7QW55fSAgICAgICAgaXRlbSAgICB0aGUgaXRlbSB0byBhZGRcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICAgICBbbmFtZV0gdGhlIG9wdGlvbmFsIG5hbWUgb2YgdGhlIGl0ZW1cbiAgICAgKiBAcmV0dXJuIHtDb2xsZWN0aW9ufVxuICAgICAqL1xuICAgIGFkZEl0ZW0oaXRlbSwgbmFtZSkge1xuICAgICAgICBuYW1lID0gdHlwZW9mIG5hbWUgIT09ICd1bmRlZmluZWQnID8gbmFtZSA6ICcnO1xuXG4gICAgICAgIHRoaXMuX2l0ZW1zLnB1c2goe1xuICAgICAgICAgICAgaXRlbSwgbmFtZVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBhZGQgbXVsdGlwbGUgaXRlbXNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Li4uT2JqZWN0fSBpdGVtcyBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgYWRkSXRlbXMoLi4uaXRlbXMpIHtcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtLml0ZW0gPT09ICdvYmplY3QnICYmIHR5cGVvZiBpdGVtLm5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgaXRlbSBoYXMgaXRlbS9uYW1lIHN0cnVjdHVyZVxuICAgICAgICAgICAgICAgIHRoaXMuYWRkSXRlbShpdGVtLml0ZW0sIGl0ZW0ubmFtZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGZvciBjb252ZW5pZW5jZSBhbGxvdyB1c2VyIHRvIGFkZCBqdXN0IGl0ZW1cbiAgICAgICAgICAgICAgICB0aGlzLmFkZEl0ZW0oaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpdGVyYXRlcyB0aGUgY29sbGVjdGlvbidzIHNvcnRlZEl0ZW1zLiBUaGUgaXRlbSwgaW5kZXgsIGFuZCBuYW1lIGFyZSBzdXBwbGllZCB0byB0aGUgcHJvdmlkZWQgZnVuY3Rpb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICAgc2NvcGVcbiAgICAgKi9cbiAgICBlYWNoKGZuLCBzY29wZSkge1xuICAgICAgICBsZXQgaXRlbTtcblxuICAgICAgICBmbiA9IHNjb3BlID8gZm4uYmluZChzY29wZSkgOiBmbjtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5faXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGl0ZW0gPSB0aGlzLl9pdGVtc1tpXTtcblxuICAgICAgICAgICAgaWYgKGZuKGl0ZW0uaXRlbSwgaSwgaXRlbS5uYW1lKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qKlxuICogQGNsYXNzICAgICAgIENvbGxpc2lvblxuICogQGRlc2NyaXB0aW9uIFZhcmlvdXMgZm9ybXMgb2YgY29sbGlzaW9uIGRldGVjdGlvblxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsaXNpb24ge1xuICAgIC8qKlxuICAgICAqIHJldHVybnMgdHJ1ZSBpZiB4L3kgaXMgaW5zaWRlIGVudGl0eSdzIGJvdW5kaW5nIGJveFxuICAgICAqXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0geCAgICAgICAgICAgbW91c2UvdG91Y2ggcG9zaXRpb25cbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB5ICAgICAgICAgICBtb3VzZS90b3VjaCBwb3NpdGlvblxuICAgICAqIEBwYXJhbSAge1Nwcml0ZX0gIGJvdW5kaW5nQm94IEEgYmIgb2JqZWN0IHdpdGggdG9wLCBsZWZ0LCByaWdodCwgYm90dG9tIHByb3BlcnRpZXNcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBoaXRUZXN0KHgsIHksIGJvdW5kaW5nQm94KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB4ID49IGJvdW5kaW5nQm94LmxlZnQgICYmXG4gICAgICAgICAgICB4IDw9IGJvdW5kaW5nQm94LnJpZ2h0ICYmXG4gICAgICAgICAgICB5ID49IGJvdW5kaW5nQm94LnRvcCAgICYmXG4gICAgICAgICAgICB5IDw9IGJvdW5kaW5nQm94LmJvdHRvbVxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGNsYXNzICAgICAgIE1haW50YWluTWF4XG4gKiBAZGVzY3JpcHRpb24gS2VlcHMgY2FudmFzIGVsZW1lbnQgY2VudGVyZWQgYW5kICh3aXRoIGFzcGVjdCByYXRpbyBpbnRhY3QpIGluIHRoZSB2aWV3cG9ydFxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWludGFpbk1heCB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7bnVtYmVyfSB3aWR0aCAtIHRoZSBlbGVtZW50J3Mgd2lkdGhcbiAgICAgKiBAcGFyYW0gIHtudW1iZXJ9IGhlaWdodCAtIHRoZSBlbGVtZW50J3MgaGVpZ2h0XG4gICAgICogQHJldHVybiB7b2JqZWN0fSB0aGUgbmV3IHRvcCwgbGVmdCwgd2lkdGgsICYgaGVpZ2h0XG4gICAgICovXG4gICAgc3RhdGljIGZpdCh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIGNvbnN0IExBTkRTQ0FQRV9SQVRJTyA9IGhlaWdodCAvIHdpZHRoO1xuICAgICAgICBjb25zdCBQT1JUUkFJVF9SQVRJTyAgPSB3aWR0aCAvIGhlaWdodDtcbiAgICAgICAgY29uc3QgSVNfTEFORFNDQVBFICAgID0gTEFORFNDQVBFX1JBVElPIDwgUE9SVFJBSVRfUkFUSU8gPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgICAgbGV0IHdpbldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIGxldCB3aW5IZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIGxldCB3aW5MYW5kc2NhcGVSYXRpbyA9IHdpbkhlaWdodCAvIHdpbldpZHRoO1xuICAgICAgICBsZXQgd2luUG9ydHJhaXRSYXRpbyAgPSB3aW5XaWR0aCAvIHdpbkhlaWdodDtcbiAgICAgICAgbGV0IG9mZnNldExlZnQgPSAwO1xuICAgICAgICBsZXQgb2Zmc2V0VG9wICA9IDA7XG4gICAgICAgIGxldCBvZmZzZXRXaWR0aDtcbiAgICAgICAgbGV0IG9mZnNldEhlaWdodDtcblxuICAgICAgICBpZiAoSVNfTEFORFNDQVBFKSB7XG4gICAgICAgICAgICBpZiAoTEFORFNDQVBFX1JBVElPIDwgd2luTGFuZHNjYXBlUmF0aW8pIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHdpbldpZHRoO1xuICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IG9mZnNldFdpZHRoICogTEFORFNDQVBFX1JBVElPO1xuICAgICAgICAgICAgICAgIG9mZnNldFRvcCA9ICh3aW5IZWlnaHQgLSBvZmZzZXRIZWlnaHQpIC8gMjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gd2luSGVpZ2h0O1xuICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoID0gd2luSGVpZ2h0ICogUE9SVFJBSVRfUkFUSU87XG4gICAgICAgICAgICAgICAgb2Zmc2V0TGVmdCA9ICh3aW5XaWR0aCAtIG9mZnNldFdpZHRoKSAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoUE9SVFJBSVRfUkFUSU8gPCB3aW5Qb3J0cmFpdFJhdGlvKSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gd2luSGVpZ2h0O1xuICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoID0gd2luSGVpZ2h0ICogUE9SVFJBSVRfUkFUSU87XG4gICAgICAgICAgICAgICAgb2Zmc2V0TGVmdCA9ICh3aW5XaWR0aCAtIG9mZnNldFdpZHRoKSAvIDI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoID0gd2luV2lkdGg7XG4gICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gb2Zmc2V0V2lkdGggKiBMQU5EU0NBUEVfUkFUSU87XG4gICAgICAgICAgICAgICAgb2Zmc2V0VG9wID0gKHdpbkhlaWdodCAtIG9mZnNldEhlaWdodCkgLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiBvZmZzZXRXaWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogb2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgICAgbGVmdDogb2Zmc2V0TGVmdCxcbiAgICAgICAgICAgIHRvcDogb2Zmc2V0VG9wXG4gICAgICAgIH07XG4gICAgfVxufVxuIl19
