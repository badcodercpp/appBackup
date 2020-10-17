'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.applyLock = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _exports = require('../../../crypto/exports');

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applyLock = exports.applyLock = function applyLock() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var target = arguments[1];

    var optionsKeys = (0, _keys2.default)(options);
    var locked = {};
    optionsKeys.forEach(function (key) {
        if (!(0, _isEmpty3.default)(key)) {
            locked[key] = (0, _exports.encrypt)(key, target);
        }
    });
    return locked;
};