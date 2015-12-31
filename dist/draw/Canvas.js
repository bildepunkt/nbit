'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       draw.Canvas
 * @description 2D point with color data. Used to render all nbit display objects
 * @author      Chris Peters
 */

var Canvas = (function () {
    function Canvas() {
        _classCallCheck(this, Canvas);
    }

    _createClass(Canvas, null, [{
        key: '_getPixelOffset',

        /**
         * [getPointOffset description]
         * @param {Integer} x    The y coord
         * @param {Integer} y    The x coord
         * @param {Integer} size The block size
         * @return {Object}      The Block point offset
         */
        value: function _getPixelOffset(x, y, size) {
            return {
                x: Math.round(x) * size - size / 2,
                y: Math.round(y) * size - size / 2
            };
        }
    }, {
        key: '_setSpriteProperties',
        value: function _setSpriteProperties(sprite) {
            //if (sprite.getX() != 0 || sprite.getY() != 0) {
            var _getPixelOffset2 = this._getPixelOffset(sprite.getX(), sprite.getY(), this._blockSize);

            var x = _getPixelOffset2.x;
            var y = _getPixelOffset2.y;

            Canvas._context.translate(x, y);
            //}

            if (sprite.getScaleX() != 1 || sprite.getScaleY() != 1) {
                Canvas._context.scale(sprite.getScaleX(), sprite.getScaleY());
            }

            if (sprite.getRotation() != 0) {
                Canvas._context.rotate(sprite.getRotation());
            }

            if (sprite.getOpacity() < 1) {
                Canvas.globalAlpha = sprite.getOpacity();
            }

            if (sprite.getComposite() != 'source-over') {
                Canvas.globalCompositeOperation = sprite.getComposite();
            }
        }

        /**
         * Renders a block to the canvas
         *
         *
         */

    }, {
        key: 'render',
        value: function render(x, y, color, sprite) {
            if (!Canvas._context || !Canvas._blockSize) {
                throw new Error('Canvas requires both context and blockSize');
            }

            var offset = this._getPixelOffset(x, y, this._blockSize);

            Canvas._context.save();

            if (sprite) {
                this._setSpriteProperties(sprite);
            }

            Canvas._context.fillStyle = color;
            Canvas._context.fillRect(offset.x, offset.y, this._blockSize, this._blockSize);
            Canvas._context.restore();
        }
    }, {
        key: 'setContext',
        value: function setContext(context) {
            Canvas._context = context;

            return this;
        }
    }, {
        key: 'setBlockSize',
        value: function setBlockSize(size) {
            Canvas._blockSize = size;

            return this;
        }
    }]);

    return Canvas;
})();

/**
 * Static properties
 */

exports.default = Canvas;
Canvas._context = null;
Canvas._blockSize = null;