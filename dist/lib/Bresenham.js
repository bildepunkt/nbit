"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       Bresenham
 * @description Bresenham's formulae for calculating blocks from curves, between points etc.
 * @author      Chris Peters
 */

var Bresenham = (function () {
    function Bresenham() {
        _classCallCheck(this, Bresenham);
    }

    _createClass(Bresenham, null, [{
        key: "plotLine",

        /**
         * plot the connecting blocks between two points
         * @param {Point} ptA
         * @param {Point} ptB
         * @param {function} callback - what to do when a connection point is calculated
         */
        value: function plotLine(ptA, ptB, plot) {
            var dx = Math.abs(ptB.x - ptA.x);
            var sx = ptA.x < ptB.x ? 1 : -1;
            var dy = -Math.abs(ptB.y - ptA.y);
            var sy = ptA.y < ptB.y ? 1 : -1;
            var err = dx + dy,
                e2 = undefined;

            while (true) {
                plot(ptA.x, ptA.y);

                if (ptA.x == ptB.x && ptA.y == ptB.y) {
                    break;
                }

                e2 = 2 * err;

                if (e2 >= dy) {
                    err += dy;
                    ptA.x += sx;
                }

                if (e2 <= dx) {
                    err += dx;
                    ptA.y += sy;
                }
            }
        }
    }]);

    return Bresenham;
})();

exports.default = Bresenham;