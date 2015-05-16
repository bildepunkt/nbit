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
        sx = if x0 < x1 then 1 else -1
        dy = Math.abs(y1 - y0)
        sy = if y0 < y1 then 1 else -1
        err = (if dx > dy then dx else -dy) / 2

        xTotal = Math.abs x1 - x0
        yTotal = Math.abs y1 - y0

        while xTotal >= 0 and yTotal >= 0
            fn x0, y0

            e2 = err;

            if e2 > -dx
                err -= dy
                x0 += sx

            if e2 < dy
                err += dx
                y0 += sy

            xTotal--
            yTotal--

        undefined

    #
    # @param {array} points - an array of vector objects
    #
    fromPoints: (points) ->
        lo = x: Infinity, y: Infinity
        hi = x: -Infinity, y: -Infinity
        bitmap = []
        # pass @bitmap via closure for each set of pts
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