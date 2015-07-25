Base = require('./base');

##
# @class Config
# @extend Base
#
class Config extends Base
    constructor: (options)->
        super()

        @_scale = 8;
        @_width = 800;
        @_height = 600;
        @_canvasId = 'canvas';

        for key of options
            @['_' + key] = options[key]


module.exports = Config
