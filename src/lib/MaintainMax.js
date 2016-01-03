/**
 * @class       MaintainMax
 * @description Keeps canvas element centered and (with aspect ratio intact) in the viewport
 * @author      Chris Peters
 */
export default class MaintainMax {
    /**
     * @param  {number} width - the element's width
     * @param  {number} height - the element's height
     * @return {object} the new top, left, width, & height
     */
    static fit(width, height) {
        const LANDSCAPE_RATIO = height / width;
        const PORTRAIT_RATIO  = width / height;
        const IS_LANDSCAPE    = LANDSCAPE_RATIO < PORTRAIT_RATIO ? true : false;

        let winWidth = window.innerWidth;
        let winHeight = window.innerHeight;
        let winLandscapeRatio = winHeight / winWidth;
        let winPortraitRatio  = winWidth / winHeight;
        let offsetLeft = 0;
        let offsetTop  = 0;
        let offsetWidth;
        let offsetHeight;

        if (IS_LANDSCAPE) {
            if (LANDSCAPE_RATIO < winLandscapeRatio) {
                offsetWidth = winWidth;
                offsetHeight = offsetWidth * LANDSCAPE_RATIO;
                offsetTop = (winHeight - offsetHeight) / 2;
            } else {
                offsetHeight = winHeight;
                offsetWidth = winHeight * PORTRAIT_RATIO;
                offsetLeft = (winWidth - offsetWidth) / 2;
            }
        } else {
            if (PORTRAIT_RATIO < winPortraitRatio) {
                offsetHeight = winHeight;
                offsetWidth = winHeight * PORTRAIT_RATIO;
                offsetLeft = (winWidth - offsetWidth) / 2;
            } else {
                offsetWidth = winWidth;
                offsetHeight = offsetWidth * LANDSCAPE_RATIO;
                offsetTop = (winHeight - offsetHeight) / 2;
            }
        }

        return {
            width: offsetWidth,
            height: offsetHeight,
            left: offsetLeft,
            top: offsetTop
        };
    }
}
