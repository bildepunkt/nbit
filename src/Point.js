/**
 * @class       Point
 * @description Create 2D point. This object does not conform to the
 *              underscore-prefixed private property paradigm.
 * @author      Chris Peters
 */
export default class Point {
    /**
     * initialize a point with 0,0 or given coordinates
     * @param  {Integer} x
     * @param  {Integer} y
     */
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
}
