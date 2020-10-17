import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';

import _filter from 'lodash/filter';
import _includes from 'lodash/includes';
import _split from 'lodash/split';
import _toLower from 'lodash/toLower'

const customConfig = {
  dictionaries: [adjectives, colors],
  separator: '-',
  length: 2,
};

const name  = [
    "manmohan",
    "jha"
]

const state = [
    'tamilnadu',
    'karnataka',
    'bihar'
]

const fruits = [
    'mango',
    'apple'
]

const last = [
    'wala',
]

const getDictionary = (name = '', f, a) => {
    const names = _split(name, ' ')
    const firstLetter = name[0];
    const targetFruits = _filter(f, (fruit) => {
        if (_includes(_toLower(fruit), _toLower(firstLetter))) {
            return true;
        }
        return  false
    })
    return [
        a, targetFruits, names
    ]
}
 
const randomName = uniqueNamesGenerator({
  dictionaries: getDictionary('Manmohan Prakash', fruits, adjectives),
  length: 3,
}); 
console.log("randomName", randomName)