'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Block = require('./Block');

var _Block2 = _interopRequireDefault(_Block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 */

var Bitmap = (function () {
    function Bitmap() {
        _classCallCheck(this, Bitmap);

        this._map = null;
    }

    _createClass(Bitmap, [{
        key: '_getMapOffset',
        value: function _getMapOffset(map) {
            var leny = map.length;
            var lenx = map[0].length;

            return {
                x: lenx / 2,
                y: leny / 2
            };
        }
    }, {
        key: 'setMap',
        value: function setMap(map) {
            this._map = map;

            return this;
        }
    }, {
        key: 'render',
        value: function render() {
            var offset = this._getMapOffset(this._map),
                mapy = undefined,
                mapx = undefined;

            for (var y = 0, leny = this._map.length; y < leny; y++) {
                mapy = this._map[y];

                for (var x = 0, lenx = mapy.length; x < lenx; x++) {
                    mapx = mapy[x];

                    _Block2.default.render(x - offset.x, y - offset.y, mapx);
                }
            }
        }
    }]);

    return Bitmap;
})();

exports.default = Bitmap;