/**
 * @class       Point
 * @description create 2D point
 * @author      Chris Peters
 */
export default class Vector {
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
