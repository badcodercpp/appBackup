'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkToken = undefined;

var _exports = require('../../crypto/exports');

var jwt = require('jsonwebtoken');

var checkToken = exports.checkToken = function checkToken(req, res, next) {
  var token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
    try {
      token = (0, _exports.decrypt)(token);
    } catch (error) {
      res.status(401);
      return res.json({
        success: false,
        message: 'Token is not valid'
      });
    }
  }
  if (token) {
    jwt.verify(token, 'kashish', function (err, decoded) {
      if (err) {
        res.status(401);
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403);
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

exports.default = checkToken;