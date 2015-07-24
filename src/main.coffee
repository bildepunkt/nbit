'use strict';

##
# @class Config
#
class Config
    constructor: (options)->
        @scale = 4;
        @width = 800;
        @height = 600;
        @canvasId = 'canvas';

        for key of options
            @[key] = options[key]


##
# @class Game
#
class Game
    constructor: (options)->
        @_scene = options.scene
        @_paused = false

        this._start()

    ##
    #
    #   
    _start: ()->
        @_update = @_update.bind this
        @_update()

    ##
    #
    #
    _update: ()->
        if @_paused then return

        entities = @_scene.getEntities()

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

    ##
    #
    #
    setScene: (scene)->
        @_scene = scene


##
# @class Collection
#
class Collection
    constructor: ()->
        @_items = []

    addItem: (item)->
        @_items.push item

    getItems: ()->
        @_items

    removeItem: (target)->
        for item, i in @_items
            if target._uid == item._uid
                @_items.splice i, 1
                break


##
# @class Scene
# @require Collection
#
class Scene
    constructor: (options)->
        @_entities = new options.Collection()

    addEntity: (entity)->
        @_entities.addItem entity

    removeEntity: (entity)->
        @_entities.removeItem entity

    getEntities: ()->
        @_entities.getItems()


##
# @class Viewport
# @require Config
#
class Viewport
    constructor: (options)->
        @_config = options.config

        @_canvas = document.getElementById @_config.canvasId
        @_context = @_canvas.getContext '2d'

        @_canvas.width = @_config.width
        @_canvas.height = @_config.height


##
# @class Sprite
# @require Viewport
# @require Config
#
class Sprite
    constructor: (options)->
        @_config = options.config
        @_viewport = options.viewport

        @_x = 0
        @_y = 0
        @_dirty = false

    set: (key, val)->
        @_dirty = true
        @['_' + key] = val
        @

    get: (key)->
        @['_' + key]


##
# @class Bitmap
# @require Viewport
# @require Config
# @extend Sprite
#
class Bitmap extends Sprite
    constructor: (options)->
        super options

        @_bitmap = null
        @_legend = null

    render: ()->
        undefined


##
# @class Point
# @require Viewport
# @require Config
# @extend Sprite
#
class Point extends Sprite
    constructor: (options)->
        super options

    render: ()->
        @_viewport._context.fillRect @_x, @_y, @_config.scale, @_config.scale

###
##
# @class Line
# @require Viewport
# @require Config
# @extend Sprite
#
class Line extends Sprite
    'use strict';

    var Line = function(options) {
        this._points = [];
    };

    Line.prototype = new Sprite(options);

    Line.prototype._bresenhamise = function(x0, y0, x1, y1) {
        var dx = Math.abs(x1 - x0);
        var sx = x0 < x1 ? 1 : -1;
        var dy = Math.abs(y1 - y0);
        var sy = y0 < y1 ? 1 : -1;
        var err = dx > dy ? dx : -dy / 2;

        var xTotal = Math.abs(x1 - x0);
        var yTotal = Math.abs(y1 - y0);

        while (xTotal >= 0 || yTotal >= 0) {
            this._drawPixel(x0, y0).bind(this);

            var e2 = err;

            if (e2 > -dx) {
                err -= dy
                x0 += sx
            }

            if (e2 < dy) {
                err += dx
                y0 += sy
            }

            xTotal--;
            yTotal--;
        }
    };

    Line.prototype._drawPixel = function(x, y) {
        this._viewport.context.drawRect(x, y, this._config.scale, this._config.scale);
    };

    Line.prototype.render = function() {
        var nextPt;

        for(var i = 0, len = this._points.length; i < len; i += 1) {
            nextPt = this._points[i + 1];

            if (typeof nextPt === 'object' && nextPt != null) {
                this._bresenhamise(this._points[i], nextPt);
            }
        }
    };

    return Line;
}());


##
# @class Polygon
# @require Viewport
# @require Config
# @extend Line
#
var Polygon = (function() {
    'use strict';

    var Polygon = function(options) {
        this._config = options.config
    };

    Polygon.prototype = new Line(options);

    Polygon.prototype.render = function() {
        var ctx = this._viewport.context;
        var nextPt;
        var i, len;
        
        ctx.beginPath();
        ctx.moveTo(this._points[0].x, this._points[0].y);

        for(i = 1, len = this._points.length; i < len; i += 1) {
            ctx.lineTo(this._points[0].x, this._points[0].y);
        }

        ctx.closePath();
        ctx.fill();

        for(i = 0, len = this._points.length; i < len; i += 1) {
            nextPt = this._points[i + 1];

            if (typeof nextPt === 'object' && nextPt != null) {
                this._bresenhamise(this._points[i], nextPt);
            } else {
                this._bresenhamise(this._points[i], this.points[0]);
            }
        }
    };

    return Polygon;
}());
###

myConfig = new Config()
myViewport = new Viewport({
    config: myConfig
})

myPoint = new Point({
    config: myConfig,
    viewport: myViewport
})

myScene = new Scene({
    Collection: Collection
})
myScene.addEntity myPoint

game = new Game({
    scene: myScene
})