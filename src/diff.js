import _ from 'lodash';
import { EntryType } from './const.js';

const getDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return keys.map((key) => {
    if (!Object.prototype.hasOwnProperty.call(data1, key)) {
      return {
        key, type: EntryType.ADDED, oldValue: null, newValue: data2[key],
      };
    }
    if (!Object.prototype.hasOwnProperty.call(data2, key)) {
      return {
        key, type: EntryType.REMOVED, oldValue: data1[key], newValue: null,
      };
    }
    if (data1[key] === data2[key]) {
      return {
        key, type: EntryType.UNTOUCHED, oldValue: data1[key], newValue: data2[key],
      };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, type: EntryType.NESTED, value: getDiff(data1[key], data2[key]) };
    }
    return {
      key, type: EntryType.CHANGED, oldValue: data1[key], newValue: data2[key],
    };
  });
};

export default getDiff;
