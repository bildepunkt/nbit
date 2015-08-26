##
#
#
class Bresenham

    @calculate: (ptA, ptB, callback) ->
        dx = Math.abs(ptB.x - ptA.x)
        sx = if ptA.x < ptB.x then 1 else -1
        dy = Math.abs(ptB.y - ptA.y)
        sy = if ptA.y < ptB.y then 1 else -1
        err = (if dx > dy then dx else -dy) / 2

        xTotal = Math.abs ptB.x - ptA.x
        yTotal = Math.abs ptB.y - ptA.y

        while xTotal >= 0 or yTotal >= 0
            callback ptA.x, ptA.y

            e2 = err;

            if e2 > -dx
                err -= dy
                ptA.x += sx

            if e2 < dy
                err += dx
                ptA.y += sy

            xTotal--
            yTotal--

        undefined

module.exports = Bresenham;
