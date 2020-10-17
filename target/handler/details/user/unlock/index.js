import connection from '../../../db/connection';
import _get from 'lodash/get';
import _head from 'lodash/head';

const unlock = (options = {}) => {
    const promise = new Promise((resolve, reject) => {
        const email = _get(options, 'email');
        const phone = _get(options, 'phone')
        connection.query(`SELECT BjsKey, Hash, iv FROM BJS_Lock WHERE BjsKey='${phone}' OR Email='${email}'`, function (e, r, f) {
            if (!e) {
                const data = _head(JSON.parse(JSON.stringify(r)));
                console.log(r)
                const hash = _get(data, 'Hash');
                const iv = _get(data, 'iv');
                resolve({hash, iv});
            } else {
                reject(`something went wrong trace - ${e}`)
            }
        });
    })
    return promise;
}

export default unlock;