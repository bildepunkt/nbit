Base = require('./base');

##
# @class Viewport
# @extend Base
# @require Config
#
class Viewport extends Base
    constructor: (options)->
        super()

        @_deps = options

        dimensions = @_deps.config.get 'scale'

        @_canvas = document.getElementById @_deps.config.get 'canvasId'
        @_context = @_canvas.getContext '2d'
        @_canvas.width = @_deps.config.get('width' ) * dimensions
        @_canvas.height = @_deps.config.get('height') * dimensions

    clear: ->
        @_context.clearRect 0, 0, @_canvas.width, @_canvas.height

    drawPoint: (x, y)->
        dimensions = @_deps.config.get 'scale'
        @_context.fillRect(
            x * dimensions - dimensions / 2,
            y * dimensions - dimensions / 2,
            dimensions,
            dimensions
        )

        undefined

module.exports = Viewport
