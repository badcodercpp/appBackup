import connection from '../../db/connection';
import _get from 'lodash/get';
import _head from 'lodash/head';
import { jsonFormatter } from '../../formatter/json';

const doGetMapData = (req, res) => {
    const parsedBody = req.query;
    const target = _get(parsedBody, 'target', 'bangalore') || 'bangalore';
    console.log(parsedBody)
    let formatedData;
    // connection.connect();
    connection.query('SELECT * FROM BJS_MAPDATA', function (error, results, fields) {
        if (error) throw error;
        console.log(JSON.parse(JSON.stringify(results)))
        const sqlResults = ((_get(_head(JSON.parse(JSON.stringify(results))), [target]) || {})).slice(1, this.length) || '{}';
        console.log(sqlResults, _get(_head(JSON.parse(JSON.stringify(results))), [target]))
        const schema = {
            lat: {},
            lng: {}
        };
        formatedData = jsonFormatter(sqlResults, schema, [0, 'geojson', 'coordinates', 0]);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(formatedData));
    });
    // connection.end();
}

export default doGetMapData;