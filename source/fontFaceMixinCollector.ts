import { getMatches } from './lib';
import { flatten, pipe } from 'ramda';

const fontFinderRegexp = /@font-face[\s\S]*font-family:['"\s]*([\s\w-,]+)[;"']/gm
const getFontStyleValues = getMatches(fontFinderRegexp);

export const fontFinder = pipe(
  getFontStyleValues,
  flatten
);
