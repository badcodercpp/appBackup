'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.withUserAgent = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withUserAgent = exports.withUserAgent = function withUserAgent(req, res) {
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var useragent = (0, _get3.default)(req, 'useragent') || {};
    return _extends({}, useragent, data);
};