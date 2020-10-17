const user = encodeURIComponent('badcoder');
const password = encodeURIComponent('Aj@yjh@93');
const authMechanism = 'DEFAULT';

export const MONGO = {
    URI: `mongodb://localhost:27017`,
    DB: 'badDb',
    COLLECTION: {
        login: 'login',
        signUp: 'signup',
        bad: 'bad',
        badCollection: 'badCollection',
    }
}

export const MEEWEE = {
    URI: `mongodb://localhost:27017`,
    DB: 'meewee',
    COLLECTION: {
        bad: 'bad',
    }
}