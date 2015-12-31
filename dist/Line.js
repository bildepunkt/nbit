'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Bresenham = require('./lib/Bresenham');

var _Bresenham2 = _interopRequireDefault(_Bresenham);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       draw.Line
 * @description Plots Picls between (and at) n Points
 * @requires    Bresenham
 * @author      Chris Peters
 */

var Line = (function () {
    /**
     * @param {String} [color] Initial color
     */

    function Line(color) {
        _classCallCheck(this, Line);

        this._picls = [];

        for (var _len = arguments.length, points = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            points[_key - 1] = arguments[_key];
        }

        this._points = [points];
        this._strokeColor = color || '#000';
    }

    /**
     * the Picl-pusher to pass to Bresenham.plotLine
     *
     * @private
     * @param  {[type]} x [description]
     * @param  {[type]} y [description]
     */

    _createClass(Line, [{
        key: '_addPicls',
        value: function _addPicls(x, y) {
            this._picls.push(new Picl(x, y, this._strokeColor));
        }

        /**
         * Set the line's points
         *
         * @param {Point} ...points
         */

    }, {
        key: 'setPoints',
        value: function setPoints() {
            for (var _len2 = arguments.length, points = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                points[_key2] = arguments[_key2];
            }

            if (points.length < 2) {
                throw new Error('Line must have at least two points');
            }

            this._points = [points];

            return this;
        }
    }, {
        key: 'render',
        value: function render() {
            // empty picl array
            this._picls = [];

            for (var i = 0, len = this._points.length - 1; i < len; i++) {
                _Bresenham2.default.plotLine(this._points[i], this._points[i + 1], this._addPicls.bind(this));
            }

            return this._picls;
        }
    }]);

    return Line;
})();

exports.default = Line;