import MaintainMax from './lib/MaintainMax';
import Sprite from './Sprite';
import config from './config';

/**
 * @class       Canvas
 * @description Creates and renders to the canvas DOM element
 * @extends     GetSet
 * @required    MaintainMax
 * @author      Chris Peters
 */
export default class Canvas {
    /**
     * @param {object} [deps]
     * @param {object} [deps.document]
     * @param {object} [deps.window]
     */
    constructor(deps) {
        deps = deps || {};
        this._document = deps.document || document;
        this._window = deps.window || window;

        this._canvas = this._document.createElement('canvas');
        this._context = this._canvas.getContext('2d');

        this._canvas.width = config.viewportWidth * config.ppp;
        this._canvas.height = config.viewportHeight * config.ppp;
        this._canvas.style.position = 'absolute';
        this._canvas.style.backgroundColor = config.canvasBgColor;

        config.parentEl.style.backgroundColor = config.parentElBgColor;
        config.parentEl.appendChild(this._canvas);

        this._window.addEventListener('resize', this._handleResize.bind(this));

        this._handleResize();
    }

    /**
     * adjust canvas MaintainMax to fit canvas to resized window
     */
    _handleResize() {
        let { top, left, width, height } = MaintainMax.fit(
            config.viewportWidth * config.ppp,
            config.viewportHeight * config.ppp
        );

        this._canvas.style.top = `${Math.round(top)}px`;
        this._canvas.style.left = `${Math.round(left)}px`;
        this._canvas.style.width = `${Math.round(width)}px`;
        this._canvas.style.height = `${Math.round(height)}px`;

        this.onResize();
    }

    /**
     * render Picls to the canvas
     *
     * @private
     * @param  {Integer} x     [description]
     * @param  {Integer} y     [description]
     * @param  {String}  color [description]
     */
    _renderPicl(x, y, color) {
        let ppp = config.ppp;

        this._context.fillStyle = color;
        this._context.fillRect(x * ppp, y * ppp, ppp, ppp);
        this._context.restore();
    }

    /**
     * adjust the canvas based on the Sprite's attrs
     */
    _setSpriteContext(sprite) {
        let ppp = config.ppp;

        this._context.translate(sprite.getX() * ppp, sprite.getY() * ppp);

        this._context.scale(sprite.getScaleX(), sprite.getScaleY());

        this._context.rotate(sprite.getRotation());

        if (sprite.getOpacity() !== 1) {
            this._context.globalAlpha = sprite.getOpacity();
        }

        if (sprite.getComposite() !== Sprite.getCompositeDefault()) {
            this._context.globalCompositeOperation = sprite.getComposite();
        }
    }

    /**
     * @return {HTMLEntity} canvas
     */
    getEl() {
        return this._canvas;
    }

    /**
     * window (and subsequently, canvas el) resize callback
     * @return {[type]} [description]
     */
    onResize() {}

    /**
     * collects object's Picls and renders them to canvas
     *
     * @param {Object} object Any nbit object
     */
    render(object) {
        let picls = object.render();

        this._context.save();

        if (object instanceof Sprite) {
            this._setSpriteContext(object);
        }

        for (let picl of picls) {
            this._renderPicl(picl.x, picl.y, picl.color);
        }
    }
}
