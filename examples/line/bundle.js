(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Generated by CoffeeScript 1.9.3
(function() {
  var Base;

  Base = (function() {
    Base.counter = 0;

    Base.getUid = function() {
      return this.counter++;
    };

    function Base() {
      this._uid = Base.getUid();
    }

    Base.prototype._checkProp = function(key) {
      if (!this.hasOwnProperty('_' + key)) {
        throw new Error("property '" + key + "' does not exist");
      }
    };

    Base.prototype.set = function(key, val) {
      this._checkProp(key);
      this['_' + key] = val;
      return this;
    };

    Base.prototype.get = function(key) {
      this._checkProp(key);
      return this['_' + key];
    };

    Base.prototype.add = function(key, val) {
      var keys, results;
      if (typeof key === 'string' && val !== void 0) {
        return this['_' + key] = val;
      } else if (typeof key === 'object' && (key != null) && val === void 0) {
        keys = key;
        results = [];
        for (key in keys) {
          results.push(this['_' + key] = keys[key]);
        }
        return results;
      }
    };

    return Base;

  })();

  module.exports = Base;

}).call(this);

},{}],2:[function(require,module,exports){
// Generated by CoffeeScript 1.9.3
(function() {
  var Bresenham;

  Bresenham = (function() {
    function Bresenham() {}

    Bresenham.calculate = function(ptA, ptB, callback) {
      var dx, dy, e2, err, sx, sy, xTotal, yTotal;
      dx = Math.abs(ptB.x - ptA.x);
      sx = ptA.x < ptB.x ? 1 : -1;
      dy = Math.abs(ptB.y - ptA.y);
      sy = ptA.y < ptB.y ? 1 : -1;
      err = (dx > dy ? dx : -dy) / 2;
      xTotal = Math.abs(ptB.x - ptA.x);
      yTotal = Math.abs(ptB.y - ptA.y);
      while (xTotal >= 0 || yTotal >= 0) {
        callback(ptA.x, ptA.y);
        e2 = err;
        if (e2 > -dx) {
          err -= dy;
          ptA.x += sx;
        }
        if (e2 < dy) {
          err += dx;
          ptA.y += sy;
        }
        xTotal--;
        yTotal--;
      }
      return void 0;
    };

    return Bresenham;

  })();

  module.exports = Bresenham;

}).call(this);

},{}],3:[function(require,module,exports){
// Generated by CoffeeScript 1.9.3
(function() {
  var Base, Collection,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Base = require('./base');

  Collection = (function(superClass) {
    extend(Collection, superClass);

    function Collection() {
      Collection.__super__.constructor.call(this);
      this._items = [];
    }

    Collection.prototype.addItem = function(item) {
      return this._items.push(item);
    };

    Collection.prototype.removeItem = function(target) {
      var i, item, j, len, ref, results;
      ref = this._items;
      results = [];
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        item = ref[i];
        if (target.get('uid' === item.get('uid'))) {
          this._items.splice(i, 1);
          break;
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    return Collection;

  })(Base);

  module.exports = Collection;

}).call(this);

},{"./base":1}],4:[function(require,module,exports){
// Generated by CoffeeScript 1.9.3
(function() {
  var Base, Config,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Base = require('./base');

  Config = (function(superClass) {
    extend(Config, superClass);

    function Config(options) {
      var key;
      Config.__super__.constructor.call(this);
      this._scale = 8;
      this._width = 100;
      this._height = 75;
      this._canvasId = 'canvas';
      for (key in options) {
        this['_' + key] = options[key];
      }
    }

    return Config;

  })(Base);

  module.exports = Config;

}).call(this);

},{"./base":1}],5:[function(require,module,exports){
// Generated by CoffeeScript 1.9.3
(function() {
  var Base, Game,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Base = require('./base');

  Game = (function(superClass) {
    extend(Game, superClass);

    function Game(options) {
      Game.__super__.constructor.call(this);
      this._deps = options;
      this._paused = false;
      this._scene = null;
      this.set('scene', this._deps.scene);
      this._start();
    }

    Game.prototype._start = function() {
      this._update = this._update.bind(this);
      return this._update();
    };

    Game.prototype._update = function() {
      var config, entities, entity, i, len;
      if (this._paused) {
        return;
      }
      config = this._deps.config;
      entities = this._deps.scene.getEntities();
      this._deps.viewport.clear();
      this._scene.update();
      for (i = 0, len = entities.length; i < len; i++) {
        entity = entities[i];
        entity.render();
      }
      return requestAnimationFrame(this._update);
    };

    Game.prototype.pause = function(scene) {
      return this._paused = true;
    };

    Game.prototype.resume = function(scene) {
      return this._paused = false;
    };

    return Game;

  })(Base);

  module.exports = Game;

}).call(this);

},{"./base":1}],6:[function(require,module,exports){
'use strict';

/**
 *
 */
module.exports = {
    clone: function (src) {
        // check for arrays too!
        var obj = (typeof src === 'object' && src.hasOwnProperty('length')) ? [] : {},
            prop;

        for (prop in src) {
            if (typeof src[prop] === 'object' && src[prop] !== null) {
                obj[prop] = this.clone(src[prop]);
            } else {
                obj[prop] = src[prop];
            }
        }
        return obj;
    },

    rotatePoint: function (px, py, cx, cy, angle) {
        angle *= (Math.PI/180);
        
        return {
            x: Math.cos(angle) * (px - cx) + cx,
            y: Math.sin(angle) * (px - cx) + cy
        };
    }
};

},{}],7:[function(require,module,exports){
// Generated by CoffeeScript 1.9.3
(function() {
  var Bresenham, Line, Sprite, utils,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Sprite = require('./sprite');

  Bresenham = require('./bresenham');

  utils = require('./lib/utils');

  Line = (function(superClass) {
    extend(Line, superClass);

    function Line(options) {
      Line.__super__.constructor.call(this, options);
      this._deps = options;
      this._points = [];
    }

    Line.prototype._drawPt = function(x, y) {
      var dimensions;
      dimensions = this._deps.config.get('scale');
      this._deps.viewport.get('context').fillRect(x * dimensions - dimensions / 2, y * dimensions - dimensions / 2, dimensions, dimensions);
      return void 0;
    };

    Line.prototype.setPoints = function(a, b) {
      return this._points = [a, b];
    };

    Line.prototype.render = function() {
      var ctx, dimensions, i, j, len, nextPt, point, ref;
      Line.__super__.render.call(this);
      dimensions = this._deps.config.get('scale');
      ctx = this._deps.viewport.get('context');
      ref = this._points;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        point = ref[i];
        nextPt = this._points[i + 1];
        if (nextPt != null) {
          ctx.save();
          ctx.translate(this._x * dimensions, this._y * dimensions);
          point = utils.clone(point);
          nextPt = utils.clone(nextPt);
          if (this._rotation !== 0) {
            point = utils.rotatePoint(point.x, point.y, this._offsetX, this._offsetY, this._rotation);
            nextPt = utils.rotatePoint(nextPt.x, nextPt.y, this._offsetX, this._offsetY, this._rotation);
          }
          Bresenham.calculate(point, nextPt, this._drawPt.bind(this));
          ctx.restore();
        }
      }
      return void 0;
    };

    return Line;

  })(Sprite);

  module.exports = Line;

}).call(this);

},{"./bresenham":2,"./lib/utils":6,"./sprite":9}],8:[function(require,module,exports){
// Generated by CoffeeScript 1.9.3
(function() {
  var Base, Scene,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Base = require('./base');

  Scene = (function(superClass) {
    extend(Scene, superClass);

    function Scene(options) {
      Scene.__super__.constructor.call(this);
      this._deps = options;
      this._entities = new this._deps.Collection();
    }

    Scene.prototype.addEntity = function(entity) {
      return this._entities.addItem(entity);
    };

    Scene.prototype.removeEntity = function(entity) {
      return this._entities.removeItem(entity);
    };

    Scene.prototype.getEntities = function() {
      return this._entities.get('items');
    };

    Scene.prototype.update = function() {
      return void 0;
    };

    return Scene;

  })(Base);

  module.exports = Scene;

}).call(this);

},{"./base":1}],9:[function(require,module,exports){
// Generated by CoffeeScript 1.9.3
(function() {
  var Base, Sprite,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Base = require('./base');

  Sprite = (function(superClass) {
    extend(Sprite, superClass);

    function Sprite(options) {
      Sprite.__super__.constructor.call(this);
      this._deps = options;
      this._x = 0;
      this._y = 0;
      this._rotation = 0;
      this._color = '#000';
      this._offsetX = 0;
      this._offsetY = 0;
      this._dirty = true;
    }

    Sprite.prototype.set = function(key, val) {
      this._dirty = true;
      return Sprite.__super__.set.call(this, key, val);
    };

    Sprite.prototype.render = function() {
      if (!this._dirty) {
        return;
      }
      return this._dirty = false;
    };

    return Sprite;

  })(Base);

  module.exports = Sprite;

}).call(this);

},{"./base":1}],10:[function(require,module,exports){
// Generated by CoffeeScript 1.9.3
(function() {
  var Base, Viewport,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Base = require('./base');

  Viewport = (function(superClass) {
    extend(Viewport, superClass);

    function Viewport(options) {
      var dimensions;
      Viewport.__super__.constructor.call(this);
      this._deps = options;
      dimensions = this._deps.config.get('scale');
      this._canvas = document.getElementById(this._deps.config.get('canvasId'));
      this._context = this._canvas.getContext('2d');
      this._canvas.width = this._deps.config.get('width') * dimensions;
      this._canvas.height = this._deps.config.get('height') * dimensions;
    }

    Viewport.prototype.clear = function() {
      return this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    };

    return Viewport;

  })(Base);

  module.exports = Viewport;

}).call(this);

},{"./base":1}],11:[function(require,module,exports){
'use strict';

var Config = require('../../dist/config');
var Collection = require('../../dist/collection');
var Viewport = require('../../dist/viewport');
var Line = require('../../dist/line');
var Scene = require('../../dist/scene');
var Game = require('../../dist/game');

// config
var myConfig = new Config({
    width: 80,
    height: 60
});

// viewport
var myViewport = new Viewport({
    config: myConfig
});

// point
var rotation = 0;
var myLine = new Line({
    config: myConfig,
    viewport: myViewport
});
myLine.set('x', 40).set('y', 30);
myLine.setPoints({x: 0, y: 0}, {x: 16, y: 0});


// scene
var myScene = new Scene({
    Collection: Collection
});
myScene.addEntity(myLine);
myScene.update = function() {
    myLine.set('rotation', rotation += 4);
};

// game
var game = new Game({
    config: myConfig,
    scene: myScene,
    viewport: myViewport,
});

},{"../../dist/collection":3,"../../dist/config":4,"../../dist/game":5,"../../dist/line":7,"../../dist/scene":8,"../../dist/viewport":10}]},{},[11]);