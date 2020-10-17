'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _head2 = require('lodash/head');

var _head3 = _interopRequireDefault(_head2);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _login = require('../../db/connection/mongo/auth/login');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var doLogin = function doLogin(req, res) {
    var parsedBody = req.body || {};
    var phone = (0, _get3.default)(parsedBody, 'phone');
    var auth = (0, _get3.default)(parsedBody, 'password');
    var options = {
        phone: phone,
        email: phone,
        password: auth
    };
    (0, _login.doLogin)(options, req, res).then(function (data) {
        if (!(0, _isEmpty3.default)(data)) {
            var respAuth = {
                success: true,
                message: 'Authentication successful!',
                token: data
            };
            res.status(200);
            res.send(respAuth);
        } else {
            res.status(401);
            res.statusMessage = JSON.stringify({ error: 'Authentication failed' });
            res.send('Authentication failed');
        }
    }).catch(function (err) {
        var userId = (0, _get3.default)(err, 'id');
        if (!(0, _isEmpty3.default)(userId)) {
            res.status(500);
            res.statusMessage = JSON.stringify({ error: 'user already exist - ' + userId });
            res.send({ error: 'user already exist - ' + userId });
        } else {
            res.status(500);
            res.statusMessage = JSON.stringify({ error: 'something went wrong trace - ' + err });
            res.send({ error: 'something went wrong trace - ' + err });
        }
    });
};

exports.default = doLogin;