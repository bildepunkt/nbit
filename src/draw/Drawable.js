import GetSet from '../GetSet';

/**
 * @class       Drawable
 * @description Base class for all drawable objects
 * @extends     {GetSet}
 * @author      Chris Peters
 */
export default class Drawable extends GetSet {
    /**
     * @param {Object} deps Injected dependencies
     */
    constructor(deps) {
        super();

        this._config = deps.config;
    }

    /**
     * [getPointOffset description]
     * @param  {Integer} x [description]
     * @param  {Integer} y [description]
     * @return {Object}  The Block point offset
     */
    _getPixelOffset(x, y) {
        let size = this._config.blockSize;

        return {
            x: (Math.round(x) * size) - (size / 2),
            y: (Math.round(y) * size) - (size / 2)
        };
    }
}
