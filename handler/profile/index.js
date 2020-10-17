import connection from '../../db/connection';

const doGetProfile = (req, res) => {
    const parsedBody = req.params || {};
    const id = _get(parsedBody, 'id');
    // connection.connect()
    connection.query(`SELECT * FROM BJS_SIGNUP WHERE id='${id}'`, function (error, results, fields) {
        if (!error) {
            res.send(results);
            console.log('The solution is: ', results);
        } else {
            res.status(500);
            res.statusMessage = JSON.stringify({error: `something went wrong trace - ${error}`});
            res.send(`something went wrong trace - ${error}`);
        }
    });
    // connection.end();
}

export default doGetProfile;