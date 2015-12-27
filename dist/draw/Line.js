'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Block = require('./Block');

var _Block2 = _interopRequireDefault(_Block);

var _Bresenham = require('../lib/Bresenham');

var _Bresenham2 = _interopRequireDefault(_Bresenham);

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

    function Line(deps, color) {
        _classCallCheck(this, Line);

        this._config = deps.config;

        this._points = [];
        this._color = color || '#000';
    }

    /**
     * The wrapper method to pass to Bresenham.plotLine
     *
     * @param  {[type]} x [description]
     * @param  {[type]} y [description]
     */

    _createClass(Line, [{
        key: '_plot',
        value: function _plot(x, y) {
            _Block2.default.render(x, y, this._color, this._config.blockSize, this._context);
        }

        /**
         * Set the line's two points
         *
         * @param {[type]} key [description]
         * @param {[type]} val [description]
         */

    }, {
        key: 'setPoints',
        value: function setPoints(ptA, ptB) {
            this._points = [ptA, ptB];

            return this;
        }
    }, {
        key: 'render',
        value: function render() {
            if (this._points[0] && this._points[1]) {
                _Bresenham2.default.plotLine(this._points[0], this._points[1], this._plot.bind(this));
            } else {
                throw new Error('Line must have two points');
            }
        }
    }]);

    return Line;
})();

exports.default = Line;