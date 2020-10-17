import _isFunction from 'lodash/isFunction';
import _isEmpty from 'lodash/isEmpty';
const jwt = require('jsonwebtoken');

export const getJwtToken = (data) => {
    const jwtEncodePromise = new Promise((resolve, reject) => {
        const signature = jwt.sign(data, 'kashish');
        if (!_isEmpty(signature)) {
            resolve(signature)
        } else {
            reject({err: 'something went wrong'})
        }
    })
    return jwtEncodePromise;
}

export const decodeJwtToken = (token) => {
    const decodeJwtPromise = new Promise((resolve, reject) => {
        jwt.verify(token, 'kashish', (err, decoded) => {
            if (!_isEmpty(err)) {
                reject({ error: err })
            } else {
                resolve(decoded)
            }
        });
    })
    return decodeJwtPromise;
}
