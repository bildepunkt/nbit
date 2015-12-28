(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Config = require('../../src/Config');

var _Config2 = _interopRequireDefault(_Config);

var _Viewport = require('../../src/Viewport');

var _Viewport2 = _interopRequireDefault(_Viewport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = new _Config2.default();
var viewport = new _Viewport2.default({ config: config });

console.log(viewport);

},{"../../src/Config":2,"../../src/Viewport":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       Config
 * @description The configuration object for nBit. This object does not conform to
 *              the underscore prefixed private property paradigm.
 * @author      Chris Peters
 */

var Config =
/**
 * [constructor description]
 * @return {[type]} [description]
 */
function Config(options) {
    _classCallCheck(this, Config);

    this.blockSize = 8;
    this.viewportWidth = 100;
    this.viewportHeight = 75;
    this.parentEl = document.body;
    this.parentElBgColor = '#000';
    this.canvasBgColor = '#FFF';

    for (var key in options) {
        this[key] = options[key];
    }
};

exports.default = Config;

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _MaintainMax = require('./lib/MaintainMax');

var _MaintainMax2 = _interopRequireDefault(_MaintainMax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       Viewport
 * @description Creates and handles the canvas DOM element
 * @extends     GetSet
 * @required    MaintainMax
 * @author      Chris Peters
 */

var Viewport = (function () {
    /**
     * @param {object} deps
     * @param {object} deps.config
     * @param {object} [deps.document]
     * @param {object} [deps.window]
     */

    function Viewport(deps) {
        _classCallCheck(this, Viewport);

        this._config = deps.config;
        this._document = deps.document || document;
        this._window = deps.window || window;

        this._canvas = this._document.createElement('canvas');
        this._context = this._canvas.getContext('2d');

        this._canvas.width = this._config.viewportWidth * this._config.blockSize;
        this._canvas.height = this._config.viewportHeight * this._config.blockSize;
        this._canvas.style.position = 'absolute';
        this._canvas.style.backgroundColor = this._config.canvasBgColor;

        this._config.parentEl.style.backgroundColor = this._config.parentElBgColor;
        this._config.parentEl.appendChild(this._canvas);

        this._window.addEventListener('resize', this._handleResize.bind(this));

        this._handleResize();
    }

    /**
     * [_handleResize description]
     */

    _createClass(Viewport, [{
        key: '_handleResize',
        value: function _handleResize() {
            var config = this._config;

            var _MaintainMax$fit = _MaintainMax2.default.fit(config.viewportWidth * config.blockSize, config.viewportHeight * config.blockSize);

            var top = _MaintainMax$fit.top;
            var left = _MaintainMax$fit.left;
            var width = _MaintainMax$fit.width;
            var height = _MaintainMax$fit.height;

            this._canvas.style.top = Math.round(top) + 'px';
            this._canvas.style.left = Math.round(left) + 'px';
            this._canvas.style.width = Math.round(width) + 'px';
            this._canvas.style.height = Math.round(height) + 'px';
        }

        /**
         * @return {Object} The canvas' 2d context object
         */

    }, {
        key: 'getContext',
        value: function getContext() {
            return this._context;
        }
    }]);

    return Viewport;
})();

exports.default = Viewport;

},{"./lib/MaintainMax":4}],4:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       MaintainMax
 * @description Keeps canvas element centered and (with aspect ratio intact) in the viewport
 */

var MaintainMax = (function () {
    function MaintainMax() {
        _classCallCheck(this, MaintainMax);
    }

    _createClass(MaintainMax, null, [{
        key: "fit",

        /**
         * @param  {number} width - the element's width
         * @param  {number} height - the element's height
         * @return {object} the new top, left, width, & height
         */
        value: function fit(width, height) {
            var LANDSCAPE_RATIO = height / width;
            var PORTRAIT_RATIO = width / height;
            var IS_LANDSCAPE = LANDSCAPE_RATIO < PORTRAIT_RATIO ? true : false;

            var winWidth = window.innerWidth;
            var winHeight = window.innerHeight;
            var winLandscapeRatio = winHeight / winWidth;
            var winPortraitRatio = winWidth / winHeight;
            var offsetLeft = 0;
            var offsetTop = 0;
            var offsetWidth = undefined;
            var offsetHeight = undefined;

            if (IS_LANDSCAPE) {
                if (LANDSCAPE_RATIO < winLandscapeRatio) {
                    offsetWidth = winWidth;
                    offsetHeight = offsetWidth * LANDSCAPE_RATIO;
                    offsetTop = (winHeight - offsetHeight) / 2;
                } else {
                    offsetHeight = winHeight;
                    offsetWidth = winHeight * PORTRAIT_RATIO;
                    offsetLeft = (winWidth - offsetWidth) / 2;
                }
            } else {
                if (PORTRAIT_RATIO < winPortraitRatio) {
                    offsetHeight = winHeight;
                    offsetWidth = winHeight * PORTRAIT_RATIO;
                    offsetLeft = (winWidth - offsetWidth) / 2;
                } else {
                    offsetWidth = winWidth;
                    offsetHeight = offsetWidth * LANDSCAPE_RATIO;
                    offsetTop = (winHeight - offsetHeight) / 2;
                }
            }

            return {
                width: offsetWidth,
                height: offsetHeight,
                left: offsetLeft,
                top: offsetTop
            };
        }
    }]);

    return MaintainMax;
})();

exports.default = MaintainMax;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwbGF5Z3JvdW5kL21haW4uanMiLCIuLi9zcmMvQ29uZmlnLmpzIiwiLi4vc3JjL1ZpZXdwb3J0LmpzIiwiLi4vc3JjL2xpYi9NYWludGFpbk1heC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7OztBQ0dBLElBQUksTUFBTSxHQUFHLHNCQUFZLENBQUM7QUFDMUIsSUFBSSxRQUFRLEdBQUcsdUJBQWEsRUFBQyxNQUFNLEVBQU4sTUFBTSxFQUFDLENBQUMsQ0FBQzs7QUFFdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDQUQsTUFBTTs7Ozs7QUFLdkIsU0FMaUIsTUFBTSxDQUtYLE9BQU8sRUFBRTswQkFMSixNQUFNOztBQU1uQixRQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztBQUNuQixRQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztBQUN6QixRQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztBQUN6QixRQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7QUFDOUIsUUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUM7QUFDOUIsUUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7O0FBRTVCLFNBQUssSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFO0FBQ3JCLFlBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDNUI7Q0FDSjs7a0JBaEJnQixNQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNHTixRQUFROzs7Ozs7OztBQU96QixhQVBpQixRQUFRLENBT2IsSUFBSSxFQUFFOzhCQVBELFFBQVE7O0FBUXJCLFlBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0s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WSxDQUFBLEdBQUksQ0FBQyxDQUFDO2lCQUM5QzthQUNKOztBQUVELG1CQUFPO0FBQ0gscUJBQUssRUFBRSxXQUFXO0FBQ2xCLHNCQUFNLEVBQUUsWUFBWTtBQUNwQixvQkFBSSxFQUFFLFVBQVU7QUFDaEIsbUJBQUcsRUFBRSxTQUFTO2FBQ2pCLENBQUM7U0FDTDs7O1dBaERnQixXQUFXOzs7a0JBQVgsV0FBVyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL3NyYy9Db25maWcnO1xuaW1wb3J0IFZpZXdwb3J0IGZyb20gJy4uLy4uL3NyYy9WaWV3cG9ydCc7XG5cbmxldCBjb25maWcgPSBuZXcgQ29uZmlnKCk7XG5sZXQgdmlld3BvcnQgPSBuZXcgVmlld3BvcnQoe2NvbmZpZ30pO1xuXG5jb25zb2xlLmxvZyh2aWV3cG9ydCk7XG5cbiIsIi8qKlxuICogQGNsYXNzICAgICAgIENvbmZpZ1xuICogQGRlc2NyaXB0aW9uIFRoZSBjb25maWd1cmF0aW9uIG9iamVjdCBmb3IgbkJpdC4gVGhpcyBvYmplY3QgZG9lcyBub3QgY29uZm9ybSB0b1xuICogICAgICAgICAgICAgIHRoZSB1bmRlcnNjb3JlIHByZWZpeGVkIHByaXZhdGUgcHJvcGVydHkgcGFyYWRpZ20uXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbmZpZyB7XG4gICAgLyoqXG4gICAgICogW2NvbnN0cnVjdG9yIGRlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4ge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5ibG9ja1NpemUgPSA4O1xuICAgICAgICB0aGlzLnZpZXdwb3J0V2lkdGggPSAxMDA7XG4gICAgICAgIHRoaXMudmlld3BvcnRIZWlnaHQgPSA3NTtcbiAgICAgICAgdGhpcy5wYXJlbnRFbCA9IGRvY3VtZW50LmJvZHk7XG4gICAgICAgIHRoaXMucGFyZW50RWxCZ0NvbG9yID0gJyMwMDAnO1xuICAgICAgICB0aGlzLmNhbnZhc0JnQ29sb3IgPSAnI0ZGRic7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXNba2V5XSA9IG9wdGlvbnNba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBNYWludGFpbk1heCBmcm9tICcuL2xpYi9NYWludGFpbk1heCc7XG5cbi8qKlxuICogQGNsYXNzICAgICAgIFZpZXdwb3J0XG4gKiBAZGVzY3JpcHRpb24gQ3JlYXRlcyBhbmQgaGFuZGxlcyB0aGUgY2FudmFzIERPTSBlbGVtZW50XG4gKiBAZXh0ZW5kcyAgICAgR2V0U2V0XG4gKiBAcmVxdWlyZWQgICAgTWFpbnRhaW5NYXhcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld3BvcnQge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBkZXBzXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGRlcHMuY29uZmlnXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtkZXBzLmRvY3VtZW50XVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbZGVwcy53aW5kb3ddXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZGVwcykge1xuICAgICAgICB0aGlzLl9jb25maWcgPSBkZXBzLmNvbmZpZztcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQgPSBkZXBzLmRvY3VtZW50IHx8IGRvY3VtZW50O1xuICAgICAgICB0aGlzLl93aW5kb3cgPSBkZXBzLndpbmRvdyB8fCB3aW5kb3c7XG5cbiAgICAgICAgdGhpcy5fY2FudmFzID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSB0aGlzLl9jb25maWcudmlld3BvcnRXaWR0aCAqIHRoaXMuX2NvbmZpZy5ibG9ja1NpemU7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSB0aGlzLl9jb25maWcudmlld3BvcnRIZWlnaHQgKiB0aGlzLl9jb25maWcuYmxvY2tTaXplO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5fY29uZmlnLmNhbnZhc0JnQ29sb3I7XG5cbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcmVudEVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuX2NvbmZpZy5wYXJlbnRFbEJnQ29sb3I7XG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJlbnRFbC5hcHBlbmRDaGlsZCh0aGlzLl9jYW52YXMpO1xuXG4gICAgICAgIHRoaXMuX3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9oYW5kbGVSZXNpemUuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5faGFuZGxlUmVzaXplKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogW19oYW5kbGVSZXNpemUgZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgX2hhbmRsZVJlc2l6ZSgpIHtcbiAgICAgICAgbGV0IGNvbmZpZyA9IHRoaXMuX2NvbmZpZztcbiAgICAgICAgbGV0IHsgdG9wLCBsZWZ0LCB3aWR0aCwgaGVpZ2h0IH0gPSBNYWludGFpbk1heC5maXQoXG4gICAgICAgICAgICBjb25maWcudmlld3BvcnRXaWR0aCAqIGNvbmZpZy5ibG9ja1NpemUsXG4gICAgICAgICAgICBjb25maWcudmlld3BvcnRIZWlnaHQgKiBjb25maWcuYmxvY2tTaXplXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLnRvcCA9IGAke01hdGgucm91bmQodG9wKX1weGA7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5sZWZ0ID0gYCR7TWF0aC5yb3VuZChsZWZ0KX1weGA7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS53aWR0aCA9IGAke01hdGgucm91bmQod2lkdGgpfXB4YDtcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLmhlaWdodCA9IGAke01hdGgucm91bmQoaGVpZ2h0KX1weGA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgY2FudmFzJyAyZCBjb250ZXh0IG9iamVjdFxuICAgICAqL1xuICAgIGdldENvbnRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0O1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGNsYXNzICAgICAgIE1haW50YWluTWF4XG4gKiBAZGVzY3JpcHRpb24gS2VlcHMgY2FudmFzIGVsZW1lbnQgY2VudGVyZWQgYW5kICh3aXRoIGFzcGVjdCByYXRpbyBpbnRhY3QpIGluIHRoZSB2aWV3cG9ydFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWludGFpbk1heCB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7bnVtYmVyfSB3aWR0aCAtIHRoZSBlbGVtZW50J3Mgd2lkdGhcbiAgICAgKiBAcGFyYW0gIHtudW1iZXJ9IGhlaWdodCAtIHRoZSBlbGVtZW50J3MgaGVpZ2h0XG4gICAgICogQHJldHVybiB7b2JqZWN0fSB0aGUgbmV3IHRvcCwgbGVmdCwgd2lkdGgsICYgaGVpZ2h0XG4gICAgICovXG4gICAgc3RhdGljIGZpdCh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIGNvbnN0IExBTkRTQ0FQRV9SQVRJTyA9IGhlaWdodCAvIHdpZHRoO1xuICAgICAgICBjb25zdCBQT1JUUkFJVF9SQVRJTyAgPSB3aWR0aCAvIGhlaWdodDtcbiAgICAgICAgY29uc3QgSVNfTEFORFNDQVBFICAgID0gTEFORFNDQVBFX1JBVElPIDwgUE9SVFJBSVRfUkFUSU8gPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgICAgbGV0IHdpbldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIGxldCB3aW5IZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIGxldCB3aW5MYW5kc2NhcGVSYXRpbyA9IHdpbkhlaWdodCAvIHdpbldpZHRoO1xuICAgICAgICBsZXQgd2luUG9ydHJhaXRSYXRpbyAgPSB3aW5XaWR0aCAvIHdpbkhlaWdodDtcbiAgICAgICAgbGV0IG9mZnNldExlZnQgPSAwO1xuICAgICAgICBsZXQgb2Zmc2V0VG9wICA9IDA7XG4gICAgICAgIGxldCBvZmZzZXRXaWR0aDtcbiAgICAgICAgbGV0IG9mZnNldEhlaWdodDtcblxuICAgICAgICBpZiAoSVNfTEFORFNDQVBFKSB7XG4gICAgICAgICAgICBpZiAoTEFORFNDQVBFX1JBVElPIDwgd2luTGFuZHNjYXBlUmF0aW8pIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHdpbldpZHRoO1xuICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IG9mZnNldFdpZHRoICogTEFORFNDQVBFX1JBVElPO1xuICAgICAgICAgICAgICAgIG9mZnNldFRvcCA9ICh3aW5IZWlnaHQgLSBvZmZzZXRIZWlnaHQpIC8gMjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gd2luSGVpZ2h0O1xuICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoID0gd2luSGVpZ2h0ICogUE9SVFJBSVRfUkFUSU87XG4gICAgICAgICAgICAgICAgb2Zmc2V0TGVmdCA9ICh3aW5XaWR0aCAtIG9mZnNldFdpZHRoKSAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoUE9SVFJBSVRfUkFUSU8gPCB3aW5Qb3J0cmFpdFJhdGlvKSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gd2luSGVpZ2h0O1xuICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoID0gd2luSGVpZ2h0ICogUE9SVFJBSVRfUkFUSU87XG4gICAgICAgICAgICAgICAgb2Zmc2V0TGVmdCA9ICh3aW5XaWR0aCAtIG9mZnNldFdpZHRoKSAvIDI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoID0gd2luV2lkdGg7XG4gICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gb2Zmc2V0V2lkdGggKiBMQU5EU0NBUEVfUkFUSU87XG4gICAgICAgICAgICAgICAgb2Zmc2V0VG9wID0gKHdpbkhlaWdodCAtIG9mZnNldEhlaWdodCkgLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiBvZmZzZXRXaWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogb2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgICAgbGVmdDogb2Zmc2V0TGVmdCxcbiAgICAgICAgICAgIHRvcDogb2Zmc2V0VG9wXG4gICAgICAgIH07XG4gICAgfVxufVxuIl19
