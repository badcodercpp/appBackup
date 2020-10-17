'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _connection = require('../../db/connection');

var _connection2 = _interopRequireDefault(_connection);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _head2 = require('lodash/head');

var _head3 = _interopRequireDefault(_head2);

var _applyLock = require('./lock/applyLock');

var _lock = require('./lock');

var _lock2 = _interopRequireDefault(_lock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addBoth = function addBoth(req, res) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var k = arguments[3];
    var key = arguments[4];
    var iv = arguments[5];

    var fName = (0, _get3.default)(options, 'fName');
    var lName = (0, _get3.default)(options, 'lName');
    var Captcha = (0, _get3.default)(options, 'Captcha');
    var pContact = (0, _get3.default)(options, 'pContact');
    var pContact_email = (0, _get3.default)(options, 'pContact_email');
    var agreement = (0, _get3.default)(options, 'agreement');
    var password = (0, _get3.default)(options, 'password');
    var email = (0, _get3.default)(options, 'email');
    var phone = (0, _get3.default)(options, 'phone');
    var confirm = (0, _get3.default)(options, 'confirm');
    var otp = (0, _get3.default)(options, 'otp');
    var id = (0, _get3.default)(options, 'id');
    var hash = (0, _get3.default)(options, 'hash');
    var gender = (0, _get3.default)(options, 'gender');
    var expertise = (0, _get3.default)(options, 'expertise');
    var op = {
        fName: fName,
        lName: lName,
        Captcha: Captcha,
        pContact: pContact,
        pContact_email: pContact_email,
        agreement: agreement,
        password: password,
        email: email,
        phone: phone,
        confirm: confirm,
        otp: otp,
        id: id,
        hash: hash,
        gender: gender,
        expertise: expertise
    };
    var s = (0, _applyLock.applyLock)(op, key, iv);

    var fName_e = (0, _get3.default)(s, 'fName');
    var lName_e = (0, _get3.default)(s, 'lName');
    var Captcha_e = (0, _get3.default)(s, 'Captcha');
    var pContact_e = (0, _get3.default)(s, 'pContact');
    var pContact_email_e = (0, _get3.default)(s, 'pContact_email');
    var agreement_e = (0, _get3.default)(s, 'agreement');
    var password_e = (0, _get3.default)(s, 'password');
    var email_e = (0, _get3.default)(s, 'email');
    var phone_e = (0, _get3.default)(s, 'phone');
    var confirm_e = (0, _get3.default)(s, 'confirm');
    var otp_e = (0, _get3.default)(s, 'otp');
    var id_e = (0, _get3.default)(s, 'id');
    var hash_e = (0, _get3.default)(s, 'hash');
    var gender_e = (0, _get3.default)(s, 'gender');
    var expertise_e = (0, _get3.default)(s, 'expertise');

    (0, _lock2.default)(k, key, email, iv).then(function () {
        _connection2.default.query('INSERT INTO BJS_SIGNUP(id, fName, lName, email, phone, password, captcha, agreement, confirm, pContact, pContact_email, otp, hash, gender, expertise) VALUES(\'' + id_e + '\', \'' + fName_e + '\', \'' + lName_e + '\', \'' + email_e + '\', \'' + phone_e + '\', \'' + password_e + '\', \'' + Captcha_e + '\', \'' + agreement_e + '\', \'' + confirm_e + '\', \'' + pContact_e + '\', \'' + pContact_email_e + '\', \'' + otp_e + '\', \'' + hash_e + '\', \'' + gender_e + '\', \'' + expertise_e + '\')', function (e, r, f) {
            if (!e) {
                var d = {
                    data: "done",
                    token: hash
                };
                res.send(d);
            } else {
                res.status(500);
                res.statusMessage = (0, _stringify2.default)({ error: 'something went wrong trace - ' + error });
                res.send('something went wrong trace - ' + e);
            }
        });
    }).catch(function (e) {
        res.status(500);
        res.statusMessage = (0, _stringify2.default)({ error: 'something went wrong trace - ' + e });
        res.send('something went wrong trace - ' + e);
    });
};

exports.default = addBoth;