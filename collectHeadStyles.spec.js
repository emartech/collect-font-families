const test = require('tape');
const fontFinder = require('./collectHeadStyles');

test('should give back empty array if the given string is empty', (t) => {
  t.deepEqual(fontFinder(''), []);
  t.end();
});

test('should give back a font name if there is font used in css', (t) => {
  t.deepEqual(fontFinder('font-family:Roboto;'), ['Roboto']);
  t.end();
});

test('should give back multiple font name if there are multiple font used in css', (t) => {
  const html = `
    <style>
      body: {
        font-family:Roboto;
      }
      h1: {
        font-family:Verdana;
      }
    </style>
  `;
  t.deepEqual(fontFinder(html), ['Roboto', 'Verdana']);
  t.end();
});

test('should give back only the font families', (t) => {
  const html = `
    <style>
      body: {
        font-family:Roboto;
        color:red;
      }
      h1: {
        font-family:Verdana;
      }
    </style>
  `;
  t.deepEqual(fontFinder(html), ['Roboto', 'Verdana']);
  t.end();
});

test('should collect fallback fonts', (t) => {
  const html = `
    <style>
      font-family: Arial,Times, serif;
    </style>
  `;
  t.deepEqual(fontFinder(html), ['Arial,Times, serif']);
  t.end();
});

test('should ignore non style font families', (t) => {
  const html = `
    <body><div>What? font-family: Arial;</div></body>
  `;
  t.deepEqual(fontFinder(html), []);
  t.end();
});
