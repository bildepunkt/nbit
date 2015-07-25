Base = require('./base');

##
# @class Collection
# @extend Base
#
class Collection extends Base
    constructor: ->
        super()

        @_items = []

    ##
    #
    #
    addItem: (item)->
        @_items.push item

    ##
    #
    #
    removeItem: (target)->
        for item, i in @_items
            if target.get 'uid' == item.get 'uid'
                @_items.splice i, 1
                break


module.exports = Collection
