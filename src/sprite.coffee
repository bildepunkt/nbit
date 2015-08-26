Base = require('./base');

##
# @class Sprite
# @extend Base
# @require Viewport
# @require Config
#
class Sprite extends Base
    constructor: (options)->
        super()

        @_deps = options
        @_x = 0
        @_y = 0
        @_rotation = 0
        @_color = '#000'
        @_scaleX = 1
        @_scaleY = 1

        # true for initial render
        @_dirty = true

    ##
    #
    #
    set: (key, val)->
        @_dirty = true
        super key, val

    ##
    #
    #
    render: ->
        if not @_dirty then return
        @_dirty = false


module.exports = Sprite
