'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeJwtToken = exports.getJwtToken = undefined;

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwt = require('jsonwebtoken');

var getJwtToken = exports.getJwtToken = function getJwtToken(data) {
    var jwtEncodePromise = new Promise(function (resolve, reject) {
        var signature = jwt.sign(data, 'kashish');
        if (!(0, _isEmpty3.default)(signature)) {
            resolve(signature);
        } else {
            reject({ err: 'something went wrong' });
        }
    });
    return jwtEncodePromise;
};

var decodeJwtToken = exports.decodeJwtToken = function decodeJwtToken(token) {
    var decodeJwtPromise = new Promise(function (resolve, reject) {
        jwt.verify(token, 'kashish', function (err, decoded) {
            if (!(0, _isEmpty3.default)(err)) {
                reject({ error: err });
            } else {
                resolve(decoded);
            }
        });
    });
    return decodeJwtPromise;
};