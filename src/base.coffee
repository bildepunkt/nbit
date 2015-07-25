##
# @class Base
#
class Base
    ##
    # @static
    #
    @counter: 0
    
    ##
    # @static
    #
    @getUid: ->
        @counter++

    constructor: ->
        @_uid = Base.getUid()

    ##
    #
    #
    set: (key, val)->
        @['_' + key] = val
        # make chainable
        @

    ##
    #
    #
    get: (key)->
        @['_' + key]


module.exports = Base
