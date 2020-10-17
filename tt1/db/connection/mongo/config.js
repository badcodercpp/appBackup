'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var user = encodeURIComponent('badcoder');
var password = encodeURIComponent('Aj@yjh@93');
var authMechanism = 'DEFAULT';

var MONGO = exports.MONGO = {
    URI: 'mongodb://localhost:27017',
    DB: 'badDb',
    COLLECTION: {
        login: 'login',
        signUp: 'signup',
        bad: 'bad',
        badCollection: 'badCollection'
    }
};

var MEEWEE = exports.MEEWEE = {
    URI: 'mongodb://localhost:27017',
    DB: 'meewee',
    COLLECTION: {
        bad: 'bad'
    }
};