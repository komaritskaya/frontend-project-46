import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import getDiff from './diff.js';
import format from './formatters/index.js';

const getFilePath = (filepath) => path.resolve(process.cwd(), filepath);

const getFileExtension = (filepath) => path.extname(filepath).slice(1);

const getFileData = (filepath) => fs.readFileSync(getFilePath(filepath));

const gendiff = (filepath1, filepath2, formatType) => {
  const firstFileData = parse(getFileData(filepath1), getFileExtension(filepath1));
  const secondFileData = parse(getFileData(filepath2), getFileExtension(filepath2));
  return format(getDiff(firstFileData, secondFileData), formatType);
};

export default gendiff;
