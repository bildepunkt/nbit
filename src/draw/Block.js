/**
 * @class       draw.Block
 * @description 2D point with color data. Used to render all nbit display objects
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

    static _setSpriteProperties(sprite) {
        if (sprite.getX() != 0 || sprite.getY() != 0) {
            Block._context.translate(sprite.getX(), sprite.getY());
        }

        if (sprite.getScaleX() != 1 || sprite.getScaleY() != 1) {
            Block._context.scale(sprite.getScaleX(), sprite.getScaleY());
        }

        if (sprite.getRotation() != 0) {
            Block._context.rotate(sprite.getRotation());
        }

        if (sprite.getOpacity() < 1) {
            Block.globalAlpha = sprite.getOpacity();
        }

        if (sprite.getComposite() != 'source-over') {
            Block.globalCompositeOperation = sprite.getComposite();
        }
    }

    /**
     * Renders a block to the canvas
     *
     *
     */
    static render(x, y, color, sprite) {
        if (!Block._context || !Block._blockSize) {
            throw new Error('Block requires both context and blockSize');
        }

        let offset = this._getPixelOffset(x, y, this._blockSize);

        Block._context.save();

        if (sprite) {
            this._setSpriteProperties(sprite);
        }

        Block._context.fillStyle = color;
        Block._context.fillRect(offset.x, offset.y, this._blockSize, this._blockSize);
        Block._context.restore();
    }

    static setContext(context) {
        Block._context = context;

        return this;
    }

    static setBlockSize(size) {
        Block._blockSize = size;

        return this;
    }
}

/**
 * Static properties
 */
Block._context = null;
Block._blockSize = null;
