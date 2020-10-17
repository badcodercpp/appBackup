import _pickBy from 'lodash/pickBy';
import _identity from 'lodash/identity';

function identity(obj){
    return _pickBy(obj, _identity);
};

export {
    identity
}