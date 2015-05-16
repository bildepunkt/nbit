#
# @class Draw
#
config = require '../config'

class Draw
    #
    #
    #
    constructor: (context) ->
        @context = context

    #
    #
    #
    render: (entity) ->
        size = config.pxSize
        gap = config.gap
        map = entity.map
        legend = entity.legend
        halfGap = Math.floor gap / 2

        @context.translate(entity.x, entity.y);

        for mapy, y in map
            for mapx, x in mapy
                if legend[mapx]?
                    @context.fillStyle = legend[mapx]
                    @context.fillRect size * x + halfGap, size * y + halfGap, size - halfGap, size - halfGap

        @context.restore();


module.exports = Draw