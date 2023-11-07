import _ from 'lodash';
import {
  EntryType, INDENT_SIZE, LABEL_OFFSET, Label, Symbol,
} from '../const.js';

const getPrefix = (level, label = Symbol.SPACE) => `${Symbol.SPACE.repeat(level * INDENT_SIZE - LABEL_OFFSET)}${label} `;

const stringifyValue = (data, level) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }

  const entries = Object.entries(data).map(([key, value]) => (
    `${getPrefix(level + 1)}${key}: ${stringifyValue(value, level + 1)}`
  ));

  return [
    Symbol.OPEN_BRACKET,
    ...entries,
    `${getPrefix(level)}${Symbol.CLOSE_BRACKET}`,
  ].join(Symbol.BREAK);
};

const stringifyEntry = (level, label, key, value) => `${getPrefix(level + 1, label)}${key}: ${stringifyValue(value, level + 1)}`;

const formatAsStylish = (diff) => {
  const iterate = (tree, level = 0) => {
    const result = tree.map((entry) => {
      switch (entry.type) {
        case EntryType.ADDED:
          return stringifyEntry(level, Label.ADDED, entry.key, entry.newValue);
        case EntryType.REMOVED:
          return stringifyEntry(level, Label.REMOVED, entry.key, entry.oldValue);
        case EntryType.CHANGED:
          return [
            stringifyEntry(level, Label.REMOVED, entry.key, entry.oldValue),
            stringifyEntry(level, Label.ADDED, entry.key, entry.newValue),
          ].join('\n');
        case EntryType.UNTOUCHED:
          return stringifyEntry(level, Label.UNTOUCHED, entry.key, entry.oldValue);
        case EntryType.NESTED:
          return stringifyEntry(
            level,
            Label.NESTED,
            entry.key,
            iterate(entry.value, level + 1),
          );
        default:
          throw new Error('Unknown entry type');
      }
    });
    return [
      Symbol.OPEN_BRACKET,
      ...result,
      `${level ? getPrefix(level) : ''}${Symbol.CLOSE_BRACKET}`,
    ].join(Symbol.BREAK);
  };

  return iterate(diff);
};

export default formatAsStylish;
