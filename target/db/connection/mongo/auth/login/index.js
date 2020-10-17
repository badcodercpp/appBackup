
import { MONGO } from '../../config';
import { DB_ERROR } from '../../dbError'
import { connect } from '../../connection';
import { isExistingUser } from '../isExisting';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isEqual from 'lodash/isEqual';
import { getJwtToken } from '../jwt';
import { withUserAgent } from '../userAgent';

export const doLogin = (payload, req, res) => {
    const dbName = MONGO.DB;
    const userLoginPromise = new Promise((res, rej) => {
        connect().then(async (client) => {
            const db = client.db(dbName);
            const collection = db.collection(MONGO.COLLECTION.badCollection);
            const payloadWithEmail = { email: _isEmpty(_get(payload, 'email')) ? '' : _get(payload, 'email') };
            const isExisting = await isExistingUser(collection, payloadWithEmail, client);
            let userData, isExistingUsers;
            if (!isExisting) {
                const payloadWithMobile = { mobile: _isEmpty(_get(payload, 'mobile')) ? '' : _get(payload, 'mobile') };
                const isExistingMobile = await isExistingUser(collection, payloadWithMobile, client);
                isExistingUsers = _get(isExistingMobile, 'status');
                userData = _get(isExistingMobile, 'data');
            } else {
                isExistingUsers = _get(isExisting, 'status');
                userData = _get(isExisting, 'data');
            }
            if (!isExistingUsers) {
                rej({ error: DB_ERROR.GENERIC })
            }
            const userPassword  = _get(payload, 'password');
            const password = _get(userData, 'password')
            if (_isEqual(userPassword, password)) {
                const payloadWithUserAgent = withUserAgent(req, res, payload);
                const token = getJwtToken(payloadWithUserAgent)
                if (!_isEmpty(token)) {
                    res(token);
                } else {
                    rej({ error: DB_ERROR.GENERIC })
                }
            } else {
                rej({ error: DB_ERROR.GENERIC })
            }
        }).catch((err) => {
            rej({ error: err })
        })
    })
    return userLoginPromise;
}