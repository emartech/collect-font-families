"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var collectors_1 = require("./collectors");
var ramda_1 = require("ramda");
exports.collectFontFamilies = ramda_1.pipe(ramda_1.juxt([collectors_1.collectFromFontFaces, collectors_1.collectFromGoogleFontLinks]), ramda_1.flatten, ramda_1.sortBy(ramda_1.identity), ramda_1.uniq);
//# sourceMappingURL=index.js.map