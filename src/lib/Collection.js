/**
 * @class       Collection
 * @description An array of wrapper items stored with a name and the item's value.
 * @author      Chris Peters
 */
export default class Collection {
    /**
     *
     */
    constructor() {
        /**
         * @member {Array} SW.Collection.prototype._items - the sorted list
         * @private
         */
        this._items = [];
    }

    /**
     * add an item with optional name
     *
     * @param  {Any}        item    the item to add
     * @param  {String}     [name] the optional name of the item
     * @return {Collection}
     */
    addItem(item, name) {
        name = typeof name !== 'undefined' ? name : '';

        this._items.push({
            item, name
        });

        return this;
    }

    /**
     * add multiple items
     *
     * @param {...Object} items [description]
     */
    addItems(...items) {
        for (let item of items) {
            if (typeof item.item === 'object' && typeof item.name === 'string') {
                // if item has item/name structure
                this.addItem(item.item, item.name);
            } else {
                // for convenience allow user to add just item
                this.addItem(item);
            }
        }

        return this;
    }

    /**
     * iterates the collection's sortedItems. The item, index, and name are supplied to the provided function
     *
     * @param {Function} fn
     * @param {Object}   scope
     */
    each(fn, scope) {
        let item;

        fn = scope ? fn.bind(scope) : fn;

        for (var i = 0, len = this._items.length; i < len; i++) {
            item = this._items[i];

            if (fn(item.item, i, item.name) === false) {
                break;
            }
        }
    }
}
