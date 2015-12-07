(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _srcXhr = require('./src/Xhr');

var _srcXhr2 = _interopRequireDefault(_srcXhr);

var pre = document.querySelector('#code');

// this 'main.js' will be the file relative to each example, thereby fetching the
// example's code file
_srcXhr2['default'].get('main.js', function (data) {
    console.log(data);
    pre.innerHTML = data;
});

},{"./src/Xhr":2}],2:[function(require,module,exports){
/**
 * @class       Xhr
 * @description a convenient wrapper for ajax calls
 * @author      Chris Peters
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Xhr = (function () {
    function Xhr() {
        _classCallCheck(this, Xhr);
    }

    _createClass(Xhr, null, [{
        key: 'get',

        /**
         * [get description]
         * @return {[type]} [description]
         */
        value: function get(url, callback, type) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = type || '';

            xhr.onload = function () {
                if (this.status == 200) {
                    callback(this.response);
                }
            };

            xhr.send();
        }
    }]);

    return Xhr;
})();

exports['default'] = Xhr;
module.exports = exports['default'];

},{}]},{},[1]);
