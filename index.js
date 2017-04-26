'use strict';

const cheerio = require('cheerio')
const { pipe, filter, path, contains, map, head, replace, split, tap, last } = require('ramda');

const googleFontUrl = '//fonts.googleapis.com/css';
const getLinkNodes = html => cheerio.load(html)('link').toArray();
const hasGoogleFontUrlInHref = pipe(
  path(['attribs', 'href']),
  contains(googleFontUrl)
);

const getFamily = pipe(
  split('family='),
  last,
  split(':'),
  head,
  split('&'),
  head,
  replace(/\+/g, ' ')
)

module.exports = pipe(
  getLinkNodes,
  filter(hasGoogleFontUrlInHref),
  map(path(['attribs', 'href'])),
  map(getFamily)
);
