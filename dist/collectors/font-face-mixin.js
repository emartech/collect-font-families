"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matchAll = require("match-all");
var fontStyleValuesRegexp = /@font-face[\s]*{[\s\w:;-]*font-family:['"\s]*([\s\w-,]*)[;"']/gm;
exports.collectFromFontFaces = function (html) { return matchAll(html, fontStyleValuesRegexp).toArray(); };
//# sourceMappingURL=font-face-mixin.js.map