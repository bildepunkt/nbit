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

        this._canvas.width = this._config.viewportWidth * this._config.blockSize;
        this._canvas.height = this._config.viewportHeight * this._config.blockSize;
        this._canvas.style.position = 'absolute';
        this._canvas.style.backgroundColor = this._config.canvasBgColor;

        this._config.parentEl.style.backgroundColor = this._config.parentElBgColor;
        this._config.parentEl.appendChild(this._canvas);

        this._window.addEventListener('resize', this._handleResize.bind(this));

        this._handleResize();
    }

    _handleResize() {
        let config = this._config;
        let { top, left, width, height } = MaintainMax.fit(
            config.viewportWidth * config.blockSize,
            config.viewportHeight * config.blockSize
        );

        this._canvas.style.top = `${Math.round(top)}px`;
        this._canvas.style.left = `${Math.round(left)}px`;
        this._canvas.style.width = `${Math.round(width)}px`;
        this._canvas.style.height = `${Math.round(height)}px`;
    }

    getContext() {
        return this._context;
    }
}
