import connection from '../../db/connection';
import _get from 'lodash/get';
import _head from 'lodash/head';
import _isEqual from 'lodash/isEqual';

const doQueryPost = (req, res) => {
    const parsedBody = req.body || {};
    const phone = _get(parsedBody, 'phone');
    const auth = _get(parsedBody, 'password');
    // connection.connect()
    connection.query(`SELECT password, id FROM BJS_SIGNUP WHERE email='${phone}' OR phone='${phone}'`, function (error, results, fields) {
        if (!error) {
            const data = _head(JSON.parse(JSON.stringify(results)));
            const password = _get(data, 'password');
            const id = _get(data, 'id')
            if (_isEqual(password, auth)) {
                res.status(200);
                res.send({id, status: 'done'});
            }
            console.log('The solution is: ', JSON.parse(JSON.stringify(results)));
        } else {
            res.status(500);
            res.statusMessage = JSON.stringify({error: `something went wrong trace - ${error}`});
            res.send(`something went wrong trace - ${error}`);
        }
    });
    // connection.end();
}

export default doQueryPost;