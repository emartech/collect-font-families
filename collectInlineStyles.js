const fontFinderRegexp = /font-family:\s*([\s\w-,]+)[;"]/gm
const { getMatches } = require('./lib');
const { flatten, pipe, map, replace, split } = require('ramda');
const getFontStyleValues = getMatches(fontFinderRegexp);
const removeWhitespaces = replace(/\s*/gm, '');

module.exports = pipe(
  getFontStyleValues,
  map(removeWhitespaces),
  map(split(',')),
  flatten
);
