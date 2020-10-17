import connection from '../../../db/connection';
import _get from 'lodash/get';
import _head from 'lodash/head';

const lock = (k, key, email, iv) => {
    const promise = new Promise((resolve, reject) => {
        connection.query(`INSERT INTO BJS_Lock(BjsKey, Hash, Email, iv) VALUES('${k}', '${key}', '${email}', '${iv}')`, function (e, r, f) {
            if (!e) {
                const d = {
                    data: "done",
                    key, 
                    email, 
                    iv
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