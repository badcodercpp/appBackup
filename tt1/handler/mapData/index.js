'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _connection = require('../../db/connection');

var _connection2 = _interopRequireDefault(_connection);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _head2 = require('lodash/head');

var _head3 = _interopRequireDefault(_head2);

var _json = require('../../formatter/json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var doGetMapData = function doGetMapData(req, res) {
    var parsedBody = req.query;
    var target = (0, _get3.default)(parsedBody, 'target', 'bangalore') || 'bangalore';
    console.log(parsedBody);
    var formatedData = void 0;
    // connection.connect();
    _connection2.default.query('SELECT * FROM BJS_MAPDATA', function (error, results, fields) {
        if (error) throw error;
        console.log(JSON.parse((0, _stringify2.default)(results)));
        var sqlResults = ((0, _get3.default)((0, _head3.default)(JSON.parse((0, _stringify2.default)(results))), [target]) || {}).slice(1, this.length) || '{}';
        console.log(sqlResults, (0, _get3.default)((0, _head3.default)(JSON.parse((0, _stringify2.default)(results))), [target]));
        var schema = {
            lat: {},
            lng: {}
        };
        formatedData = (0, _json.jsonFormatter)(sqlResults, schema, [0, 'geojson', 'coordinates', 0]);
        res.setHeader('Content-Type', 'application/json');
        res.send((0, _stringify2.default)(formatedData));
    });
    // connection.end();
};

exports.default = doGetMapData;