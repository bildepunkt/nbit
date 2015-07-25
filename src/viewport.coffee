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
        @_canvas = document.getElementById @_deps.config.get 'canvasId'
        @_context = @_canvas.getContext '2d'
        @_canvas.width = @_deps.config.get 'width'
        @_canvas.height = @_deps.config.get 'height'


module.exports = Viewport
