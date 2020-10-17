import connection from '../../../db/connection';
import _get from 'lodash/get';
import _head from 'lodash/head';

const lock = (key) => {
    const promise = new Promise((resolve, reject) => {
        connection.query(`INSERT INTO BJS_Lock(BjsKey, Hash) VALUES('${key}', '${key}')`, function (e, r, f) {
            if (!e) {
                const d = {
                    data: "done",
                    token: key
                };
                resolve(d);
            } else {
                reject(`something went wrong trace - ${e}`)
            }
        });
    })
    return promise;
}

export default lock;