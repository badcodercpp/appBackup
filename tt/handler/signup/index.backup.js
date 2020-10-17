'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // import connection from '../../db/connection';


var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _head2 = require('lodash/head');

var _head3 = _interopRequireDefault(_head2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _addEmail = require('./addEmail');

var _addEmail2 = _interopRequireDefault(_addEmail);

var _addPhone = require('./addPhone');

var _addPhone2 = _interopRequireDefault(_addPhone);

var _addBoth = require('./addBoth');

var _addBoth2 = _interopRequireDefault(_addBoth);

var _checkIfUserExists = require('./checkIfUserExists');

var _checkIfUserExists2 = _interopRequireDefault(_checkIfUserExists);

var _identity = require('../../utils/identity');

var _exports = require('../../crypto/exports');

var _getSignKeys = require('../../utils/getSignKeys');

var _constants = require('../../cryptoNode/config/constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uuidv1 = require('uuid/v1');
var jwt = require('jsonwebtoken');

var doSignup = function doSignup(req, res) {
    var parsedBody = req.body || {};
    var fName = (0, _get3.default)(parsedBody, 'fName');
    var lName = (0, _get3.default)(parsedBody, 'lName');
    var phone = (0, _get3.default)(parsedBody, 'phone');
    var Captcha = (0, _get3.default)(parsedBody, 'Captcha');
    var pContact = (0, _get3.default)(parsedBody, 'pContact', false) || false;
    var pContact_email = (0, _get3.default)(parsedBody, 'pContact_email', false) || false;
    var agreement = (0, _get3.default)(parsedBody, 'agreement', false) || false;
    var password = (0, _get3.default)(parsedBody, 'password');
    var email = (0, _get3.default)(parsedBody, 'email');
    var confirm = (0, _get3.default)(parsedBody, 'confirm');
    var otp = (0, _get3.default)(parsedBody, 'otp');
    var gender = (0, _get3.default)(parsedBody, 'gender');
    var expertise = (0, _get3.default)(parsedBody, 'expertise');
    var id = uuidv1();
    // connection.connect()

    var options = {
        fName: fName,
        lName: lName,
        phone: phone,
        Captcha: Captcha,
        pContact: pContact,
        pContact_email: pContact_email,
        agreement: agreement,
        password: password,
        confirm: confirm,
        otp: otp,
        id: id,
        email: email,
        gender: gender,
        expertise: expertise
    };
    var k = (0, _getSignKeys.getKeys)(options);
    var key = _constants2.default.key,
        iv = _constants2.default.iv;

    (0, _checkIfUserExists2.default)(email, phone, k).then(function () {
        var user = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        console.log("user", user);
        var userId = (0, _get3.default)(user, 'id');
        if ((0, _isEmpty3.default)(userId)) {
            var resp = {
                id: id,
                fName: fName,
                lName: lName,
                phone: phone,
                email: email
            };
            var respData = (0, _identity.identity)(resp);
            var useragent = (0, _get3.default)(req, 'useragent', {}) || {};
            var respWithUserAgent = _extends({}, respData, useragent);
            var token = jwt.sign(respWithUserAgent, 'kashish');
            // const encryptedToken = encrypt(token);
            options.hash = token;
            if (!(0, _isEmpty3.default)(email) && !(0, _isEmpty3.default)(phone)) {
                return (0, _addBoth2.default)(req, res, options, k, key, iv);
            } else if (!(0, _isEmpty3.default)(email) && (0, _isEmpty3.default)(phone)) {
                return (0, _addEmail2.default)(req, res, options, k, key, iv);
            } else if ((0, _isEmpty3.default)(email) && !(0, _isEmpty3.default)(phone)) {
                return (0, _addPhone2.default)(req, res, options, k, key, iv);
            } else {
                res.status(500);
                res.statusMessage = JSON.stringify({ error: 'something went wrong trace - ' + err });
                res.send({ error: 'something went wrong trace - ' + err });
            }
        }
    }).catch(function (err) {
        console.log("err", err);
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

exports.default = doSignup;