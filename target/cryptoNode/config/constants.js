const crypto = require('crypto');

export const key = crypto.randomBytes(32).toString('hex');
export const iv = crypto.randomBytes(16).toString('hex');

export default {
    key, 
    iv
}
