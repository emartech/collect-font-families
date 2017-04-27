const test = require('tape');
const fontFinder = require('./fontFaceMixinCollector');

test('should give back empty array if the given string is empty', (t) => {
  t.deepEqual(fontFinder(''), []);
  t.end();
});

test('should not give back font family if its not in font-face mixin', (t) => {
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
  t.deepEqual(fontFinder(html), []);
  t.end();
});

test('should give back only font families', (t) => {
  const html = `
    <style>
      body: {
        font-family:Roboto;
      }
      @font-face {
        font-family:Arial;
        font-style: normal;
      }
    </style>
  `;
  t.deepEqual(fontFinder(html), ['Arial']);
  t.end();
});

test('should ignore whitespaces, and ticks around font families', (t) => {
  const html = `
    <style>
      body: {
        font-family:Roboto;
      }
      @font-face {
        font-family: 'Montserrat';
        font-weight: 400;
        src: local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/montserrat/v7/zhcz-_WihjSQC0oHJ9TCYL3hpw3pgy2gAi-Ip7WPMi0.woff) format('woff');
      }
    </style>
  `;
  t.deepEqual(fontFinder(html), ['Montserrat']);
  t.end();
});

test('should collect fallback fonts', (t) => {
  const html = `
    <style>
      @font-face {
        font-family: Arial,Times, serif;
        font-style: normal;
      }
    </style>
  `;
  t.deepEqual(fontFinder(html), ['Arial,Times, serif']);
  t.end();
});