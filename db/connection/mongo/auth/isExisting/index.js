import _filter from 'lodash/filter';
import _isEmpty from 'lodash/isEmpty';
import { queryExecuter } from '../../query';
export const isExistingUser = async (collection, searchQuery, client) => {
    const data = await queryExecuter(collection, 'findOne', client, [searchQuery]);
    console.log("isExisting data", data)
    const status = (_filter([data], elem => !_isEmpty(elem)).length) > 0
    return {
        status,
        data
    };
}