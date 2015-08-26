Sprite = require './sprite'
Bresenham = require './bresenham'
utils = require './lib/utils'

##
# @class Line
# @require Viewport
# @require Config
# @extend Sprite
#
class Line extends Sprite
    constructor: (options)->
        super options

        @_deps = options

        @_points = []

    ##
    #
    #
    _drawPt: (x, y)->
        dimensions = @_deps.config.get 'scale'
        @_deps.viewport.get('context').fillRect(
            x * dimensions - dimensions / 2,
            y * dimensions - dimensions / 2,
            dimensions,
            dimensions
        )

        undefined

    ##
    #
    #
    setPoints: (a, b)->
        @_points = [a, b]

    ##
    #
    #
    render: ()->
        super()

        dimensions = @_deps.config.get 'scale'
        ctx = @_deps.viewport.get('context')

        for point, i in @_points
            nextPt = @_points[i + 1]

            if nextPt?
                ctx.save()
                ctx.translate @_x * dimensions, @_y * dimensions

                point = utils.clone point
                nextPt = utils.clone nextPt

                if @_rotation != 0
                    point = utils.rotatePoint(
                        point.x, point.y, @_offsetX, @_offsetY, @_rotation
                    )
                    nextPt = utils.rotatePoint(
                        nextPt.x, nextPt.y, @_offsetX, @_offsetY, @_rotation
                    )

                Bresenham.calculate point, nextPt, @_drawPt.bind @

                ctx.restore()

        undefined

module.exports = Line

