'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.applyLock = undefined;

var _exports = require('../../../cryptoNode/exports');

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applyLock = exports.applyLock = function applyLock() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var target = arguments[1];
    var iv = arguments[2];

    var optionsKeys = Object.keys(options);
    var locked = {};
    optionsKeys.forEach(function (key) {
        if (!(0, _isEmpty3.default)(key) && !(0, _isEmpty3.default)((0, _get3.default)(options, [key]))) {
            console.log(key, (0, _get3.default)(options, [key]));
            locked[key] = (0, _get3.default)((0, _exports.encrypt)((0, _get3.default)(options, [key]), target, iv), 'encryptedData');
        }
    });
    return locked;
};