import Drawable from './Drawable';

/**
 * @class       Block
 * @description 2D point with color data
 * @extends     {Drawable}
 * @author      Chris Peters
 */
export default class Block extends Drawable {
    /**
     * Initialize a point with 0,0 or given coordinates
     *
     * @param {Object}  deps        Injected dependencies
     * @param {Object}  deps.config Configuration
     * @param {Integer} [x]         Initial x position
     * @param {Integer} [y]         Initial y position
     * @param {String}  [color]     Initial color
     */
    constructor(deps, x, y, color) {
        super(deps);

        this._config = deps.config;

        this._x = x || 0;
        this._y = y || 0;
        this._color = color || '#000';
    }

    /**
     * Renders a block to the canvas
     *
     * @param {Object} context
     */
    render(context) {
        let size = this._config.blockSize;
        let { x, y } = this._getPixelOffset(this._x, this._y);

        context.save();
        context.fillStyle = this._color;
        context.fillRect(x, y, size, size);
        context.restore();
    }
}
