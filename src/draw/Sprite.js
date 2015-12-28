import Block from './Block';
import Bresenham from '../lib/Bresenham';

/**
 * @class       draw.Sprite
 * @description Base class for position based objects
 * @author      Chris Peters
 */
export default class Sprite {
    /**
     *
     */
    constructor(x, y) {
        this._x = x || 0;
        this._y = y || 0;
    }

    getX() {
        return this._x;
    }

    getY() {
        return this._y;
    }

    setX(val) {
        this._x = val;

        return this;
    }

    setY(val) {
        this._y = val;

        return this;
    }
}
