###
# @class Line
# @require Viewport
# @require Config
# @extend Sprite
#
class Line extends Sprite
    'use strict';

    var Line = function(options) {
        this._points = [];
    };

    Line.prototype = new Sprite(options);

    Line.prototype._bresenhamise = function(x0, y0, x1, y1) {
        var dx = Math.abs(x1 - x0);
        var sx = x0 < x1 ? 1 : -1;
        var dy = Math.abs(y1 - y0);
        var sy = y0 < y1 ? 1 : -1;
        var err = dx > dy ? dx : -dy / 2;

        var xTotal = Math.abs(x1 - x0);
        var yTotal = Math.abs(y1 - y0);

        while (xTotal >= 0 || yTotal >= 0) {
            this._drawPixel(x0, y0).bind(this);

            var e2 = err;

            if (e2 > -dx) {
                err -= dy
                x0 += sx
            }

            if (e2 < dy) {
                err += dx
                y0 += sy
            }

            xTotal--;
            yTotal--;
        }
    };

    Line.prototype._drawPixel = function(x, y) {
        this._viewport.context.drawRect(x, y, this._config.scale, this._config.scale);
    };

    Line.prototype.render = function() {
        var nextPt;

        for(var i = 0, len = this._points.length; i < len; i += 1) {
            nextPt = this._points[i + 1];

            if (typeof nextPt === 'object' && nextPt != null) {
                this._bresenhamise(this._points[i], nextPt);
            }
        }
    };

    return Line;
}());

###