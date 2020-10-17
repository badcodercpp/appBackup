'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _connection = require('../../db/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var doSearch = function doSearch(req, res) {
    var parsedBody = req.body;
    // connection.connect()
    _connection2.default.query('SELECT * FROM BJS_LOGIN', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
    });
    // connection.end();
    console.log("req body", parsedBody);
    res.send("done");
};

exports.default = doSearch;