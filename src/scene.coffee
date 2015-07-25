Base = require('./base');

##
# @class Scene
# @extend Base
# @require Collection
#
class Scene extends Base
    constructor: (options)->
        super()

        @_deps = options
        @_entities = new @_deps.Collection()

    ##
    #
    #
    addEntity: (entity)->
        @_entities.addItem entity

    ##
    #
    #
    removeEntity: (entity)->
        @_entities.removeItem entity

    ##
    #
    #
    getEntities: ->
        @_entities.get 'items'

    ##
    #
    #
    update: ->
        undefined


module.exports = Scene
