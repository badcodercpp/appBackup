'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.applyUnock = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _exports = require('../../../cryptoNode/exports');

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applyUnock = exports.applyUnock = function applyUnock() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var target = arguments[1];
    var iv = arguments[2];

    console.log("target", target, iv);
    var optionsKeys = (0, _keys2.default)(options);
    var unlocked = {};
    optionsKeys.forEach(function (key) {
        if (!(0, _isEmpty3.default)(key) && !(0, _isEmpty3.default)((0, _get3.default)(options, [key]))) {
            console.log((0, _get3.default)(options, [key]));
            unlocked[key] = (0, _exports.decrypt)((0, _get3.default)(options, [key]), target, iv);
        }
    });
    return unlocked;
};