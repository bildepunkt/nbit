/**
 * @class       draw.Block
 * @description 2D point with color data
 * @author      Chris Peters
 */
export default class Block {
    /**
     * [getPointOffset description]
     * @param {Integer} x    The y coord
     * @param {Integer} y    The x coord
     * @param {Integer} size The block size
     * @return {Object}      The Block point offset
     */
    static _getPixelOffset(x, y, size) {
        return {
            x: (Math.round(x) * size) - (size / 2),
            y: (Math.round(y) * size) - (size / 2)
        };
    }

    /**
     * Renders a block to the canvas
     *
     * @param {Object} context The canvas' 2d context object
     */
    static render(x, y, color, size) {
        let offset = this._getPixelOffset(x, y, size);

        Block._context.save();
        Block._context.fillStyle = color;
        Block._context.fillRect(offset.x, offset.y, size, size);
        Block._context.restore();
    }

    static setContext(context) {
        Block._context = context;

        return this;
    }
}

/**
 * Static properties
 */
Block._context = null;
