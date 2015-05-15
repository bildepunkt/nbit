(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
    width: 832,
    height: 640,
    pxSize: 16,
    gap: 4,
    gapColor: '#FFF'
};
},{}],2:[function(require,module,exports){
var Draw, config;

config = require('../config');

Draw = (function() {
  function Draw(el) {
    this.el = el;
  }

  Draw.prototype.render = function(entity) {
    return this.el;
  };

  return Draw;

})();

module.exports = Draw;


},{"../config":1}],3:[function(require,module,exports){
var Draw, draw;

Draw = require('./src/draw');

draw = new Draw('das el');

console.log(draw.render());


},{"./src/draw":2}]},{},[3]);
