/**
 * @class       animate.Ticker
 * @description Executes callback and broadcasts event based on requestAnimationFrame
 * @author      Chris Peters
 */
export default class Ticker {
    /**
     * @param {Object} [deps] optional document and window dependancy injection for testing
     */
    constructor(deps) {
        deps = deps || {};
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
    _update() {
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
    pause() {
        this._paused = true;
    }

    /**
     * [resume description]
     * @return {[type]} [description]
     */
    resume() {
        this._paused = false;
        this.start();
    }

    /**
     * [start description]
     * @return {[type]} [description]
     */
    start() {
        this._update();

        return this;
    }

    /**
     * the callback executed on tick
     */
    update() {}
}
