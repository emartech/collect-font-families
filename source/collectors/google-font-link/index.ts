import * as cheerio from 'cheerio';
import { pipe, filter, path, contains, map, head, replace,
  split, last, flatten, defaultTo, uniq } from 'ramda';

const googleFontUrl = '//fonts.googleapis.com/css';
const normalize = replace(/\+/g, ' ');
const getLinkNodes = (html: string) => cheerio.load(defaultTo('')(html))('link').toArray();
const hasGoogleFontUrlInHref = pipe(path(['attribs', 'href']), contains(googleFontUrl));
const getAfter = (separator: string) => (str: string): string => last(split(separator, str));
const getBefore = (separator: string) => (str: string): string => head(split(separator, str));
const getFamily = pipe(
  getAfter('family='),
  split('|'),
  map(getBefore(':')),
  map(getBefore('&')),
  map(normalize)
);

export const collectFromGoogleFontLinks = pipe(
  getLinkNodes,
  filter(hasGoogleFontUrlInHref),
  map(path(['attribs', 'href'])),
  map(getFamily),
  flatten,
  uniq
);
