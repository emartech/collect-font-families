const fontFinderRegexp = /@font-face[\s\S]*font-family:['"\s]*([\s\w-,]+)[;"']/gm
const { getMatches } = require('./lib');
const { flatten, pipe } = require('ramda');
const getFontStyleValues = getMatches(fontFinderRegexp);

module.exports = pipe(
  getFontStyleValues,
  flatten
);