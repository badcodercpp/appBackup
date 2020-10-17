'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _connection = require('../../../db/connection');

var _connection2 = _interopRequireDefault(_connection);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _head2 = require('lodash/head');

var _head3 = _interopRequireDefault(_head2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unlock = function unlock() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var promise = new Promise(function (resolve, reject) {
        var email = (0, _get3.default)(options, 'email');
        var phone = (0, _get3.default)(options, 'phone');
        _connection2.default.query('SELECT BjsKey, Hash FROM BJS_Lock WHERE BjsKey=\'' + email + '\' OR BjsKey=\'' + phone + '\'', function (e, r, f) {
            if (!e) {
                var data = (0, _head3.default)(JSON.parse(JSON.stringify(r)));
                var hash = (0, _get3.default)(data, 'hash');
                resolve(hash);
            } else {
                reject('something went wrong trace - ' + e);
            }
        });
    });
    return promise;
};

exports.default = unlock;