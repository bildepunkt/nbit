Sprite = require('./sprite');

##
# @class Bitmap
# @extend Sprite
# @require Viewport
# @require Config
#
class Bitmap extends Sprite
    constructor: (options)->
        super options

        @_deps = options
        @_bitmap = null
        @_legend = null

    ##
    #
    #
    render: ()->
        super()