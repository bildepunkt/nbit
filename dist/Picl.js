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