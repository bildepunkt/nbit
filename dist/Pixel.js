/**
 * @class       Pixel
 * @description 2D point with color data
 * @author      Chris Peters
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Pixel =
/**
 * initialize a point with 0,0 or given coordinates
 * @param  {Integer} x
 * @param  {Integer} y
 * @param  {String}  color
 */
function Pixel(x, y, color) {
  _classCallCheck(this, Pixel);

  this._x = x || 0;
  this._y = y || 0;
  this._color = color || '#000';
};

exports['default'] = Pixel;
module.exports = exports['default'];