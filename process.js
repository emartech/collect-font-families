const { flatten, pipe, map, replace, split } = require('ramda');
const removeWhitespaces = replace(/\s*/gm, '');

module.exports = pipe(
  map(removeWhitespaces),
  map(split(',')),
  flatten
);
