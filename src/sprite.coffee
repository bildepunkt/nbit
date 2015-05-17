##
# @author Chris Peters c.concat.p@gmail.com
# @class Sprite
# @extends Base
#
config = require '../config'
Base = require './base'

class Sprite extends Base
    ##
    # @constructor
    # @param {object} [options]
    #
    constructor: (options)->
        @x = 0
        @y = 0
        @width
        @height
        @legend
        @hitMap
        @bitmapName
        @bitmapIndex
        @bitmaps = {}

        super()

    ##
    #
    #
    setHitMap: (hitMap)->
        @hitMap = hitMap

    ##
    # @method Sprite.prototype.getBitmap
    #
    getBitmap: ()->
        @bitmaps[@bitmapName][@bitmapIndex]

    ##
    # @method Sprite.prototype.setBitmap
    # @param {string} name
    # @param {integer} [index]
    #
    setBitmap: (name, index)->
        @bitmapName = name
        @bitmapIndex = if index? then index else 0

    ##
    # @method Sprite.prototype.addBitmap
    # @param {string} name    - name of bitmap
    # @param {array}  data... - an array of n 2d arrays
    #
    addBitmap: (name, data...)->
        @bitmaps[name] = data
        @bitmapName = name
        @setBitmap name

    ##
    # @method Sprite.prototype.setBitmap
    # @param {object} legend - key/val for colors
    #
    setLegend: (legend)->
        @legend = legend
    
    ##
    #
    #
    press: (e)-> e
    ##
    #
    #
    dblpress: (e)-> e
    ##
    #
    #
    pressup: (e)-> e
    ##
    #
    #
    pressdown: (e)-> e
    ##
    #
    #
    dragstart: (e)-> e
    ##
    #
    #
    drag: (e)-> e
    ##
    #
    #
    dragend: (e)-> e

    ##
    #
    #
    getX: ()-> @x
    ##
    #
    #
    setX: (x)-> @x = x
    ##
    #
    #
    getY: ()-> @y
    ##
    #
    #
    setY: (y)-> @y = y
    ##
    #
    #
    getWidth: ()-> @width
    ##
    #
    #
    setWidth: (width)-> @width = width
    ##
    #
    #
    getHeight: ()-> @height
    ##
    #
    #
    setHeight: (height)-> @height = height


module.exports = Sprite