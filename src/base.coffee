##
# @author Chris Peters c.concat.p@gmail.com
# @class Base
#
(->
    #
    #
    #
    count = 1

    class Base
        ##
        # @constructor
        # @param {object} [options]
        #
        constructor: (options)->
            @uid = "_#{count++}_"

            for key of options
                if key in @
                    @[key] = options[key]


    module.exports = Base
)()