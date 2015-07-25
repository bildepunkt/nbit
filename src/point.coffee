Sprite = require('./sprite');

##
# @class Point
# @require Viewport
# @require Config
# @extend Sprite
#
class Point extends Sprite
    constructor: (options)->
        super options

        @_deps = options

    ##
    #
    #
    render: ()->
        super()

        ctx = @_deps.viewport.get('context')

        ctx.save()
        ctx.translate @_x, @_y
        ctx.fillStyle = @_color
        ctx.fillRect(
            0, 0, @_deps.config.get('scale'), @_deps.config.get('scale')
        )
        ctx.restore()


module.exports = Point
