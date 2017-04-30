"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio = require("cheerio");
var ramda_1 = require("ramda");
var googleFontUrl = '//fonts.googleapis.com/css';
var normalize = ramda_1.replace(/\+/g, ' ');
var getLinkNodes = function (html) { return cheerio.load(html)('link').toArray(); };
var hasGoogleFontUrlInHref = ramda_1.pipe(ramda_1.path(['attribs', 'href']), ramda_1.contains(googleFontUrl));
var getAfter = function (separator) { return function (str) { return ramda_1.last(ramda_1.split(separator, str)); }; };
var getBefore = function (separator) { return function (str) { return ramda_1.head(ramda_1.split(separator, str)); }; };
var getFamily = ramda_1.pipe(getAfter('family='), getBefore(':'), getBefore('&'), normalize);
exports.collectFromGoogleFontLinks = ramda_1.pipe(getLinkNodes, ramda_1.filter(hasGoogleFontUrlInHref), ramda_1.map(ramda_1.path(['attribs', 'href'])), ramda_1.map(getFamily));
//# sourceMappingURL=google-font-link.js.map