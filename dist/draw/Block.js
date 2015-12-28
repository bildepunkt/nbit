'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       draw.Block
 * @description 2D point with color data. Used to render all nbit display objects
 * @author      Chris Peters
 */

var Block = (function () {
    function Block() {
        _classCallCheck(this, Block);
    }

    _createClass(Block, null, [{
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

        /**
         * Renders a block to the canvas
         *
         * @param {Object} context The canvas' 2d context object
         */

    }, {
        key: 'render',
        value: function render(x, y, color) {
            if (!Block._context || !Block._blockSize) {
                throw new Error('Block requires a context and size');
            }

            var offset = this._getPixelOffset(x, y, this._blockSize);

            Block._context.save();
            Block._context.fillStyle = color;
            Block._context.fillRect(offset.x, offset.y, this._blockSize, this._blockSize);
            Block._context.restore();
        }
    }, {
        key: 'setContext',
        value: function setContext(context) {
            Block._context = context;

            return this;
        }
    }, {
        key: 'setBlockSize',
        value: function setBlockSize(size) {
            Block._blockSize = size;

            return this;
        }
    }]);

    return Block;
})();

/**
 * Static properties
 */

exports.default = Block;
Block._context = null;
Block._blockSize = null;