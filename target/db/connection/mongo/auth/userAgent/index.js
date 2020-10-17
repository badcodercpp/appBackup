import _get from 'lodash/get';

export const withUserAgent = (req, res, data = {}) => {
    const useragent = _get(req, 'useragent') || {};
    return { ...useragent, ...data };
}
