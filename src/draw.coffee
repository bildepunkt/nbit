##
# @author Chris Peters c.concat.p@gmail.com
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
        @context.save()
        @context.fillStyle = color
        @context.fillRect 0, 0, config.width, config.height
        @context.restore()

    #
    #
    #
    render: (entity) ->
        size = config.pxSize
        map = entity.getBitmap()
        legend = entity.legend

        @context.save()
        @context.translate entity.x, entity.y

        for mapy, y in map
            for mapx, x in mapy
                if legend[mapx]?
                    @context.fillStyle = legend[mapx]
                    @context.fillRect size * x, size * y, size, size

        @context.restore()


module.exports = Draw