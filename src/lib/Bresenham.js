/**
 * @class       Bresenham
 * @description Bresenham's formulae for calculating blocks from curves, between points etc.
 *              Thanks to Zingl Alois @ http://members.chello.at/easyfilter/bresenham.html
 * @author      Chris Peters
 */
export default class Bresenham {
    /**
     * plot the connecting blocks between two points
     * @param {Point} ptA
     * @param {Point} ptB
     * @param {function} callback - what to do when a connection point is calculated
     */
    static plotLine(ptA, ptB, plot) {
        let dx = Math.abs(ptB.x - ptA.x);
        let sx = ptA.x < ptB.x ? 1 : -1;
        let dy = -Math.abs(ptB.y - ptA.y);
        let sy = ptA.y < ptB.y ? 1 : -1;
        let err = dx + dy, e2;

        while (true) {
            plot(ptA, ptB);

            if (ptA.x == ptB.x && ptA.y == ptB.y) break;

            e2 = 2 * err;

            if (e2 >= dy) {
                err += dy;
                ptA.x += sx;
            }

            if (e2 <= dx) {
                err += dx;
                ptA.y += sy;
            }
        }
    }
}
