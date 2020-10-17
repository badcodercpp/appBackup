'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// import saveOtp from '../../db/connection/mongo/auth/saveOtp';
var twilio = require('twilio');

var accountSid = 'ACd5c338067626f115c9c9ddfc98755b26';
var authToken = 'c970388b6285539457498c69c1c645fe';
var t = Math.floor(1000 + Math.random() * 9000);
var sendOtp = function sendOtp() {
    var to1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '7416634081';
    var to = "+91" + to1;
    var otp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : t;

    // const otp = Math.floor(1000 + Math.random() * 9000);
    var client = new twilio(accountSid, authToken);
    return client.messages.create({
        //body: '<#> Your WeInd app verification code is: ' + otp + '\n/kIr67jpLp2t',//for prod
        body: '<#> Your WeInd app verification code is: ' + otp + '\nAXk6NSxZZzv',
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