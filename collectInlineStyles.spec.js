const test = require('tape');
const fontFinder = require('./collectInlineStyles');

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
    <body>
      <div style="font-family:Arial">What?</div>
      <div style="font-family:Roboto">What?</div>
    </body>
  `;
  t.deepEqual(fontFinder(html), ['Arial', 'Roboto']);
  t.end();
});

test('should collect fallback fonts', (t) => {
  const html = `
    <body><div style="font-family: Arial,Times,serif">What?</div></body>
  `;
  t.deepEqual(fontFinder(html), ['Arial', 'Times', 'serif']);
  t.end();
});

test('should collect ignore whitespaces between fallback fonts', (t) => {
  const html = `
    <body><div style="font-family: Arial, Times, serif">What?</div></body>
  `;
  t.deepEqual(fontFinder(html), ['Arial', 'Times', 'serif']);
  t.end();
});

test('should ignore other inline style properties', (t) => {
  const html = `
    <body><div style="background: blue; font-family: Arial, Times, serif; color: red;">What?</div></body>
  `;
  t.deepEqual(fontFinder(html), ['Arial', 'Times', 'serif']);
  t.end();
});

test.skip('should ignore non style font families', (t) => {
  const html = `
    <body><div>What? font-family: Arial;</div></body>
  `;
  t.deepEqual(fontFinder(html), []);
  t.end();
});
