#
# @class Bitmap
#
class Bitmap
    #
    # @param {integer}
    # @param {integer}
    # @param {integer}
    # @param {integer}
    # @param {function} fn - execute and pass x, y coordinates
    #
    bresenhamLine: (x0, y0, x1, y1, fn) ->
        dx = Math.abs(x1 - x0)
        sx = x0 < x1 ? 1 : -1
        dy = Math.abs(y1 - y0)
        sy = y0 < y1 ? 1 : -1
        err = (dx > dy ? dx : -dy) / 2

        while x0 <= x1 and y0 <= y1
            fn x0, y0

            e2 = err;

            if e2 > -dx
                err -= dy
                x0 += sx

            if e2 < dy
                err += dx
                y0 += sy

        undefined

    #
    # @param {array} points - an array of vector objects
    #
    createBitmap: (points) ->
        lo = x: Infinity, y: Infinity
        hi = x: -Infinity, y: -Infinity
        bitmap = []
        handler = (x, y) ->
            bitmap[y][x] = 1

        for pt, i in points
            lo.x = if pt.x < lo.x then pt.x else lo.x
            lo.y = if pt.y < lo.y then pt.y else lo.y
            hi.x = if pt.x > hi.x then pt.x else hi.x
            hi.y = if pt.y > hi.y then pt.y else hi.y

        bitmap = @createBlank hi.x - lo.x, hi.y - lo.y

        for pt, i in points
            nextPt = points[i + 1]
            if nextPt?
                @bresenhamLine pt.x, pt.y, nextPt.x, nextPt.y, handler
            else
                break

        bitmap;

    #
    # @param {integer} xlen
    # @param {integer} ylen
    #
    createBlank: (xlen, ylen) ->
        blank = [];

        for y in [0..ylen]
            blank[y] = [];
            for x in [0..xlen]
                blank[y][x] = 0

        blank


module.exports = Bitmap