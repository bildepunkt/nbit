import Sprite from './Sprite';
import Block from './Block';

/**
 * @class       draw.Bitmap
 * @description Maps 2d arrays into blocks
 * @extends     Sprite
 * @requires    Block
 * @author      Chris Peters
 */
export default class Bitmap extends Sprite {
    constructor(x, y) {
        super(x, y);

        this._map = null;
    }

    _getMapOffset(map) {
        let leny = map.length;
        let lenx = map[0].length;

        return {
            x: lenx / 2,
            y: leny / 2
        }
    }

    setMap(map) {
        this._map = map;

        return this;
    }

    render() {
        let offset = this._getMapOffset(this._map),
            mapy, mapx;

        for (let y = 0, leny = this._map.length; y < leny; y++) {
            mapy = this._map[y];

            for (let x = 0, lenx = mapy.length; x < lenx; x++) {
                mapx = mapy[x];

                Block.render(x - offset.x, y - offset.y, mapx);
            }
        }
    }
}
