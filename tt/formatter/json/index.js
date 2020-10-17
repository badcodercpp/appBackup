'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.jsonFormatter = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jsonFormatter = exports.jsonFormatter = function jsonFormatter(formatString, keys, accessor) {
    var jsonObject = formatString || {};
    var keyClone = _extends({}, keys);
    var names = Object.keys(keyClone);
    var data = (0, _get3.default)(jsonObject, accessor, []) || [];
    console.log(data, accessor);
    var formattedData = data.map(function () {
        var d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var i = arguments[1];

        var obj = {};
        names.forEach(function (n, i) {
            obj[n] = (0, _get3.default)(d, [i]);
        });
        console.log(obj);
        return obj;
    });
    var formatedObject = {
        data: formattedData
    };
    return formatedObject;
};