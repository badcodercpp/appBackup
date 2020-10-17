'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _connection = require('../../db/connection');

var _connection2 = _interopRequireDefault(_connection);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _head2 = require('lodash/head');

var _head3 = _interopRequireDefault(_head2);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _exports = require('../../cryptoNode/exports');

var _identity = require('../../utils/identity');

var _unlock = require('./unlock');

var _unlock2 = _interopRequireDefault(_unlock);

var _applyLock = require('./lock/applyLock');

var _applyUnlock = require('./unlock/applyUnlock');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwt = require('jsonwebtoken');

var doLogin = function doLogin(req, res) {
    var parsedBody = req.body || {};
    var phone = (0, _get3.default)(parsedBody, 'phone');
    var auth = (0, _get3.default)(parsedBody, 'password');
    var options = {
        phone: phone,
        email: phone,
        auth: auth
    };
    (0, _unlock2.default)(options).then(function (_ref) {
        var hash = _ref.hash,
            iv = _ref.iv;

        console.log(hash, "hash", iv);
        var identityOption = (0, _identity.identity)(options);
        if (!(0, _isEmpty3.default)(hash)) {
            var lockedOption = (0, _applyLock.applyLock)(identityOption, hash, iv);
            var ph = (0, _get3.default)(lockedOption, 'phone');
            var authentication = (0, _get3.default)(lockedOption, 'auth');
            _connection2.default.query('SELECT password, id, fName, lName, phone, email, gender, expertise, otp,  confirm, Highest_Qualification, Course, Specialization, Passsing_Year, Skills,  Profile_Img, Captcha, pContact, pcontact_email, agreement, Hash  FROM BJS_SIGNUP WHERE email=\'' + ph + '\' OR phone=\'' + ph + '\'', function (error, results, fields) {
                if (!error) {
                    var data = (0, _head3.default)(JSON.parse(JSON.stringify(results)));
                    var password = (0, _get3.default)(data, 'password');
                    var id = (0, _get3.default)(data, 'id');
                    var fName = (0, _get3.default)(data, 'fName');
                    var lName = (0, _get3.default)(data, 'lName');
                    var _phone = (0, _get3.default)(data, 'phone');
                    var email = (0, _get3.default)(data, 'email');
                    var gender = (0, _get3.default)(data, 'gender');
                    var expertise = (0, _get3.default)(data, 'expertise');
                    var otp = (0, _get3.default)(data, 'otp');
                    var confirm = (0, _get3.default)(data, 'confirm');
                    var Highest_Qualification = (0, _get3.default)(data, 'Highest_Qualification');
                    var Course = (0, _get3.default)(data, 'Course');
                    var Specialization = (0, _get3.default)(data, 'Specialization');
                    var Passsing_Year = (0, _get3.default)(data, 'Passsing_Year');
                    var Skills = (0, _get3.default)(data, 'Skills');
                    var Profile_Img = (0, _get3.default)(data, 'Profile_Img');
                    var Captcha = (0, _get3.default)(data, 'Captcha');
                    var pContact = (0, _get3.default)(data, 'pContact');
                    var pcontact_email = (0, _get3.default)(data, 'pcontact_email');
                    var agreement = (0, _get3.default)(data, 'agreement');
                    var Hash = (0, _get3.default)(data, 'Hash');

                    // const k = Buffer.from(d.key, 'hex');
                    // const i = Buffer.from(d.iv, 'hex');
                    // const dt = d.encryptedData;
                    // const e = decrypt(dt, k, i);
                    // console.log("e")
                    // console.log(e)

                    // console.log("password is ", password, authentication, decrypt(password, hash));
                    if ((0, _isEqual3.default)(password, authentication)) {
                        var resp = {
                            id: id,
                            fName: fName,
                            lName: lName,
                            phone: _phone,
                            email: email,
                            gender: gender,
                            expertise: expertise,
                            otp: otp,
                            confirm: confirm,
                            Highest_Qualification: Highest_Qualification,
                            Course: Course,
                            Specialization: Specialization,
                            Passsing_Year: Passsing_Year,
                            Skills: Skills,
                            Profile_Img: Profile_Img,
                            Captcha: Captcha,
                            pContact: pContact,
                            pcontact_email: pcontact_email,
                            agreement: agreement,
                            Hash: Hash
                        };
                        console.log("resp", resp);
                        var unlockedResp = (0, _applyUnlock.applyUnock)(resp, hash, iv);
                        var respData = (0, _identity.identity)(unlockedResp);
                        console.log(respData);
                        var useragent = (0, _get3.default)(req, 'useragent', {}) || {};
                        var respWithUserAgent = _extends({}, respData, useragent);
                        var token = jwt.sign(respWithUserAgent, 'kashish');
                        // const encryptedToken = encrypt(token, hash, iv);
                        // console.log("encryptedToken", encryptedToken)
                        var respAuth = {
                            success: true,
                            message: 'Authentication successful!',
                            token: token
                        };
                        res.status(200);
                        res.send(respAuth);
                    } else {
                        res.status(401);
                        res.statusMessage = JSON.stringify({ error: 'Authentication failed' });
                        res.send('Authentication failed');
                    }
                    console.log('The solution is: ', JSON.parse(JSON.stringify(results)));
                } else {
                    res.status(500);
                    res.statusMessage = JSON.stringify({ error: 'something went wrong trace - ' + error });
                    res.send('something went wrong trace - ' + error);
                }
            });
        } else {
            res.status(500);
            res.statusMessage = JSON.stringify({ error: 'User don\'t exist' });
            res.send('something went wrong trace - ');
        }
    });
    //connection.connect()

    // connection.end();
};

exports.default = doLogin;