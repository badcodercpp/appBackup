import _get from 'lodash/get';

export const jsonFormatter = (formatString, keys, accessor) => {
    const jsonObject = formatString || {};
    const keyClone = { ...keys };
    const names = Object.keys(keyClone);
    const data = _get(jsonObject, accessor, []) || [];
    console.log(data, accessor)
    const formattedData = data.map( (d = {}, i) => {
        const obj = {}
        names.forEach((n, i) => {
            obj[n] = _get(d, [i])
        })
        console.log(obj)
        return obj;
    } );
    const formatedObject = {
        data: formattedData
    };
    return formatedObject;
}