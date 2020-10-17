"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.encrypt = encrypt;
exports.decrypt = decrypt;

var _config = require("../config");

var CryptoJS = require("crypto-js");

function encrypt(cypherText) {
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _config.config.key;

    var keyutf = CryptoJS.enc.Utf8.parse(key);
    var iv = CryptoJS.enc.Base64.parse(key);
    var enc = CryptoJS.AES.encrypt(cypherText, keyutf, { iv: iv });
    var encStr = enc.toString();

    // const encrypted =  CryptoJS.AES.encrypt(cypherText, key);
    // return encrypted.toString();
    return encStr;
}

function decrypt(cypher) {
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _config.config.key;

    var keyutf = CryptoJS.enc.Utf8.parse(key);
    var iv = CryptoJS.enc.Base64.parse(key);
    var dec = CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Base64.parse(cypher) }, keyutf, {
        iv: iv
    });
    var decStr = CryptoJS.enc.Utf8.stringify(dec);

    // const bytes  = CryptoJS.AES.decrypt(cypher, key);
    // return bytes.toString(CryptoJS.enc.Utf8);
    return decStr;
}