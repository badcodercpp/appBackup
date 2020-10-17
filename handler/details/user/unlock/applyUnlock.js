import { decrypt } from '../../../../cryptoNode/exports';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
export const applyUnock = (options = {}, target, iv) => {
    const optionsKeys = Object.keys(options);
    const unlocked = {};
    optionsKeys.forEach( (key) => {
        if (!_isEmpty(key) && !_isEmpty(_get(options, [key]))) {
            unlocked[key] = decrypt(_get(options, [key]), target, iv);
        }
    } );
    return unlocked;
}
