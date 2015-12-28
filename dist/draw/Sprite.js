'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Block = require('./Block');

var _Block2 = _interopRequireDefault(_Block);

var _Bresenham = require('../lib/Bresenham');

var _Bresenham2 = _interopRequireDefault(_Bresenham);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       draw.Sprite
 * @description Base class for position based objects
 * @author      Chris Peters
 */

var Sprite = (function () {
    /**
     *
     */

    function Sprite(x, y) {
        _classCallCheck(this, Sprite);

        this._x = x || 0;
        this._y = y || 0;
        this._scaleX = 1;
        this._scaleY = 1;
        this._rotation = 0;
        this._composite = 'source-over';
        this._opacity = 1;
    }

    _createClass(Sprite, [{
        key: 'getComposite',
        value: function getComposite() {
            return this._composite;
        }
    }, {
        key: 'getOpacity',
        value: function getOpacity() {
            return this._opacity;
        }
    }, {
        key: 'getRotation',
        value: function getRotation() {
            return this._rotation;
        }
    }, {
        key: 'getScaleX',
        value: function getScaleX() {
            return this._scaleX;
        }
    }, {
        key: 'getScaleY',
        value: function getScaleY() {
            return this._scaleY;
        }
    }, {
        key: 'getX',
        value: function getX() {
            return this._x;
        }
    }, {
        key: 'getY',
        value: function getY() {
            return this._y;
        }
    }, {
        key: 'setComposite',
        value: function setComposite(val) {
            this._composite = val;

            return this;
        }
    }, {
        key: 'setOpacity',
        value: function setOpacity(val) {
            this._opacity = val;

            return this;
        }
    }, {
        key: 'setRotation',
        value: function setRotation(val) {
            this._rotation = val;

            return this;
        }
    }, {
        key: 'setScaleX',
        value: function setScaleX(val) {
            this._scaleX = val;

            return this;
        }
    }, {
        key: 'setScaleY',
        value: function setScaleY(val) {
            this._scaleY = val;

            return this;
        }
    }, {
        key: 'setX',
        value: function setX(val) {
            this._x = val;

            return this;
        }
    }, {
        key: 'setY',
        value: function setY(val) {
            this._y = val;

            return this;
        }
    }]);

    return Sprite;
})();

exports.default = Sprite;