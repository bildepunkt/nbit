'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Canvas = require('./Canvas');

var _Canvas2 = _interopRequireDefault(_Canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       draw.Picl
 * @description Base drawing object for all nbit components
 * @requires    Canvas
 * @author      Chris Peters
 */

var Picl = (function () {
  /**
   * @param {Point}  [point] initial 2d point
   * @param {String} [color] Initial color
   */

  function Picl(point, color) {
    _classCallCheck(this, Picl);

    this._point = point || { x: 0, y: 0 };
    this._strokeColor = color || '#000';
  }

  /**
   * Set the Picl's 2d point
   *
   * @param {Point} val
   */

  _createClass(Picl, [{
    key: 'setPoint',
    value: function setPoint(val) {
      this._point = val;

      return this;
    }

    /**
     * render Picl to the canvas
     */

  }, {
    key: 'render',
    value: function render() {
      _Canvas2.default.renderPicl(this._point.x, this._point.y, this._strokeColor);
    }
  }]);

  return Picl;
})();

exports.default = Picl;