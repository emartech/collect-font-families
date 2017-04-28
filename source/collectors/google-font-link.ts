import * as cheerio from 'cheerio';
import { pipe, filter, path, contains, map, head, replace, split, last } from 'ramda';

const googleFontUrl = '//fonts.googleapis.com/css';
const getLinkNodes = (html: string) => cheerio.load(html)('link').toArray();
const hasGoogleFontUrlInHref = pipe(path(['attribs', 'href']), contains(googleFontUrl));
const getAfter = (separator: string) => (str: string) => last(split(separator, str));
const getBefore = (separator: string) => (str: string) => head(split(separator, str));
const getFamily = pipe(
  getAfter('family='),
  getBefore(':'),
  getBefore('&'),
  replace(/\+/g, ' ')
);

export const collectFromGoogleFontLinks = pipe(
  getLinkNodes,
  filter(hasGoogleFontUrlInHref),
  map(path(['attribs', 'href'])),
  map(getFamily)
);
