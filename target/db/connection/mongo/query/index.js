import _noop from 'lodash/noop';
import _isEmpty from 'lodash/isEmpty';
import { DB_ERROR } from '../dbError';

const closeUnusedConnection = (client, keepOpen) => {
    if (keepOpen) {
        return client.close();
    }
    return null;
}

export const queryExecuter = (collection = {}, Query, client, payload = [], keepOpen = false) => {
    const p = new Promise(async (resolve, reject) => {
        const data = await (collection[Query] || _noop).apply(collection, payload);
        console.log("query daat", data)
        closeUnusedConnection(client, keepOpen);
        resolve(data);
    });
    return p;
};
