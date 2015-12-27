import Block from './Block';
import Bresenham from '../lib/Bresenham';

/**
 * @class       draw.Line
 * @description Plots Blocks between (and at) two Points
 * @requires    Block
 * @requires    Bresenham
 * @author      Chris Peters
 */
export default class Line {
    /**
     *
     * @param {Object}  deps         Injected dependencies
     * @param {Object}  deps.config  Configuration
     * @param {Object}  deps.context The canvas' 2d context
     * @param {String}  [color]      Initial color
     */
    constructor(deps, color) {
        this._config = deps.config;

        this._points = [];
        this._color = color || '#000';
    }

    /**
     * The wrapper method to pass to Bresenham.plotLine
     *
     * @param  {[type]} x [description]
     * @param  {[type]} y [description]
     */
    _plot(x, y) {
        Block.render(x, y, this._color, this._config.blockSize, this._context);
    }

    /**
     * Set the line's two points
     *
     * @param {[type]} key [description]
     * @param {[type]} val [description]
     */
    setPoints(ptA, ptB) {
        this._points = [ptA, ptB];

        return this;
    }

    render() {
        if (this._points[0] && this._points[1]) {
            Bresenham.plotLine(this._points[0], this._points[1], this._plot.bind(this));
        } else {
            throw new Error('Line must have two points');
        }
    }
}
