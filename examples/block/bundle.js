(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @class       Config
 * @description The configuration object for nBit. This object does not conform to
 *              the underscore prefixed private property paradigm.
 * @author      Chris Peters
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

var Config =
/**
 * [constructor description]
 * @return {[type]} [description]
 */
function Config(options) {
    _classCallCheck(this, Config);

    this.blockSize = 8;
    this.gameWidth = 100;
    this.gameHeight = 75;
    this.parentEl = document.body;
    this.parentElBgColor = '#000';
    this.canvasBgColor = '#FFF';

    for (var key in options) {
        this[key] = options[key];
    }
};

exports['default'] = Config;
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
/**
 * @class       GetSet
 * @description Base class with get/set(ters)
 * @author      Chris Peters
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

var GetSet = (function () {
    /**
     *
     */

    function GetSet() {
        _classCallCheck(this, GetSet);
    }
    // nada

    /**
     * Get and property assuming it begins with an underscore
     * @param  {String} prop The property name to get (to get the property `_x` just
     *                       pass 'x')
     * @return {Any}
     */

    _createClass(GetSet, [{
        key: 'get',
        value: function get(prop) {
            return this['_' + prop];
        }

        /**
         * set on or more properties
         * @param {String|Object} key    A string to set one property, or an object to set
         *                               many
         * @param {Any}           [val]  The value to assign if setting a single value
         * @return {GetSet}       Return this object for chaining
         */
    }, {
        key: 'set',
        value: function set(key, val) {
            switch (typeof key) {
                case 'string':
                    this['_' + key] = val;
                    break;
                case 'object':
                    var changes = key;
                    for (key in changes) {
                        this['_' + key] = changes[key];
                    }
                    break;
            }
        }
    }]);

    return GetSet;
})();

exports['default'] = GetSet;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

var _libMaintainMax = require('./lib/MaintainMax');

var _libMaintainMax2 = _interopRequireDefault(_libMaintainMax);

/**
 * @class       Viewport
 * @description Creates and handles the canvas DOM element
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

        this._canvas.width = this._config.gameWidth * this._config.blockSize;
        this._canvas.height = this._config.gameHeight * this._config.blockSize;
        this._canvas.style.position = 'absolute';
        this._canvas.style.backgroundColor = this._config.canvasBgColor;

        this._config.parentEl.style.backgroundColor = this._config.parentElBgColor;
        this._config.parentEl.appendChild(this._canvas);

        this._window.addEventListener('resize', this._handleResize.bind(this));

        this._handleResize();
    }

    _createClass(Viewport, [{
        key: '_handleResize',
        value: function _handleResize() {
            var config = this._config;

            var _MaintainMax$fit = _libMaintainMax2['default'].fit(config.gameWidth * config.blockSize, config.gameHeight * config.blockSize);

            var top = _MaintainMax$fit.top;
            var left = _MaintainMax$fit.left;
            var width = _MaintainMax$fit.width;
            var height = _MaintainMax$fit.height;

            this._canvas.style.top = Math.round(top) + 'px';
            this._canvas.style.left = Math.round(left) + 'px';
            this._canvas.style.width = Math.round(width) + 'px';
            this._canvas.style.height = Math.round(height) + 'px';
        }
    }, {
        key: 'getContext',
        value: function getContext() {
            return this._context;
        }
    }]);

    return Viewport;
})();

exports['default'] = Viewport;
module.exports = exports['default'];

},{"./lib/MaintainMax":6}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

var _get = function get(_x, _x2, _x3) {
  var _again = true;_function: while (_again) {
    var object = _x,
        property = _x2,
        receiver = _x3;desc = parent = getter = undefined;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);if (parent === null) {
        return undefined;
      } else {
        _x = parent;_x2 = property;_x3 = receiver;_again = true;continue _function;
      }
    } else if ('value' in desc) {
      return desc.value;
    } else {
      var getter = desc.get;if (getter === undefined) {
        return undefined;
      }return getter.call(receiver);
    }
  }
};

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _Drawable2 = require('./Drawable');

var _Drawable3 = _interopRequireDefault(_Drawable2);

/**
 * @class       Block
 * @description 2D point with color data
 * @extends     {Drawable}
 * @author      Chris Peters
 */

var Block = (function (_Drawable) {
  _inherits(Block, _Drawable);

  /**
   * Initialize a point with 0,0 or given coordinates
   *
   * @param {Object}  deps        Injected dependencies
   * @param {Object}  deps.config Configuration
   * @param {Integer} [x]         Initial x position
   * @param {Integer} [y]         Initial y position
   * @param {String}  [color]     Initial color
   */

  function Block(deps, x, y, color) {
    _classCallCheck(this, Block);

    _get(Object.getPrototypeOf(Block.prototype), 'constructor', this).call(this, deps);

    this._config = deps.config;

    this._x = x || 0;
    this._y = y || 0;
    this._color = color || '#000';
  }

  /**
   * Renders a block to the canvas
   *
   * @param {Object} context
   */

  _createClass(Block, [{
    key: 'render',
    value: function render(context) {
      var size = this._config.blockSize;

      var _getPixelOffset = this._getPixelOffset(this._x, this._y);

      var x = _getPixelOffset.x;
      var y = _getPixelOffset.y;

      context.save();
      context.fillStyle = this._color;
      context.fillRect(x, y, size, size);
      context.restore();
    }
  }]);

  return Block;
})(_Drawable3['default']);

exports['default'] = Block;
module.exports = exports['default'];

},{"./Drawable":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _get = function get(_x, _x2, _x3) {
    var _again = true;_function: while (_again) {
        var object = _x,
            property = _x2,
            receiver = _x3;desc = parent = getter = undefined;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
                return undefined;
            } else {
                _x = parent;_x2 = property;_x3 = receiver;_again = true;continue _function;
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;if (getter === undefined) {
                return undefined;
            }return getter.call(receiver);
        }
    }
};

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _GetSet2 = require('../GetSet');

var _GetSet3 = _interopRequireDefault(_GetSet2);

/**
 * @class       Drawable
 * @description Base class for all drawable objects
 * @extends     {GetSet}
 * @author      Chris Peters
 */

var Drawable = (function (_GetSet) {
    _inherits(Drawable, _GetSet);

    /**
     * @param {Object} deps Injected dependencies
     */

    function Drawable(deps) {
        _classCallCheck(this, Drawable);

        _get(Object.getPrototypeOf(Drawable.prototype), 'constructor', this).call(this);

        this._config = deps.config;
    }

    /**
     * [getPointOffset description]
     * @param  {Integer} x [description]
     * @param  {Integer} y [description]
     * @return {Object}  The Block point offset
     */

    _createClass(Drawable, [{
        key: '_getPixelOffset',
        value: function _getPixelOffset(x, y) {
            var size = this._config.blockSize;

            return {
                x: Math.round(x) * size - size / 2,
                y: Math.round(y) * size - size / 2
            };
        }
    }]);

    return Drawable;
})(_GetSet3['default']);

exports['default'] = Drawable;
module.exports = exports['default'];

},{"../GetSet":2}],6:[function(require,module,exports){
/**
 * @class       MaintainMax
 * @description Keeps canvas element centered and (with aspect ratio intact) in the viewport
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

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

exports["default"] = MaintainMax;
module.exports = exports["default"];

},{}],7:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _distConfig = require('../../dist/Config');

var _distConfig2 = _interopRequireDefault(_distConfig);

var _distViewport = require('../../dist/Viewport');

var _distViewport2 = _interopRequireDefault(_distViewport);

var _distDrawBlock = require('../../dist/draw/Block');

var _distDrawBlock2 = _interopRequireDefault(_distDrawBlock);

// initialize new config object
var config = new _distConfig2['default']({
    blockSize: 32,
    gameWidth: 32,
    gameHeight: 24
});
// initialize the new Viewport passing in the config object
var viewport = new _distViewport2['default']({ config: config });
// initialize block with config, and initial values
var block = new _distDrawBlock2['default']({ config: config }, 0, 0, '#C22');

block.render(viewport.getContext());

block.set({
    x: 8,
    y: 6,
    color: '#4C4'
});

block.render(viewport.getContext());

block.set({
    x: 16,
    y: 12,
    color: '#48F'
});

block.render(viewport.getContext());

},{"../../dist/Config":1,"../../dist/Viewport":3,"../../dist/draw/Block":4}]},{},[7]);
