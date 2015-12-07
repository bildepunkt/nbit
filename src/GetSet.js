/**
 * @class       GetSet
 * @description Base class with get/set(ters)
 * @author      Chris Peters
 */
export default class GetSet {
    /**
     *
     */
    constructor() {
        // nada
    }

    /**
     * Get and property assuming it begins with an underscore
     * @param  {String} prop The property name to get (to get the property `_x` just
     *                       pass 'x')
     * @return {Any}
     */
    get(prop) {
        return this[`_${prop}`];
    }

    /**
     * set on or more properties
     * @param {String|Object} key A string to set one property, or an object to set
     *                               many
     * @param {Any}           [val] The value to assign if setting a single value
     * @return {GetSet}       Return this object for chaining
     */
    set(key, val) {
        switch (typeof key) {
            case 'string':
                this[`_${key}`] = val;
                break;
            case 'object':
                let changes = key;
                for (key in changes) {
                    this[`_${key}`] = changes[key];
                }
                break;
        }
    }
}
