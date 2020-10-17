'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// import saveOtp from '../../db/connection/mongo/auth/saveOtp';
var twilio = require('twilio');

var accountSid = 'ACd5c338067626f115c9c9ddfc98755b26';
var authToken = 'dad811ff1284b10dd0af334e55317e8d';
var t = Math.floor(1000 + Math.random() * 9000);
var sendOtp = function sendOtp() {
    var to = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '+917416634081';
    var otp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : t;

    // const otp = Math.floor(1000 + Math.random() * 9000);
    var client = new twilio(accountSid, authToken);
    return client.messages.create({
        body: 'your verification code is - ' + otp,
        to: to,
        from: '+13012737412'
    });
};

/**
 * 
 * 
 * meeweeAuth
 * Bhfqz6w3BCPSTLHredtPIYJG8YkU0ZHWur9ctUFAnlEyHNMAoTffH676RAnzGrAo
 */

exports.default = sendOtp;