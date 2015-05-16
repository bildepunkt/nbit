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
    clear: () ->
        @context.clearRect 0, 0, config.width, config.height

    #
    #
    #
    fill: (color) ->
        hasGap = config.gap > 0

        @context.save()
        @context.fillStyle = if hasGap then config.gapColor else color
        @context.fillRect 0, 0, config.width, config.height

        if hasGap
            xlen = config.width / config.gap
            ylen = config.height / config.gap
            size = config.pxSize
            halfGap = Math.floor config.gap / 2
            
            @context.fillStyle = color

            for y in [0..xlen]
                for x in [0..ylen]
                    @context.fillRect size * x + halfGap, size * y + halfGap, size - halfGap, size - halfGap

        @context.restore()

    #
    #
    #
    render: (entity) ->
        size = config.pxSize
        gap = config.gap
        map = entity.map
        legend = entity.legend
        halfGap = Math.floor gap / 2

        @context.save()
        @context.translate entity.x, entity.y

        for mapy, y in map
            for mapx, x in mapy
                if legend[mapx]?
                    @context.fillStyle = legend[mapx]
                    @context.fillRect size * x + halfGap, size * y + halfGap, size - halfGap, size - halfGap

        @context.restore()


module.exports = Draw