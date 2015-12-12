import MaintainMax from './lib/MaintainMax';

/**
 * @class       Viewport
 * @description Creates and handles the canvas DOM element
 * @required    MaintainMax
 * @author      Chris Peters
 */
export default class Viewport {
    /**
     * @param {object} deps
     * @param {object} deps.config
     * @param {object} [deps.document]
     * @param {object} [deps.window]
     */
    constructor(deps) {
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

    _handleResize() {
        let winWidth = this._window.innerWidth;
        let winHeight = this._window.innerHeight;
        let { top, left, width, height } = MaintainMax.fit(winWidth, winHeight);

        this._canvas.style.top = `${Math.round(top)}px`;
        this._canvas.style.left = `${Math.round(left)}px`;
        this._canvas.style.width = `${Math.round(width)}px`;
        this._canvas.style.height = `${Math.round(height)}px`;
    }

    getContext() {
        return this._context;
    }
}
