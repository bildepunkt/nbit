import CollisionLib from './lib/Collision';
import config from '../config';

/**
 * @class       Collision
 * @description Various forms of collision detection
 * @author      Chris Peters
 */
export default class Collision {
    /**
     * returns true if x/y is inside entity's bounding box
     *
     * @param  {Integer} x      mouse/touch position
     * @param  {Integer} y      mouse/touch position
     * @param  {Sprite}  entity
     * @return {Boolean}
     */
    static hitTest(x, y, entity) {
        let ppp = config.ppp;
        let boundingBox = entity.getBoundingBox();

        for (let prop in boundingBox) {
            boundingBox[prop] *= ppp;
        }

        return CollisionLib.hitTest(Math.floor(x) * ppp, Math.floor(y) * ppp, boundingBox);
    }
}
