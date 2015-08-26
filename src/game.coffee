Base = require './base'

##
# @class Game
# @extends Base
# @require Scene
#
class Game extends Base
    constructor: (options)->
        super()

        @_deps = options
        @_paused = false
        @_scene = null

        @set 'scene', @_deps.scene
        @_start()

    ##
    #
    #
    _start: ->
        @_update = @_update.bind this
        @_update()

    ##
    #
    #
    _update: ->
        if @_paused then return

        config = @_deps.config
        entities = @_deps.scene.getEntities()
        ctx = @_deps.viewport.get 'context'

        ctx.clearRect 0, 0, config.get('width'), config.get('height')
        @_scene.update()
        
        for entity in entities
            entity.render()

        requestAnimationFrame @_update

    ##
    #
    #
    pause: (scene)->
        @_paused = true

    ##
    #
    #
    resume: (scene)->
        @_paused = false


module.exports = Game
