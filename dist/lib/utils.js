'use strict';

/**
 *
 */
module.exports = {
    clone: function (src) {
        // check for arrays too!
        var obj = (typeof src === 'object' && src.hasOwnProperty('length')) ? [] : {},
            prop;

        for (prop in src) {
            if (typeof src[prop] === 'object' && src[prop] !== null) {
                obj[prop] = this.clone(src[prop]);
            } else {
                obj[prop] = src[prop];
            }
        }
        return obj;
    },

    rotatePoint: function (px, py, cx, cy, angle) {
        angle *= (Math.PI/180);
        
        return {
            x: Math.cos(angle) * (px - cx) + cx,
            y: Math.sin(angle) * (px - cx) + cy
        };
    }
};
