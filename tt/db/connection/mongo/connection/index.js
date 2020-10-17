'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.connect = undefined;

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connect = exports.connect = function connect() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _config.MONGO.URI;

    var connection = new Promise(function (resolve, reject) {
        _index2.default.connect(url, function (err, client) {
            if (!(0, _lodash2.default)(err)) {
                reject(err);
            }
            resolve(client);
        });
    });
    return connection;
};