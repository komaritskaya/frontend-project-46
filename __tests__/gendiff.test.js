/* eslint-disable no-undef */
import url from 'url';
import path from 'path';
import fs from 'fs';
import gendiff from '../index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each(['json', 'yml'])('diff should match the expected result', (extension) => {
  const file1 = getFixturePath(`file1.${extension}`);
  const file2 = getFixturePath(`file2.${extension}`);

  const stylishResult = readFile('expected-stylish.txt');
  const plainResult = readFile('expected-plain.txt');
  const jsonResult = readFile('expected-json.txt');

  expect(gendiff(file1, file2)).toEqual(stylishResult);
  expect(gendiff(file1, file2, 'stylish')).toEqual(stylishResult);
  expect(gendiff(file1, file2, 'plain')).toEqual(plainResult);
  expect(gendiff(file1, file2, 'json')).toEqual(jsonResult);
});

test('should throw a parsing error for incorrect extension', () => {
  const file1 = getFixturePath('file1.txt');
  const file2 = getFixturePath('file2.json');

  const checkParse = () => gendiff(file1, file2);
  const error = new Error('Unknown file extension');

  expect(checkParse).toThrow(error);
});

test('should throw a formatting error for incorrect format', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  const checkFormat = () => gendiff(file1, file2, 'format');
  const error = new Error('Unknown format');

  expect(checkFormat).toThrow(error);
});
