/**
 * @class       Point
 * @description Create 2D point. This object does not conform to the underscore
 *              prefixed private property paradigm.
 * @author      Chris Peters
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

exports["default"] = Point;
module.exports = exports["default"];