'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _head2 = require('lodash/head');

var _head3 = _interopRequireDefault(_head2);

var _connection = require('../../db/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { applyLock } from './lock/applyLock';

var checkIfUserExists = function checkIfUserExists(email, phone, key) {
    var user = {
        exist: false,
        id: null
    };
    // const u = {
    //     email, 
    //     phone, 
    // };

    // const d = applyLock(u, key);
    // const email_enc = _get(d, 'email');
    // const phone_enc = _get(d, 'phone');
    var userPromise = new Promise(function (resolve, reject) {
        _connection2.default.query('SELECT BjsKey, Hash FROM BJS_Lock WHERE email=\'' + email + '\'', function (error, results, fields) {
            if (!error) {
                var data = (0, _head3.default)(JSON.parse(JSON.stringify(results)));
                var id = (0, _get3.default)(data, 'BjsKey');
                if ((0, _isEmpty3.default)(id)) {
                    _connection2.default.query('SELECT BjsKey, Hash FROM BJS_Lock WHERE BjsKey=\'' + phone + '\'', function (error, results, fields) {
                        if (!error) {
                            var _data = (0, _head3.default)(JSON.parse(JSON.stringify(results)));
                            var id_phone = (0, _get3.default)(_data, 'BjsKey');
                            if ((0, _isEmpty3.default)(id_phone)) {
                                user.exist = false;
                                user.id = null;
                                resolve(user);
                            } else {
                                user.exist = true;
                                user.id = id_phone;
                                reject(user);
                            }
                        } else {
                            reject({ error: error });
                        }
                    });
                } else {
                    user.exist = true;
                    user.id = id;
                    reject(user);
                }
            } else {
                reject({ error: error });
            }
        });
    });
    return userPromise;
};

exports.default = checkIfUserExists;