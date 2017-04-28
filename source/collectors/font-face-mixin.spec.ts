import * as test from 'tape';
import { fontFaceCollector } from './font-face-mixin';

test('should give back empty array if there is no font in the given input', (t: test.Test) => {
  const html = `<div>What</div>`;
  t.deepEqual(fontFaceCollector(html), []);
  t.end();
});

test('should give back font family from font-face', (t: test.Test) => {
  const html = `
    @font-face {
      font-family:'Vardono';
    }
  `;
  t.deepEqual(fontFaceCollector(html), ['Vardono']);
  t.end();
});

test('should not give back font family if its not in font-face mixin', (t: test.Test) => {
  const html = `
    body: {
      font-family:Roboto;
    }
    h1: {
      font-family:Verdana;
    }
  `;
  t.deepEqual(fontFaceCollector(html), []);
  t.end();
});

test('should give back only font families', (t: test.Test) => {
  const html = `
    @font-face {
      font-family:Arial;
      font-style: normal;
    }
  `;
  t.deepEqual(fontFaceCollector(html), ['Arial']);
  t.end();
});

test('should ignore whitespaces, and ticks around font families', (t: test.Test) => {
  const html = `
    @font-face {
      font-family: 'Montserrat';
    }
  `;
  t.deepEqual(fontFaceCollector(html), ['Montserrat']);
  t.end();
});

test('should works with mustache too', (t: test.Test) => {
  const html = `
    @font-face {
      font-family: "Montserrat";
    }
  `;
  t.deepEqual(fontFaceCollector(html), ['Montserrat']);
  t.end();
});

test.skip('should collect every font family', (t: test.Test) => {
  const html = `
    @font-face {
      font-family: 'Montserrat';
    }
    @font-face {
      font-family: 'Wharane';
    }
  `;
  t.deepEqual(fontFaceCollector(html), ['Montserrat', 'Wharane']);
  t.end();
});
