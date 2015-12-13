'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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