Base = require('./base');

##
# @class Config
# @extend Base
#
class Config extends Base
    constructor: (options)->
        super()

        @_scale = 8;
        @_width = 100;
        @_height = 75;
        @_canvasId = 'canvas';

        for key of options
            @['_' + key] = options[key]


module.exports = Config
