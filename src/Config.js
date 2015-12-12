/**
 * @class       Config
 * @description The configuration object for nBit. This object does not conform to
 *              the underscore prefixed private property paradigm.
 * @author      Chris Peters
 */
export default class Config {
    /**
     * [constructor description]
     * @return {[type]} [description]
     */
    constructor(options) {
        this.pixelSize = 8;
        this.gameWidth = 100;
        this.gameHeight = 75;
        this.parentEl = document.body;

        for (let key in options) {
            this[key] = options[key];
        }
    }
}
