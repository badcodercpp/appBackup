
import { MONGO } from '../../config';
import { DB_ERROR } from '../../dbError'
import { queryExecuter } from '../../query';
import { connect } from '../../connection';
import { isExistingUser } from '../isExisting';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

export const doSignUp = (payload) => {
    const dbName = MONGO.DB;
    console.log("payload", payload)
    const userSignupPromise = new Promise((res, rej) => {
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
            console.log("isExistingUser", isExistingUsers, userData)
            if (isExistingUsers) {
                rej({ error: DB_ERROR.GENERIC })
            } else {
                const data = await queryExecuter(collection, 'insertOne', client, [payload], true);
                console.log("this is data", data)
                if (!_isEmpty(data)) {
                    res(payload);
                } else {
                    rej({ error: DB_ERROR.GENERIC })
                }
            }
        }).catch((err) => {
            rej({ error: err })
        })
    })
    return userSignupPromise;
}