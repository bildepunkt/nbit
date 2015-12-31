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