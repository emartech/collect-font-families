const matchAll = require("match-all");
const fontStyleValuesRegexp = /@font-face[\s]*{[\s\w:;-]*font-family:['"\s]*([\s\w-,]*)[;"']/gm

export const collectFromFontFaces = (html: string) => matchAll(html, fontStyleValuesRegexp).toArray();
