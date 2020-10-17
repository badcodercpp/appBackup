'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _connection = require('../../db/connection');

var _connection2 = _interopRequireDefault(_connection);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _head2 = require('lodash/head');

var _head3 = _interopRequireDefault(_head2);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var doQueryPost = function doQueryPost(req, res) {
    var parsedBody = req.body || {};
    var phone = (0, _get3.default)(parsedBody, 'phone');
    var auth = (0, _get3.default)(parsedBody, 'password');
    // connection.connect()
    _connection2.default.query('SELECT password, id FROM BJS_SIGNUP WHERE email=\'' + phone + '\' OR phone=\'' + phone + '\'', function (error, results, fields) {
        if (!error) {
            var data = (0, _head3.default)(JSON.parse(JSON.stringify(results)));
            var password = (0, _get3.default)(data, 'password');
            var id = (0, _get3.default)(data, 'id');
            if ((0, _isEqual3.default)(password, auth)) {
                res.status(200);
                res.send({ id: id, status: 'done' });
            }
            console.log('The solution is: ', JSON.parse(JSON.stringify(results)));
        } else {
            res.status(500);
            res.statusMessage = JSON.stringify({ error: 'something went wrong trace - ' + error });
            res.send('something went wrong trace - ' + error);
        }
    });
    // connection.end();
};

exports.default = doQueryPost;