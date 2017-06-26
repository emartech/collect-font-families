import * as matchAll from 'match-all';
const fontStyleValuesRegexp = /@font-face[\s]*{[\s\w:;-]*font-family:['"\s]*([\s\w-,]*)[;"']/gmi;

export const collectFromFontFaces = (html: string) => matchAll(html, fontStyleValuesRegexp).toArray();
