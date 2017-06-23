import * as test from 'tape';
import { singleTest } from '../lib/test';
import { collectFromGoogleFontLinks } from './';

singleTest('should give back empty array if there is no custom font in the given email', (t: test.Test) => {
  const html = `
    <html>
      <body>
        <div>Yo!</div>
      </body>
    </html>
  `;
  t.deepEqual(collectFromGoogleFontLinks(html), []);
});

singleTest('should find the given font family from link tag', (t: test.Test) => {
  const html = `
    <head>
      <link href="http://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">
    </head>
  `;
  t.deepEqual(collectFromGoogleFontLinks(html).length, 1);
});

singleTest('should not find non custom font css link', (t: test.Test) => {
  const html = `
    <link href="http://foobar.com/css?family=red" rel="stylesheet" type="text/css">
  `;
  t.deepEqual(collectFromGoogleFontLinks(html).length, 0);
});

singleTest('should give back the custom font name', (t: test.Test) => {
  const html = `
    <link href="http://fonts.googleapis.com/css?family=Open" rel="stylesheet" type="text/css">
  `;
  t.deepEqual(collectFromGoogleFontLinks(html), ['Open']);
});

singleTest('should give back the custom font name with normalized name', (t: test.Test) => {
  const html = `
    <link href="http://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">
  `;
  t.deepEqual(collectFromGoogleFontLinks(html), ['Open Sans']);
});

singleTest('should give back the custom font name when size and language options are added', (t: test.Test) => {
  const html = `
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,700,700i&amp;subset=greek" rel="stylesheet">
  `;
  t.deepEqual(collectFromGoogleFontLinks(html), ['Open Sans']);
});

singleTest('should find font family if only language options are given', (t: test.Test) => {
  const html = `
    <link href="https://fonts.googleapis.com/css?family=Open+Sans&amp;subset=greek,latin-ext" rel="stylesheet">
  `;
  t.deepEqual(collectFromGoogleFontLinks(html), ['Open Sans']);
});

singleTest('should work for more than one font family link', (t: test.Test) => {
  const html = `
    <link href="https://fonts.googleapis.com/css?family=Open+Sans&amp;subset=greek,latin-ext" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro&amp;subset=latin-ext" rel="stylesheet">
    <link href="http://foobar.com/css?family=red" rel="stylesheet" type="text/css">
  `;
  t.deepEqual(collectFromGoogleFontLinks(html), ['Open Sans', 'Source Sans Pro']);
});
