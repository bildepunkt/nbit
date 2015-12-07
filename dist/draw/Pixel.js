'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _GetSet2 = require('../GetSet');

var _GetSet3 = _interopRequireDefault(_GetSet2);

/**
 * @class       Pixel
 * @description 2D point with color data
 * @extends     {GetSet}
 * @author      Chris Peters
 */

var Pixel = (function (_GetSet) {
  _inherits(Pixel, _GetSet);

  /**
   * initialize a point with 0,0 or given coordinates
   * @param  {Integer} x
   * @param  {Integer} y
   * @param  {String}  color
   */

  function Pixel(x, y, color) {
    _classCallCheck(this, Pixel);

    _get(Object.getPrototypeOf(Pixel.prototype), 'constructor', this).call(this);

    this._x = x || 0;
    this._y = y || 0;
    this._color = color || '#000';
  }

  return Pixel;
})(_GetSet3['default']);

exports['default'] = Pixel;
module.exports = exports['default'];