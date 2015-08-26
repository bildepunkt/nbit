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

        for point, i in @_points
            nextPt = @_points[i + 1]

            if nextPt?
                point = utils.clone point
                nextPt = utils.clone nextPt
                Bresenham.calculate point, nextPt, @_drawPt.bind @

        undefined

module.exports = Line

