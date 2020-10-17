'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _connection = require('../../db/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var doGetProfile = function doGetProfile(req, res) {
    var parsedBody = req.params || {};
    var id = _get(parsedBody, 'id');
    // connection.connect()
    _connection2.default.query('SELECT * FROM BJS_SIGNUP WHERE id=\'' + id + '\'', function (error, results, fields) {
        if (!error) {
            res.send(results);
            console.log('The solution is: ', results);
        } else {
            res.status(500);
            res.statusMessage = (0, _stringify2.default)({ error: 'something went wrong trace - ' + error });
            res.send('something went wrong trace - ' + error);
        }
    });
    // connection.end();
};

exports.default = doGetProfile;