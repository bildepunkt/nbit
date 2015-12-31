import Bresenham from './lib/Bresenham';
import Picl from './Picl';

/**
 * @class       draw.Line
 * @description Plots Picls between (and at) n Points
 * @requires    Bresenham
 * @requires    Picl
 * @author      Chris Peters
 */
export default class Line {
    /**
     * @param {String} [color] Initial color
     */
    constructor(color, ...points) {
        this._picls = [];
        this._points = [points];
        this._strokeColor = color || '#000';
    }

    /**
     * the Picl-pusher to pass to Bresenham.plotLine
     *
     * @private
     * @param  {[type]} x [description]
     * @param  {[type]} y [description]
     */
    _addPicls(x, y) {
        this._picls.push(new Picl(x, y, this._strokeColor));
    }

    /**
     * Set the line's points
     *
     * @param {Point} ...points
     */
    setPoints(...points) {
        if (points.length < 2) {
            throw new Error('Line must have at least two points');
        }

        this._points = points;

        return this;
    }

    render() {
        // empty picl array
        this._picls = [];

        for (let i = 0, len = this._points.length - 1; i < len; i++) {
            Bresenham.plotLine(this._points[i], this._points[i + 1], this._addPicls.bind(this));
        }

        return this._picls;
    }
}
