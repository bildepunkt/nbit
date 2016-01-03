/**
 * @class       Collision
 * @description Various forms of collision detection
 * @author      Chris Peters
 */
export default class Collision {
    /**
     * returns true if x/y is inside entity's bounding box
     *
     * @param  {Integer} x           mouse/touch position
     * @param  {Integer} y           mouse/touch position
     * @param  {Sprite}  boundingBox A bb object with top, left, right, bottom properties
     * @return {Boolean}
     */
    static hitTest(x, y, boundingBox) {
        return (
            x >= boundingBox.left  &&
            x <= boundingBox.right &&
            y >= boundingBox.top   &&
            y <= boundingBox.bottom
        );
    }
}
