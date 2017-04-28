import { collectFromFontFaces, collectFromGoogleFontLinks } from './collectors';
import { juxt, pipe, flatten, sortBy, identity, uniq } from 'ramda';

export const collectFontFamilies = pipe(
  juxt([collectFromFontFaces, collectFromGoogleFontLinks]),
  flatten,
  sortBy(identity),
  uniq
);
