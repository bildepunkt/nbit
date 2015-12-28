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
        this._scaleX = 1;
        this._scaleY = 1;
        this._rotation = 0;
        this._composite = 'source-over';
        this._opacity = 1;
    }

    getComposite() {
        return this._composite;
    }

    getOpacity() {
        return this._opacity;
    }

    getRotation() {
        return this._rotation;
    }

    getScaleX() {
        return this._scaleX;
    }

    getScaleY() {
        return this._scaleY;
    }

    getX() {
        return this._x;
    }

    getY() {
        return this._y;
    }

    setComposite(val) {
        this._composite = val;

        return this;
    }

    setOpacity(val) {
        this._opacity = val;

        return this;
    }

    setRotation(val) {
        this._rotation = val;

        return this;
    }

    setScaleX(val) {
        this._scaleX = val;

        return this;
    }

    setScaleY(val) {
        this._scaleY = val;

        return this;
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
