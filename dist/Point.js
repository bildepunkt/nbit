/**
 * @class       Point
 * @description create 2D point
 * @author      Chris Peters
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector =
/**
 * initialize a point with 0,0 or given coordinates
 * @param  {Integer} x
 * @param  {Integer} y
 */
function Vector(x, y) {
  _classCallCheck(this, Vector);

  this.x = x || 0;
  this.y = y || 0;
};

exports["default"] = Vector;
module.exports = exports["default"];