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