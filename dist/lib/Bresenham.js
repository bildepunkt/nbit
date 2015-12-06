/**
 * @class       Bresenham
 * @description Use Bresenham's formula to calculate the points between points
 * @author      Chris Peters
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bresenham = (function () {
    function Bresenham() {
        _classCallCheck(this, Bresenham);
    }

    _createClass(Bresenham, null, [{
        key: "calculate",

        /**
         * calculate the connection points between two points
         * @param {Point} ptA
         * @param {Point} ptB
         * @param {function} callback - what to do when a connection point is calculated
         */
        value: function calculate(ptA, ptB, callback) {
            var dx = Math.abs(ptB.x - ptA.x);
            var sx = ptA.x < ptB.x ? 1 : -1;
            var dy = Math.abs(ptB.y - ptA.y);
            var sy = ptA.y < ptB.y ? 1 : -1;
            var err = (dx > dy ? dx : -dy) / 2;
            var e2 = undefined;

            var xTotal = Math.abs(ptB.x - ptA.x);
            var yTotal = Math.abs(ptB.y - ptA.y);

            while (xTotal >= 0 || yTotal >= 0) {
                callback(ptA.x, ptA.y);

                e2 = err;

                if (e2 > -dx) {
                    err -= dy;
                    ptA.x += sx;
                }

                if (e2 < dy) {
                    err += dx;
                    ptA.y += sy;
                }

                xTotal--;
                yTotal--;
            }
        }
    }]);

    return Bresenham;
})();

exports["default"] = Bresenham;
module.exports = exports["default"];