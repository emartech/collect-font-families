import * as matchAll from 'match-all';
const fontStyleValuesRegexp = /@font-face[\s]*{[\s\w:;-]*font-family:['"`\s]*([\s\w-,]*)[;"'`]/gmi;
import { uniq } from 'ramda';

export const collectFromFontFaces = (html: string) => uniq(matchAll(html, fontStyleValuesRegexp).toArray());
