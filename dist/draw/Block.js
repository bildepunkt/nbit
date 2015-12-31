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
 * @class       draw.Line
 * @description Plots Blocks between (and at) two Points
 * @requires    Block
 * @requires    Bresenham
 * @author      Chris Peters
 */

var Line = (function () {
    /**
     *
     * @param {Object}  deps         Injected dependencies
     * @param {Object}  deps.config  Configuration
     * @param {Object}  deps.context The canvas' 2d context
     * @param {String}  [color]      Initial color
     */

    function Line(color) {
        _classCallCheck(this, Line);

        this._point = null;
        this._strokeColor = color || '#000';
    }

    /**
     * Set the line's two points
     *
     * @param {[type]} key [description]
     * @param {[type]} val [description]
     */

    _createClass(Line, [{
        key: 'setPoint',
        value: function setPoint(val) {
            this._point = val;

            return this;
        }
    }, {
        key: 'render',
        value: function render() {
            _Canvas2.default.render(this._point.x, this._point.y, this._strokeColor);
        }
    }]);

    return Line;
})();

exports.default = Line;