/**
 * @class       Sprite
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
        this._composite = Sprite._compositeDefault;
        this._opacity = 1;
    }

    static getCompositeDefault() {
        return Sprite._compositeDefault;
    }

    /**
     * @return {String}
     */
    getComposite() {
        return this._composite;
    }

    /**
     * @return {Float}
     */
    getOpacity() {
        return this._opacity;
    }

    /**
     * @return {Float}
     */
    getRotation() {
        return this._rotation;
    }

    /**
     * @return {Integer}
     */
    getScaleX() {
        return Math.round(this._scaleX);
    }

    /**
     * @return {Integer}
     */
    getScaleY() {
        return Math.round(this._scaleY);
    }

    /**
     * @return {Integer}
     */
    getX() {
        return Math.round(this._x);
    }

    /**
     * @return {Integer}
     */
    getY() {
        return Math.round(this._y);
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

Sprite._compositeDefault = 'source-over';

