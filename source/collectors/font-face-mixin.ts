import { getMatches } from '../lib';
import { flatten, pipe } from 'ramda';

const fontStyleValuesRegexp = /@font-face[\s\S]*font-family:['"\s]*([\s\w-,]+)[;"']/gm

export const fontFaceCollector = getMatches(fontStyleValuesRegexp);
