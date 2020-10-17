'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var crypto = require('crypto');

var key = exports.key = crypto.randomBytes(32).toString('hex');
var iv = exports.iv = crypto.randomBytes(16).toString('hex');

exports.default = {
    key: key,
    iv: iv
};