'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _libMaintainMax = require('./lib/MaintainMax');

var _libMaintainMax2 = _interopRequireDefault(_libMaintainMax);

/**
 * @class       Viewport
 * @description Creates and handles the canvas DOM element
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

        this._canvas.width = this._config.gameWidth * this._config.pixelSize;
        this._canvas.height = this._config.gameHeight * this._config.pixelSize;
        this._canvas.style.position = 'absolute';

        this._config.parentEl.appendChild(this._canvas);

        this._canvas.addEventListener('resize', this._handleResize);
    }

    _createClass(Viewport, [{
        key: '_handleResize',
        value: function _handleResize() {
            var winWidth = this._window.innerWidth;
            var winHeight = this._window.innerHeight;

            var _MaintainMax$fit = _libMaintainMax2['default'].fit(winWidth, winHeight);

            var top = _MaintainMax$fit.top;
            var left = _MaintainMax$fit.left;
            var width = _MaintainMax$fit.width;
            var height = _MaintainMax$fit.height;

            this._canvas.style.top = Math.round(top) + 'px';
            this._canvas.style.left = Math.round(left) + 'px';
            this._canvas.style.width = Math.round(width) + 'px';
            this._canvas.style.height = Math.round(height) + 'px';
        }
    }, {
        key: 'getContext',
        value: function getContext() {
            return this._context;
        }
    }]);

    return Viewport;
})();

exports['default'] = Viewport;
module.exports = exports['default'];