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
    _checkProp: (key)->
        unless @.hasOwnProperty '_' + key
            throw new Error "property '#{key}' does not exist"

    ##
    #
    #
    set: (key, val)->
        @_checkProp(key)

        @['_' + key] = val
        # make chainable
        @

    ##
    #
    #
    get: (key)->
        @_checkProp(key)
            
        @['_' + key]

    ##
    #
    #
    add: (key, val)->
        if typeof key == 'string' and val isnt undefined
            @['_' + key] = val
        else if typeof key == 'object' and key? and val == undefined
            keys = key
            for key of keys
                @['_' + key] = keys[key]


module.exports = Base
