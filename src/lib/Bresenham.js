/**
 * @class       Bresenham
 * @description Use Bresenham's formula to calculate the points between points
 * @author      Chris Peters
 */
export default class Bresenham {
    /**
     * calculate the connection points between two points
     * @param {Point} ptA
     * @param {Point} ptB
     * @param {function} callback - what to do when a connection point is calculated
     */
    static calculate(ptA, ptB, callback) {
        let dx = Math.abs(ptB.x - ptA.x);
        let sx = ptA.x < ptB.x ? 1 : -1;
        let dy = Math.abs(ptB.y - ptA.y);
        let sy = ptA.y < ptB.y ? 1 : -1;
        let err = (dx > dy ? dx : -dy) / 2;
        let e2;

        let xTotal = Math.abs(ptB.x - ptA.x);
        let yTotal = Math.abs(ptB.y - ptA.y);

        while (xTotal >= 0 || yTotal >= 0) {
            callback(ptA.x, ptA.y);

            e2 = err;

            if (e2 > -dx) {
                err -= dy;
                ptA.x += sx;
            }

            if (e2 < dy) {
                err += dx;
                ptA.y += sy;
            }

            xTotal--;
            yTotal--;
        }
    }
}
