import * as test from 'tape';
import { singleTest } from '../lib/test';
import { collectFromFontFaces } from './font-face-mixin';

singleTest('should give back empty array if there is no font in the given input', (t: test.Test) => {
  const html = '<div>What</div>';
  t.deepEqual(collectFromFontFaces(html), []);
});

singleTest('should give back font family from font-face', (t: test.Test) => {
  const html = `
    @font-face {
      font-family:'Vardono';
    }
  `;
  t.deepEqual(collectFromFontFaces(html), ['Vardono']);
});

singleTest('should not give back font family if its not in font-face mixin', (t: test.Test) => {
  const html = `
    body: {
      font-family:Roboto;
    }
    h1: {
      font-family:Verdana;
    }
  `;
  t.deepEqual(collectFromFontFaces(html), []);
});

singleTest('should give back only font families', (t: test.Test) => {
  const html = `
    @font-face {
      font-color: red;
      font-family:Arial;
      font-style: normal;
    }
  `;
  t.deepEqual(collectFromFontFaces(html), ['Arial']);
});

singleTest('should ignore whitespaces, and ticks around font families', (t: test.Test) => {
  const html = `
    @font-face {
      font-family: 'Montserrat';
    }
  `;
  t.deepEqual(collectFromFontFaces(html), ['Montserrat']);
});

singleTest('should works with mustache too', (t: test.Test) => {
  const html = `
    @font-face {
      font-family: "Montserrat";
    }
  `;
  t.deepEqual(collectFromFontFaces(html), ['Montserrat']);
});

singleTest('should collect every font family', (t: test.Test) => {
  const html = `
    @font-face {
      font-family: 'Montserrat';
    }
    @font-face {
      font-family: 'Wharane';
    }
  `;
  t.deepEqual(collectFromFontFaces(html), ['Montserrat', 'Wharane']);
});
