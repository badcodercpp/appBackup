const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'remotemysql.com',
  user     : 'mRbw5S83aw',
  password : 'WYyAzmQcj7',
  database : 'mRbw5S83aw'
});

export default connection;
 