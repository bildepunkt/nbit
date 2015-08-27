##
# @class Line
# @require Viewport
# @require Config
# @extend Sprite
#
class Vector
    constructor: (xOrObject, y)->
        if xOrObject.hasOwnProperty('x') and xOrObject.hasOwnProperty('y')
            @x = xOrObject.x
            @y = xOrObject.y
        else
            @x = xOrObject
            @y = y

module.exports = Vector
