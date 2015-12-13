/**
 * @class       GetSet
 * @description Base class with get/set(ters)
 * @author      Chris Peters
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var GetSet = (function () {
    /**
     *
     */

    function GetSet() {
        _classCallCheck(this, GetSet);
    }
    // nada

    /**
     * Get and property assuming it begins with an underscore
     * @param  {String} prop The property name to get (to get the property `_x` just
     *                       pass 'x')
     * @return {Any}
     */

    _createClass(GetSet, [{
        key: 'get',
        value: function get(prop) {
            return this['_' + prop];
        }

        /**
         * set on or more properties
         * @param {String|Object} key    A string to set one property, or an object to set
         *                               many
         * @param {Any}           [val]  The value to assign if setting a single value
         * @return {GetSet}       Return this object for chaining
         */
    }, {
        key: 'set',
        value: function set(key, val) {
            switch (typeof key) {
                case 'string':
                    this['_' + key] = val;
                    break;
                case 'object':
                    var changes = key;
                    for (key in changes) {
                        this['_' + key] = changes[key];
                    }
                    break;
            }
        }
    }]);

    return GetSet;
})();

exports['default'] = GetSet;
module.exports = exports['default'];