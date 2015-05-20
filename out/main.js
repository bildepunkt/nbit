(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
    width: 832,
    height: 640,
    pxSize: 8,
    barsColor: '#444',
    listen: {
        mouse: true,
        touch: false,
        keyboard: false
    }
};
},{}],2:[function(require,module,exports){
module.exports = (function() {
    'use strict';

    /**
     * provides management of, and an interface for, a list of items
     *
     * @class SW.Collection
     * @extends SW.Unique
     * @belongsto SW
     */
    var Collection = function() {
        /**
         * @member {Array} SW.Collection.prototype._items - the sorted list
         * @private
         */
        this._items = [];
    };

    /**
     * adds an object to the collection's items
     *
     * @method SW.Collection.prototype.addItem
     * @param {String} name
     * @param {Object} value
     * @chainable
     */
    Collection.prototype.addItem = function(name, value) {
        this._items.push({
            name: name,
            value: value
        });

        return this;
    };

    /**
     * adds an object to the collection's items at a specific index
     *
     * @method SW.Collection.prototype.addItemAt
     * @param {String} name
     * @param {any} value
     * @param {Integer} index
     * @chainable
     */
    Collection.prototype.addItemAt = function(name, value, index) {
        this._items.splice(index, 0, {
            name: name,
            value: value
        });

        return this;
    };

    /**
     * removes -by name- an object from the collection's items
     *
     * @method SW.Collection.prototype.removeItem
     * @param {String} name
     */
    Collection.prototype.removeItem = function(name) {
        this._rawEach(function(iterItem, i, iterName, items) {
            if (name === iterName) {
                iterItem = null;
                items.splice(i, 1);

                // break out of loop
                return false;
            }
        });
    };

    /**
     * removes all items from collection
     *
     * @method SW.Collection.prototype.removeAllItems
     * @return {SW.Collection}
     * @chainable
     */
    Collection.prototype.removeAllItems = function() {
        this._items = [];

        return this;
    };

    /**
     * iterates the collection's sortedItems. The item, index, and name are supplied to the provided function
     *
     * @method SW.Collection.prototype.each
     * @param {Function} fn
     * @param {Object} scope
     */
    Collection.prototype.each = function(fn, scope) {
        var item;

        fn = scope ? fn.bind(scope) : fn;

        for(var i = 0, len = this._items.length; i < len; i += 1) {
            item = this._items[i];
            if (fn(item.value, i, item.name) === false) {
                break;
            }
        }
    };

    /**
     * iterates the collection's sortedItems. The raw item, index, name, and the list being iterated are supplied to the provided function
     *
     * @method SW.Collection.prototype._rawEach
     * @param {function} fn
     * @private
     */
    Collection.prototype._rawEach = function(fn) {
        for(var i = 0, len = this._items.length; i < len; i += 1) {
            if (fn(this._items[i], i, this._items[i].name, this._items) === false) {
                break;
            }
        }
    };

    /**
     * iterates items and return the ones that meet criteria
     *
     * @method SW.Collection.prototype.filter
     * @param {function} fn
     * @return {Array} filteredItems
     */
    Collection.prototype.filter = function(fn, scope) {
        var filteredItems = [];
        var filteredItem;

        this.each(function(item, i, name) {
            filteredItem = fn(item, i, name);
            if (filteredItem) {
                filteredItems.push(filteredItem);
            }
        }, scope);

        return filteredItems;
    };

    /**
     * gets the count of items in collection
     *
     * @method SW.Collection.prototype.getItemCount
     * @return {Integer}
     */
    Collection.prototype.getItemCount = function() {
        return this._items.length;
    };

    /**
     * alters an existing item
     *
     * @method SW.Collection.prototype.setItem
     * @param {String} name
     * @param {any} value
     * @chainable
     */
    Collection.prototype.setItem = function(name, value) {
        this._rawEach(function(iterItem, i, iterName) {
            if (name === iterName) {
                iterItem.value = value;

                return false;
            }
        });

        return this;
    };

    /**
     * gets an existing item by name
     *
     * @method SW.Collection.prototype.getItem
     * @return {any}
     */
    Collection.prototype.getItem = function(name) {
        var item;

        this.each(function(iterItem, i, iterName) {
            if (name === iterName) {
                item = iterItem;

                return false;
            }
        });

        return item;
    };

    /**
     * gets an existing item by name index
     *
     * @method SW.Collection.prototype.getItem
     * @return {any}
     */
    Collection.prototype.getItemAt = function(index) {
        return this._items[index].value;
    };

    /**
     * gets a raw item by name
     *
     * @method SW.Collection.prototype._getRawItem
     * @return {any}
     * @private
     */
    Collection.prototype._getRawItem = function(name) {
        var item;

        this._rawEach(function(iterItem, i, iterName) {
            if (name === iterName) {
                item = iterItem;

                return false;
            }
        });

        return item;
    };

    /**
     * moves item to new index
     * 
     * @method SW.Collection.prototype.setItemIndex
     * @param {String} name
     * @param {Integer} index
     */
    Collection.prototype.setItemIndex = function(name, index) {
        var item;
        var currentIndex = this.getItemIndex(name);

        if (index === currentIndex) {
            return;
        }

        item = this._getRawItem(name);
        this.removeItem(name);
        this._items.splice(index, 0, item);
    };

    /**
     * gets an item's current index
     *
     * @method SW.Collection.prototype.getItemIndex
     * @param {String} name
     * @return {Integer}
     */
    Collection.prototype.getItemIndex = function(name) {
        var index;

        this.each(function(iterItem, i, iterName) {
            if (name === iterName) {
                index = i;

                return false;
            }
        });

        return index;
    };

    return Collection;
}());
},{}],3:[function(require,module,exports){
module.exports = {
    hitPoint: function(x, y, entity) {
        var entityX = entity.getX();
        var entityY = entity.getY();
        var width = entity.getWidth();
        var height = entity.getHeight();

        if (x >= entityX &&
            x <= entityX + width &&
            y >= entityY &&
            y <= entityY + height) {
            return true;
        }
        return false;
    }
};
},{}],4:[function(require,module,exports){
module.exports = (function() {
    'use strict';

    /**
     * event handler
     *
     * @class SW.Signal
     * @belongsto SW
     * @singleton
     */
    var Signal = function() {
        this._handlerManager = {};

        this._mediator = document;
    };

    /**
     * tune in to events from a dom element or built-in mediator
     *
     * @method SW.Signal.prototype.addListener
     * @param {HTMLElement} [el] - the element to listen to (if not present, will listen to built-in mediator)
     * @param {String} type - event type; can be custom or DOM
     * @param {function} handler - the event handler
     * @param {Object} [context] - if present will call handler with this scope
     */
    Signal.prototype.addListener = function(el, type, handler, context) {
        var handlers;

        // no element, shift args over
        if (typeof el === 'string' && typeof type === 'function') {
            context = handler ? handler : null;
            handler = type;
            type = el;
            el = this._mediator;
        }

        if (context) {
            if (!this._handlerManager[type]) {
                this._handlerManager[type] = [];
            }

            handlers = {
                handler: handler,
                boundHandler: handler.bind(context)
            };

            this._handlerManager[type].push(handlers);
        }

        el.addEventListener(type, handlers ? handlers.boundHandler : handler, false);
    };

    /**
     * tune out events from a dom element or built-in mediator
     *
     * @method SW.Signal.prototype.removeListener
     * @param {HTMLElement} [el] - the element to stop listening to (if not present, will tune out the built-in mediator)
     * @param {String} type - event type; can be custom or DOM
     * @param {function} handler - the event handler
     */
    Signal.prototype.removeListener = function(el, type, handler) {
        // no element, shift args over
        if (typeof el === 'string' && typeof type === 'function') {
            handler = type;
            type = el;
            el = this._mediator;
        }

        // if handler matches object of handler & boundHandler - assign boundHandler to handler; else leave as is
        if (this._handlerManager[type]) {
            for (var i = 0; i < this._handlerManager[type].length; i += 1) {
                if (handler === this._handlerManager[type][i].handler) {
                    handler = this._handlerManager[type][i].boundHandler;
                    this._handlerManager[type].splice(i, 1);
                    break;
                }
            }
        }

        el.removeEventListener(type, handler, false);
    };

    /**
     * dispatches events from a dom element or built-in mediator
     *
     * @method SW.Signal.prototype.dispatch
     * @param {HTMLElement} [el] - the element to broadcast from (if not present, will broadcast from built-in mediator)
     * @param {String} type - event type
     * @param {Object} data - the data to pass to the handler
     */
    Signal.prototype.dispatch = function(el, type, data) {
        var customEvent;

        // no element, shift args over
        if (typeof el === 'string' && typeof type !== 'string') {
            data = type;
            type = el;
            el = this._mediator;
        }
        
        customEvent = new CustomEvent(type, {
            detail : data
        });

        el.dispatchEvent(customEvent);
    };

    return new Signal();
}());
},{}],5:[function(require,module,exports){
var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

(function() {
  var Base, count;
  count = 1;
  Base = (function() {
    function Base(options) {
      var key;
      this.uid = "_" + (count++) + "_";
      for (key in options) {
        if (indexOf.call(this, key) >= 0) {
          this[key] = options[key];
        }
      }
    }

    return Base;

  })();
  return module.exports = Base;
})();


},{}],6:[function(require,module,exports){
var Dom, config, signal;

signal = require('../lib/signal');

config = require('../config');

Dom = (function() {
  function Dom(canvas) {
    var ref;
    this.body = document.getElementsByTagName('body')[0];
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.context = this.canvas.getContext('2d');
    document.title = (ref = config.title) != null ? ref : 'nBit';
    this.body.style.margin = 0;
    this.body.style.backgroundColor = config.barsColor;
    this.canvas.style.position = 'absolute';
    this.canvas.width = config.width;
    this.canvas.height = config.height;
    this.listenForInput();
    signal.addListener(window, 'resize', this.resizeHandler, this);
    this.stretchAndCenter(this.canvas);
  }

  Dom.prototype.listenForInput = function() {
    var i, j, k, len, len1, len2, ref, ref1, ref2, type;
    if (config.listen.mouse) {
      ref = ['click', 'dblclick', 'mousedown', 'mouseup', 'mousemove'];
      for (i = 0, len = ref.length; i < len; i++) {
        type = ref[i];
        signal.addListener(this.canvas, type, this.inputHandler, this);
      }
    }
    if (config.listen.touch) {
      ref1 = ['tap', 'dbltap', 'touchstart', 'touchend', 'touchmove'];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        type = ref1[j];
        signal.addListener(this.canvas, type, this.inputHandler, this);
      }
    }
    if (config.listen.keyboard) {
      ref2 = ['keyup', 'keydown'];
      for (k = 0, len2 = ref2.length; k < len2; k++) {
        type = ref2[k];
        signal.addListener(this.canvas, type, this.inputHandler, this);
      }
    }
    return void 0;
  };

  Dom.prototype.inputHandler = function(e) {
    return signal.dispatch('input', e);
  };

  Dom.prototype.resizeHandler = function() {
    return this.stretchAndCenter(this.canvas);
  };

  Dom.prototype.stretchAndCenter = function(el) {
    var IS_LANDSCAPE, LANDSCAPE_RATIO, PORTRAIT_RATIO, elHeight, elWidth, left, ref, top, winHeight, winLandscapeRatio, winPortraitRatio, winWidth;
    if (!el.height && !el.height) {
      false;
    }
    LANDSCAPE_RATIO = el.height / el.width;
    PORTRAIT_RATIO = el.width / el.height;
    IS_LANDSCAPE = (ref = LANDSCAPE_RATIO < PORTRAIT_RATIO) != null ? ref : {
      "true": false
    };
    winWidth = window.innerWidth;
    winHeight = window.innerHeight;
    winLandscapeRatio = winHeight / winWidth;
    winPortraitRatio = winWidth / winHeight;
    left = 0;
    top = 0;
    if (IS_LANDSCAPE) {
      if (LANDSCAPE_RATIO < winLandscapeRatio) {
        elWidth = winWidth;
        elHeight = elWidth * LANDSCAPE_RATIO;
        top = (winHeight - elHeight) / 2;
      } else {
        elHeight = winHeight;
        elWidth = winHeight * PORTRAIT_RATIO;
        left = (winWidth - elWidth) / 2;
      }
    } else {
      if (PORTRAIT_RATIO < winPortraitRatio) {
        elHeight = winHeight;
        elWidth = winHeight * PORTRAIT_RATIO;
        left = (winWidth - elWidth) / 2;
      } else {
        elWidth = winWidth;
        elHeight = elWidth * LANDSCAPE_RATIO;
        top = (winHeight - elHeight) / 2;
      }
    }
    el.style.width = (Math.round(elWidth)) + "px";
    el.style.height = (Math.round(elHeight)) + "px";
    el.style.left = (Math.round(left)) + "px";
    el.style.top = (Math.round(top)) + "px";
    return void 0;
  };

  Dom.prototype.getCanvas = function() {
    return this.canvas;
  };

  Dom.prototype.getContext = function() {
    return this.context;
  };

  return Dom;

})();

module.exports = Dom;


},{"../config":1,"../lib/signal":4}],7:[function(require,module,exports){
var Draw, config;

config = require('../config');

Draw = (function() {
  function Draw(context) {
    this.context = context;
  }

  Draw.prototype.clear = function() {
    return this.context.clearRect(0, 0, config.width, config.height);
  };

  Draw.prototype.fill = function(color) {
    this.context.save();
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, config.width, config.height);
    return this.context.restore();
  };

  Draw.prototype.render = function(entity) {
    var i, j, legend, len, len1, map, mapx, mapy, size, x, y;
    size = config.pxSize;
    map = entity.getBitmap();
    legend = entity.legend;
    this.context.save();
    this.context.translate(entity.x, entity.y);
    for (y = i = 0, len = map.length; i < len; y = ++i) {
      mapy = map[y];
      for (x = j = 0, len1 = mapy.length; j < len1; x = ++j) {
        mapx = mapy[x];
        if (legend[mapx] != null) {
          this.context.fillStyle = legend[mapx];
          this.context.fillRect(size * x, size * y, size, size);
        }
      }
    }
    return this.context.restore();
  };

  return Draw;

})();

module.exports = Draw;


},{"../config":1}],8:[function(require,module,exports){
var Input, Sprite, collision, config, signal;

collision = require('../lib/collision');

signal = require('../lib/signal');

Sprite = require('./sprite');

config = require('../config');

Input = (function() {
  function Input() {
    this.bg = new Sprite;
    this.dragCandidate = null;
    this.pressCandidate = null;
    this.mouseCanDrag = null;
    this.isDragging = null;
    this.dragCandidateOffsetX = null;
    this.dragCandidateOffsetY = null;
    this.entityPool = null;
    this.bg.setWidth(config.width);
    this.bg.setHeight(config.height);
    signal.addListener('input', this.inputHandler, this);
  }

  Input.prototype.setEntityPool = function(pool) {
    return this.entityPool = pool;
  };

  Input.prototype.inputHandler = function(e) {
    var eventData, eventTypes, evtEl, evtTarget, factor, i, inputEvent, len, offsetX, offsetY, type;
    inputEvent = e.detail;
    evtEl = inputEvent.currentTarget;
    factor = 100 / (this.getScaleFactor(evtEl)) / 100;
    offsetX = evtEl.offsetLeft;
    offsetY = evtEl.offsetTop;
    eventTypes = [];
    eventData = {
      domEvent: inputEvent
    };
    if (inputEvent.hasOwnProperty('touches')) {
      eventData.absX = inputEvent.touches[0].pageX - offsetX;
      eventData.absY = inputEvent.touches[0].pageY - offsetY;
    } else {
      eventData.absX = inputEvent.offsetX || inputEvent.clientX - offsetX;
      eventData.absY = inputEvent.offsetY || inputEvent.clientY - offsetY;
    }
    eventData.x = eventData.absX * factor;
    eventData.y = eventData.absY * factor;
    eventData.target = this.getTarget(eventData);
    switch (inputEvent.type) {
      case 'click':
      case 'tap':
        if (!this.pressCandidate || !eventData.target || this.pressCandidate.uid !== eventData.target.uid) {
          eventData.target = void 0;
        }
        this.pressCandidate = null;
        eventTypes.push('press');
        break;
      case 'dblclick':
      case 'dbltap':
        eventTypes.push('dblpress');
        break;
      case 'mousedown':
      case 'touchstart':
        this.pressCandidate = eventData.target;
        this.dragCandidate = eventData.target && eventData.target.getDraggable() ? eventData.target : void 0;
        if (this.dragCandidate != null) {
          this.dragCandidateOffsetX = eventData.x - this.dragCandidate.getX();
          this.dragCandidateOffsetY = eventData.y - this.dragCandidate.getY();
        }
        this.mouseCanDrag = true;
        eventTypes.push('pressdown');
        break;
      case 'mouseup':
      case 'touchend':
        this.mouseCanDrag = false;
        if (this.isDragging) {
          this.isDragging = false;
          this.dragCandidate = null;
          eventTypes.push('dragend');
        }
        eventTypes.push('pressup');
        break;
      case 'mousemove':
      case 'touchmove':
        if (this.mouseCanDrag && (this.dragCandidate != null) && this.dragCandidate.getDraggable()) {
          this.dragCandidate.setX(eventData.x - this.dragCandidateOffsetX);
          this.dragCandidate.setY(eventData.y - this.dragCandidateOffsetY);
          if (!this.isDragging) {
            this.isDragging = true;
            eventTypes.push('dragstart');
          }
          eventTypes.push('drag');
        }
    }
    if (typeof evtTarget === "undefined" || evtTarget === null) {
      evtTarget = this.bg;
      for (i = 0, len = eventTypes.length; i < len; i++) {
        type = eventTypes[i];
        evtTarget[type](eventData);
      }
    }
    return void 0;
  };

  Input.prototype.getScaleFactor = function(evtEl) {
    var canvasCssWidth, factor;
    factor = 1;
    if (evtEl.style.width != null) {
      canvasCssWidth = parseInt(evtEl.style.width, 10);
      factor = canvasCssWidth / evtEl.width;
    }
    return factor;
  };

  Input.prototype.getTarget = function(e) {
    var topmostEntity;
    topmostEntity = null;
    this.entityPool.each(function(layer) {
      layer.each(function(entity) {
        if (collision.hitPoint(e.x, e.y, entity)) {
          return topmostEntity = entity;
        }
      });
      return void 0;
    });
    return topmostEntity;
  };

  return Input;

})();

module.exports = Input;


},{"../config":1,"../lib/collision":3,"../lib/signal":4,"./sprite":9}],9:[function(require,module,exports){
var Base, Sprite, config,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

config = require('../config');

Base = require('./base');

Sprite = (function(superClass) {
  extend(Sprite, superClass);

  function Sprite() {
    this.x = 0;
    this.y = 0;
    this.width = null;
    this.height = null;
    this.legend = null;
    this.hitMap = null;
    this.bitmapName = null;
    this.bitmapIndex = null;
    this.bitmaps = {};
    this.draggable = false;
    Sprite.__super__.constructor.call(this);
  }

  Sprite.prototype.setHitMap = function(hitMap) {
    return this.hitMap = hitMap;
  };

  Sprite.prototype.getBitmap = function() {
    return this.bitmaps[this.bitmapName][this.bitmapIndex];
  };

  Sprite.prototype.setBitmap = function(name, index) {
    this.bitmapName = name;
    return this.bitmapIndex = index != null ? index : 0;
  };

  Sprite.prototype.addBitmap = function() {
    var bm, data, name;
    name = arguments[0], data = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    this.bitmaps[name] = data;
    this.bitmapName = name;
    this.setBitmap(name);
    if (this.width == null) {
      bm = this.getBitmap();
      this.height = bm.length * config.pxSize;
      return this.width = bm[0].length * config.pxSize;
    }
  };

  Sprite.prototype.setLegend = function(legend) {
    return this.legend = legend;
  };

  Sprite.prototype.setDraggable = function(val) {
    return this.draggable = val;
  };

  Sprite.prototype.getDraggable = function() {
    return this.draggable;
  };

  Sprite.prototype.press = function(e) {
    return e;
  };

  Sprite.prototype.dblpress = function(e) {
    return e;
  };

  Sprite.prototype.pressup = function(e) {
    return e;
  };

  Sprite.prototype.pressdown = function(e) {
    return e;
  };

  Sprite.prototype.dragstart = function(e) {
    return e;
  };

  Sprite.prototype.drag = function(e) {
    return e;
  };

  Sprite.prototype.dragend = function(e) {
    return e;
  };

  Sprite.prototype.getX = function() {
    return this.x;
  };

  Sprite.prototype.setX = function(x) {
    return this.x = x - (x % config.pxSize);
  };

  Sprite.prototype.getY = function() {
    return this.y;
  };

  Sprite.prototype.setY = function(y) {
    return this.y = y - (y % config.pxSize);
  };

  Sprite.prototype.getWidth = function() {
    return this.width;
  };

  Sprite.prototype.setWidth = function(width) {
    return this.width = width;
  };

  Sprite.prototype.getHeight = function() {
    return this.height;
  };

  Sprite.prototype.setHeight = function(height) {
    return this.height = height;
  };

  return Sprite;

})(Base);

module.exports = Sprite;


},{"../config":1,"./base":5}],10:[function(require,module,exports){
var Collection, Dom, Draw, Input, Sprite, bitmap, dom, draw, entities, input, pool, render, sprite1, sprite2;

Draw = require('./src/draw');

Dom = require('./src/dom');

Sprite = require('./src/sprite');

Input = require('./src/input');

Collection = require('./lib/collection');

dom = new Dom;

draw = new Draw(dom.getContext());

sprite1 = new Sprite;

sprite2 = new Sprite;

sprite2.setX(72);

bitmap = [[0, 0, 2, 2, 2, 2, 2, 0, 0], [0, 2, 1, 2, 1, 2, 1, 2, 0], [0, 2, 1, 1, 1, 1, 1, 2, 0], [0, 3, 3, 4, 4, 4, 3, 3, 0], [3, 3, 3, 3, 4, 3, 3, 3, 3], [3, 0, 3, 3, 3, 3, 3, 0, 3], [1, 0, 3, 3, 3, 3, 3, 0, 1], [0, 0, 3, 0, 0, 0, 3, 0, 0], [0, 0, 3, 0, 0, 0, 3, 0, 0], [0, 2, 2, 0, 0, 0, 2, 2, 0]];

sprite1.addBitmap('front', bitmap);

sprite2.addBitmap('front', bitmap);

sprite1.setLegend({
  '1': '#6F4F38',
  '2': '#000000',
  '3': '#70B36C',
  '4': '#AEB36C'
});

sprite2.setLegend({
  '1': '#6F4F00',
  '2': '#0000FF',
  '3': '#700000',
  '4': '#AE0000'
});

sprite1.setBitmap('front', 0);

sprite2.setBitmap('front', 0);

sprite1.setDraggable(true);

sprite2.setDraggable(true);

pool = new Collection;

entities = new Collection;

pool.addItem('entities', entities);

entities.addItem('s1', sprite1);

entities.addItem('s2', sprite2);

input = new Input;

input.setEntityPool(pool);

render = function() {
  draw.fill('#DDD');
  entities.each(function(entity) {
    return draw.render(entity);
  });
  return requestAnimationFrame(render);
};

render();


},{"./lib/collection":2,"./src/dom":6,"./src/draw":7,"./src/input":8,"./src/sprite":9}]},{},[10]);
