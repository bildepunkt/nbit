import Sprite from './Sprite';
import Picl from './Picl';


/**
 * @class       Bitmap
 * @description Maps 2d arrays into blocks
 * @extends     Sprite
 * @requires    Picl
 * @author      Chris Peters
 */
export default class Bitmap extends Sprite {
    constructor() {
        super();

        this._maps = [];
        this._frame = 0;
    }

    addMap(map) {
        this._maps.push(map);

        return this;
    }

    getBoundingBox() {
        return {
            left: this._x,
            top: this._y,
            right: this._x + this._maps[this._frame][0].length,
            bottom: this._y + this._maps[this._frame].length
        };
    }

    render() {
        let map = this._maps[this._frame],
            picls = [],
            mapy, mapx;

        for (let y = 0, leny = map.length; y < leny; y++) {
            mapy = map[y];

            for (let x = 0, lenx = mapy.length; x < lenx; x++) {
                mapx = mapy[x];

                picls.push(new Picl(x, y, mapx));
            }
        }

        return picls;
    }

    setFrame(val) {
        this._frame = val;

        return this;
    }
}
