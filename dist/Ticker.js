'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       animate.Ticker
 * @description Executes callback and broadcasts event based on requestAnimationFrame
 * @author      Chris Peters
 */

var Ticker = (function () {
    /**
     * [constructor description]
     * @param  {[type]} deps [description]
     * @return {[type]}      [description]
     */

    function Ticker(deps) {
        _classCallCheck(this, Ticker);

        this._document = deps.document || document;
        this._window = deps.window || window;

        this._paused = false;
        this._ticks = 0;
        this._event = new CustomEvent('ontick', {
            detail: {
                _ticks: this._ticks
            }
        });
    }

    /**
     * [_update description]
     * @return {[type]} [description]
     */

    _createClass(Ticker, [{
        key: '_update',
        value: function _update() {
            if (this._paused) {
                return;
            }

            this.update(this._ticks);
            this._document.dispatchEvent(this._event);
            this._ticks++;

            this._window.requestAnimationFrame(this._update.bind(this));
        }

        /**
         * [pause description]
         * @return {[type]} [description]
         */

    }, {
        key: 'pause',
        value: function pause() {
            this._paused = true;
        }

        /**
         * [resume description]
         * @return {[type]} [description]
         */

    }, {
        key: 'resume',
        value: function resume() {
            this._paused = false;
            this.start();
        }

        /**
         * [start description]
         * @return {[type]} [description]
         */

    }, {
        key: 'start',
        value: function start() {
            this._update();
        }

        /**
         * the callback executed on tick
         */

    }, {
        key: 'update',
        value: function update() {}
    }]);

    return Ticker;
})();

exports.default = Ticker;