/**
 * @class       Xhr
 * @description a convenient wrapper for ajax calls
 * @author      Chris Peters
 */
export default class Xhr {
    /**
     * [get description]
     * @return {[type]} [description]
     */
    static get(url, callback, type) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = type || '';

        xhr.onload = function() {
            if (this.status == 200) {
                callback(this.response);
            }
        };

        xhr.send();
    }
}
