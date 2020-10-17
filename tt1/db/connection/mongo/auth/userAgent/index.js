'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.withUserAgent = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withUserAgent = exports.withUserAgent = function withUserAgent(req, res) {
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var useragent = (0, _get3.default)(req, 'useragent') || {};
    return (0, _extends3.default)({}, useragent, data);
};