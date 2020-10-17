'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _head2 = require('lodash/head');

var _head3 = _interopRequireDefault(_head2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _signup = require('../../db/connection/mongo/auth/signup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uuidv1 = require('uuid/v1');

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
    var badId = uuidv1();

    var options = {
        fName: fName,
        lName: lName,
        mobile: phone,
        Captcha: Captcha,
        pContact: pContact,
        pContact_email: pContact_email,
        agreement: agreement,
        password: password,
        confirm: confirm,
        otp: otp,
        badId: badId,
        email: email,
        gender: gender,
        expertise: expertise
    };

    (0, _signup.doSignUp)(options, req, res).then(function (data) {
        if (!(0, _isEmpty3.default)(data)) {
            var d = {
                data: "done",
                token: data
            };
            res.send(d);
        } else {
            res.status(500);
            res.statusMessage = (0, _stringify2.default)({ error: 'something went wrong' });
            res.send('something went wrong trace - ');
        }
    }).catch(function (err) {
        var userId = (0, _get3.default)(err, 'badId');
        if (!(0, _isEmpty3.default)(userId)) {
            res.status(500);
            res.statusMessage = (0, _stringify2.default)({ error: 'user already exist - ' + userId });
            res.send({ error: 'user already exist - ' + userId });
        } else {
            res.status(500);
            res.statusMessage = (0, _stringify2.default)({ error: 'something went wrong trace - ' + err });
            res.send({ error: 'something went wrong trace - ' + err });
        }
    });
};

exports.default = doSignup;