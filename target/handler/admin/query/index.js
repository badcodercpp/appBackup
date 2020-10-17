import connection from '../../../db/connection';
import _get from 'lodash/get';
const doAdminStuffs = (req, res) => {
    const parsedBody = req.body;
    const query =  _get(parsedBody, 'query', {}) || {};
    console.log("query", parsedBody)
    // connection.connect()
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
    });
    // connection.end();
    console.log("req body", parsedBody);
    res.send("done");
}

export default doAdminStuffs;