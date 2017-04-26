const test = require('tape');
const fontFinder = require('./process');

test('should give back empty array for empty array', (t) => {
  t.deepEqual(fontFinder([]), []);
  t.end();
});

test('should give back the font name for single font value', (t) => {
  t.deepEqual(fontFinder(['Roboto']), ['Roboto']);
  t.end();
});

test('should give back multiple font name separated by comma', (t) => {
  t.deepEqual(fontFinder(['Roboto,Arial']), ['Roboto', 'Arial']);
  t.end();
});

test('should ignore whitespaces', (t) => {
  t.deepEqual(fontFinder(['Roboto, Arial']), ['Roboto', 'Arial']);
  t.end();
});

test('should work with multiple strings given', (t) => {
  t.deepEqual(fontFinder(['Roboto, Arial', 'Lato']), ['Roboto', 'Arial', 'Lato']);
  t.end();
});
