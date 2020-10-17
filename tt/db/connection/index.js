'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'mRbw5S83aw',
  password: 'WYyAzmQcj7',
  database: 'mRbw5S83aw'
});

exports.default = connection;