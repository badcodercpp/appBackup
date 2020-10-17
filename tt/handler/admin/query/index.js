'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _connection = require('../../../db/connection');

var _connection2 = _interopRequireDefault(_connection);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var doAdminStuffs = function doAdminStuffs(req, res) {
    var parsedBody = req.body;
    var query = (0, _get3.default)(parsedBody, 'query', {}) || {};
    console.log("query", parsedBody);
    // connection.connect()
    _connection2.default.query(query, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
    });
    // connection.end();
    console.log("req body", parsedBody);
    res.send("done");
};

exports.default = doAdminStuffs;