'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.identity = undefined;

var _pickBy2 = require('lodash/pickBy');

var _pickBy3 = _interopRequireDefault(_pickBy2);

var _identity2 = require('lodash/identity');

var _identity3 = _interopRequireDefault(_identity2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function identity(obj) {
    return (0, _pickBy3.default)(obj, _identity3.default);
};

exports.identity = identity;