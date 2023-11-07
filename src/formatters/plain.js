import _ from 'lodash';
import { EntryType, Symbol } from '../const.js';

const stringifyValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return String(value);
};

const formatAsPlain = (diff) => {
  const iterate = (entries, path) => entries
    .filter((entry) => entry.type !== EntryType.UNTOUCHED)
    .map((entry) => {
      const fullPath = path ? `${path}.${entry.key}` : `${entry.key}`;

      switch (entry.type) {
        case EntryType.NESTED:
          return iterate(entry.value, fullPath);
        case EntryType.REMOVED:
          return `Property '${fullPath}' was removed`;
        case EntryType.ADDED:
          return `Property '${fullPath}' was added with value: ${stringifyValue(entry.newValue)}`;
        case EntryType.CHANGED:
          return `Property '${fullPath}' was updated. From ${stringifyValue(entry.oldValue)} to ${stringifyValue(entry.newValue)}`;
        default:
          throw new Error('Unknown entry type');
      }
    })
    .join(Symbol.BREAK);

  return iterate(diff);
};

export default formatAsPlain;
