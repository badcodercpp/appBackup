import { encrypt } from '../../../crypto/exports';
import _isEmpty from 'lodash/isEmpty';
export const applyLock = (options = {}, target) => {
    const optionsKeys = Object.keys(options);
    const locked = {};
    optionsKeys.forEach( (key) => {
        if (!_isEmpty(key)) {
            locked[key] = encrypt(key, target);
        }
    } );
    return locked;
}
