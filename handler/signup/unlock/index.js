import connection from '../../../db/connection';
import _get from 'lodash/get';
import _head from 'lodash/head';

const unlock = (options = {}) => {
    const promise = new Promise((resolve, reject) => {
        const email = _get(options, 'email');
        const phone = _get(options, 'phone')
        connection.query(`SELECT BjsKey, Hash FROM BJS_Lock WHERE BjsKey='${email}' OR BjsKey='${phone}'`, function (e, r, f) {
            if (!e) {
                const data = _head(JSON.parse(JSON.stringify(r)));
                const hash = _get(data, 'hash');
                resolve(hash);
            } else {
                reject(`something went wrong trace - ${e}`)
            }
        });
    })
    return promise;
}

export default unlock;