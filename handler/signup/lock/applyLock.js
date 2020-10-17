import { encrypt } from '../../../cryptoNode/exports';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
export const applyLock = (options = {}, target, iv) => {
    const optionsKeys = Object.keys(options);
    const locked = {};
    optionsKeys.forEach( (key) => {
        if (!_isEmpty(key) && !_isEmpty(_get(options, [key]))) {
            console.log(key, _get(options, [key]))
            locked[key] = _get(encrypt(_get(options, [key]), target, iv), 'encryptedData');
        }
    } );
    return locked;
}
