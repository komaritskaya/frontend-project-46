import { Format } from '../const.js';
import formatAsPlain from './plain.js';
import formatAsStylish from './stylish.js';

const format = (diff, formatName = Format.STYLISH) => {
  switch (formatName) {
    case Format.PLAIN:
      return formatAsPlain(diff);
    case Format.JSON:
      return JSON.stringify(diff);
    case Format.STYLISH:
      return formatAsStylish(diff);
    default:
      throw new Error('Unknown format');
  }
};

export default format;
