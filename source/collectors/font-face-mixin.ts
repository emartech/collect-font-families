import { getMatches } from '../lib';

const fontStyleValuesRegexp = /@font-face[\s]*{[\s\w:;-]*font-family:['"\s]*([\s\w-,]*)[;"']/gm

export const collectFromFontFaces = getMatches(fontStyleValuesRegexp);
