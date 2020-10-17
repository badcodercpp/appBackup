'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getKeys = undefined;

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _config = require('../crypto/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getKeys = exports.getKeys = function getKeys() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var phone = (0, _get3.default)(options, 'phone');
    var email = (0, _get3.default)(options, 'email');
    if (!(0, _isEmpty3.default)(phone) && !(0, _isEmpty3.default)(email)) {
        return phone;
    } else if (!(0, _isEmpty3.default)(phone) && (0, _isEmpty3.default)(email)) {
        return phone;
    } else if ((0, _isEmpty3.default)(phone) && !(0, _isEmpty3.default)(email)) {
        return email;
    } else {
        _config.config.key;
    }
};