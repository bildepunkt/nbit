import GetSet from '../GetSet';

/**
 * @class       Pixel
 * @description 2D point with color data
 * @extends     {GetSet}
 * @author      Chris Peters
 */
export default class Pixel extends GetSet {
    /**
     * initialize a point with 0,0 or given coordinates
     * @param  {Integer} x
     * @param  {Integer} y
     * @param  {String}  color
     */
    constructor(x, y, color) {
        super();

        this._x = x || 0;
        this._y = y || 0;
        this._color = color || '#000';
    }
}
