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
        this.blockSize = 8;
        this.gameWidth = 100;
        this.gameHeight = 75;
        this.parentEl = document.body;
        this.parentElBgColor = '#000';
        this.canvasBgColor = '#FFF';

        for (let key in options) {
            this[key] = options[key];
        }
    }
}
