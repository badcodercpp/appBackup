import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { config } from '../crypto/config';
export const getKeys = (options = {}) => {
    const phone = _get(options, 'phone');
    const email = _get(options, 'email');
    if (!_isEmpty(phone) && !_isEmpty(email)) {
        return phone;
    } else if (!_isEmpty(phone) && _isEmpty(email)) {
        return phone;
    } else if (_isEmpty(phone) && !_isEmpty(email)) {
        return email;
    } else {
        config.key
    }
};
