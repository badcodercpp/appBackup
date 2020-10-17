import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _head from 'lodash/head';
import connection from '../../db/connection';
// import { applyLock } from './lock/applyLock';

const checkIfUserExists = (email, phone, key) => {
    const user = {
        exist: false,
        id: null
    };
    // const u = {
    //     email, 
    //     phone, 
    // };
    
    // const d = applyLock(u, key);
    // const email_enc = _get(d, 'email');
    // const phone_enc = _get(d, 'phone');
    const userPromise = new Promise((resolve, reject) => {
        connection.query(`SELECT BjsKey, Hash FROM BJS_Lock WHERE email='${email}'`, function (error, results, fields) {
            if (!error) {
                const data = _head(JSON.parse(JSON.stringify(results)));
                const id = _get(data, 'BjsKey');
                if (_isEmpty(id)) {
                    connection.query(`SELECT BjsKey, Hash FROM BJS_Lock WHERE BjsKey='${phone}'`, function (error, results, fields) {
                        if (!error) {
                            const data = _head(JSON.parse(JSON.stringify(results)));
                            const id_phone = _get(data, 'BjsKey');
                            if (_isEmpty(id_phone)) {
                                user.exist = false;
                                user.id = null;
                                resolve(user)
                            } else {
                                user.exist = true;
                                user.id = id_phone;
                                reject(user);
                            }
                        } else {
                            reject({error});
                        }
                    });
                } else {
                    user.exist = true;
                    user.id = id;
                    reject(user);
                }
            } else {
                reject({error});
            }
        });
    });
    return userPromise;
}

export default checkIfUserExists;
