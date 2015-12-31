import Point from './Point';

/**
 * @class       Picl
 * @description Base drawing object for all nbit components. This object does not
 *              conform to the underscore-prefixed private property paradigm.
 * @extends     Point
 * @author      Chris Peters
 */
export default class Picl extends Point {
    /**
     * @param {Integer} [x]     2d coordinate
     * @param {Integer} [y]     2d coordinate
     * @param {String}  [color] Initial color
     */
    constructor(x, y, color) {
        super(x, y);

        this.color = color || '#000';
    }
}
