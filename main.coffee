can = document.querySelector 'canvas'
can.width = 512
can.height = 512
ctx = can.getContext '2d'

##
# @class Vector
#
class Vector
    constructor: (ctx)->
        @context = ctx
        @strokeStyle = '#0C0'
        @fillStyle = '#C0C'
        @size = 8
        @gap = 2

    ##
    # @param {integer}
    # @param {integer}
    # @param {integer}
    # @param {integer}
    # @param {function} fn - execute and pass x, y coordinates
    #
    bresenhamize: (x0, y0, x1, y1, fn) ->
        dx = Math.abs(x1 - x0)
        sx = if x0 < x1 then 1 else -1
        dy = Math.abs(y1 - y0)
        sy = if y0 < y1 then 1 else -1
        err = (if dx > dy then dx else -dy) / 2

        xTotal = Math.abs x1 - x0
        yTotal = Math.abs y1 - y0

        while xTotal >= 0 or yTotal >= 0
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

    ##
    # @param {array} points - an array of vector objects

    #
    setPoints: (points) ->
        hi =  x: 0, y: 0
        lo = x: 0, y: 0
        bitmap = []

        for pt, i in points
            lo.x = if pt.x < lo.x then pt.x else lo.x
            lo.y = if pt.y < lo.y then pt.y else lo.y
            hi.x = if pt.x > hi.x then pt.x else hi.x
            hi.y = if pt.y > hi.y then pt.y else hi.y

        bitmap = @createBlank hi.x - lo.x, hi.y - lo.y
        bitmap = @setStroke bitmap, points
        bitmap = @setFill bitmap

        @bitmap = bitmap;

        undefined

    ##
    #
    #
    setStroke: (bitmap, points)->
        # pass bitmap via closure for each set of pts
        handler = (x, y) ->
           bitmap[y][x] = 1

           undefined

        for pt, p in points
            nextPt = points[p + 1]
            if nextPt?
                @bresenhamize pt.x, pt.y, nextPt.x, nextPt.y, handler
            else
                break

        bitmap

    ##
    # fills horizontally
    #
    setFill: (bitmap)->
        fillStarted = false
        fillEnded = false
        fillableIndex = false
        rowHasFill = false
        filledRow = []

        for bitmapY, y in bitmap

            if rowHasFill
                bitmap[y - 1] = filledRow

            console.log '-----'
            fillStarted = false
            fillEnded = false
            fillableIndex = false
            rowHasFill = false
            filledRow = []

            for bitmapYX, x in bitmapY
                fillableIndex = false

                if bitmapYX == 0 and bitmapY[x - 1] == 1
                    fillStarted = true

                if bitmapYX == 1 and fillStarted
                    fillEnded = true

                    rowHasFill = true

                if fillStarted and not fillEnded
                    fillableIndex = true

                filledRow[x] = if fillableIndex then 2 else bitmapYX
                    
        bitmap

    ##
    #
    #
    render: ()->
        @context.save()

        for bmy, y in @bitmap
            for bmx, x in bmy
                noPoint = false

                if bmx == 0
                    noPoint = true
                else if bmx == 1
                    @context.fillStyle = @strokeStyle
                else if bmx == 2
                    @context.fillStyle = @fillStyle
                
                if not noPoint
                    @drawPoint x, y

        @context.restore()

        undefined

    ##
    #
    #
    drawPoint: (x, y)->
        if @gap?
            halfGap = @gap / 2
            @context.fillRect (x * @size) + halfGap * x, (y * @size) + halfGap * y, @size - halfGap, @size - halfGap
        else
            @context.fillRect x * @size, y * @size, @size, @size

        undefined

    ##
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


v = new Vector ctx
v.setPoints [
   {x: 0, y: 0}
   {x: 8, y: 4}
   {x: 8, y: 8}
   {x: 0, y: 4}
   {x: 0, y: 0}
]
v.render()