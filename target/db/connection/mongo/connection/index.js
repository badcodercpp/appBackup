import MongoClient from '../index';
import _isEmpty from 'lodash';
import { MONGO } from '../config';

export const connect = (url = MONGO.URI) => {
    const connection = new Promise((resolve, reject) => {
        MongoClient.connect(url, function(err, client) {
            if (!_isEmpty(err)) {
                reject(err);
            }
            resolve(client);
        });
    });
    return connection;
};
