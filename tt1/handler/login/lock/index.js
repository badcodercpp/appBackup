'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _connection = require('../../../db/connection');

var _connection2 = _interopRequireDefault(_connection);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _head2 = require('lodash/head');

var _head3 = _interopRequireDefault(_head2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lock = function lock(key) {
    var promise = new _promise2.default(function (resolve, reject) {
        _connection2.default.query('INSERT INTO BJS_Lock(BjsKey, Hash) VALUES(\'' + key + '\', \'' + key + '\')', function (e, r, f) {
            if (!e) {
                var d = {
                    data: "done",
                    token: key
                };
                resolve(d);
            } else {
                reject('something went wrong trace - ' + e);
            }
        });
    });
    return promise;
};

exports.default = lock;