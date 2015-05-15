#
# @class draw
#
config = require '../config'

class Draw
    constructor: (el) ->
        @el = el

    render: (entity) ->
        @el

module.exports = Draw