'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.encrypt = encrypt;
exports.decrypt = decrypt;
/* eslint-disable no-unused-vars */

// import  { config } from '../config';
var crypto = require('crypto');
var algorithm = 'aes-256-cbc';
var charType = 'hex';
// const key = crypto.randomBytes(32);
// const iv = crypto.randomBytes(16);

function encrypt(text, key, iv) {
    var algo = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : algorithm;
    var charT = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : charType;

    console.log("algorithm", algo, key, iv, charT);
    var cipher = crypto.createCipheriv(algo, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    var encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {
        iv: iv.toString(),
        encryptedData: encrypted.toString(charT),
        key: key.toString()
    };
}

function decrypt(text, key, Iv) {
    var algo = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : algorithm;
    var charT = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : charType;

    var iv = Buffer.from(Iv, charT);
    var encryptedText = Buffer.from(text, charT);
    var decipher = crypto.createDecipheriv(algo, Buffer.from(key), iv);
    var decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}