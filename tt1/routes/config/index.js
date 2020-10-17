'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var appRoutes = [{
    name: '/login',
    handler: LoginHandler
}, {
    name: '/register',
    handler: LoginHandler
}, {
    name: '/token',
    handler: LoginHandler
}];

exports.default = {
    appRoutes: appRoutes
};