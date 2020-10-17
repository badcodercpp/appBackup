import _get from 'lodash/get';
import _head from 'lodash/head';
import _isEqual from 'lodash/isEqual';
import _isEmpty from 'lodash/isEmpty';

const doGetUserDetails = (req, res) => {
    const decoded = _get(req, 'decoded', {}) || {};
    
}

export default doGetUserDetails;